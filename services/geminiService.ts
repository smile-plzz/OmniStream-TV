import { GoogleGenAI, Type } from "@google/genai";
import { Channel } from '../types';

let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    if (!process.env.API_KEY) {
        console.error("API_KEY not found in environment.");
        throw new Error("API Key missing");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const getAIRecommendation = async (
  userQuery: string,
  availableChannels: Channel[],
  favorites: string[] = [] // New parameter
): Promise<{ channelIds: string[]; reasoning: string }> => {
  try {
    const ai = getGenAI();
    
    // Create a simplified list of channels
    const channelContext = availableChannels.map(c => ({
      id: c.id,
      name: c.name,
      category: c.category,
      description: c.description,
      country: c.country
    }));

    const favoriteNames = availableChannels
        .filter(c => favorites.includes(c.id))
        .map(c => c.name)
        .join(", ");

    const prompt = `
      You are an expert TV concierge for OmniStream TV.
      
      User Request: "${userQuery}"
      
      Context:
      - The user has favorited these channels: [${favoriteNames || "None yet"}]. Use this to infer their taste if relevant.
      - Available Channels: ${JSON.stringify(channelContext)}
      
      Task:
      Recommend up to 3 channels.
      1. If the user asks for something specific (e.g., "music"), prioritize that.
      2. If vague (e.g., "what should I watch?"), use their favorites to guide the suggestion.
      3. Return a friendly, witty, "concierge-like" reasoning (under 35 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            channelIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: { type: Type.STRING }
          },
          required: ["channelIds", "reasoning"]
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return { channelIds: [], reasoning: "I couldn't find a perfect match, but take a look at these." };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      channelIds: [], 
      reasoning: "I'm having trouble connecting to the AI brain right now. Please browse manually!" 
    };
  }
};

export const getLiveChatResponse = async (
    chatHistory: {role: string, content: string}[],
    currentChannel: Channel | null
): Promise<string> => {
    try {
        const ai = getGenAI();
        const systemInstruction = `
            You are "Omni", a helpful AI assistant built into the OmniStream TV app.
            You help users find content, explain what's playing, or just chat about TV.
            The user is currently watching: ${currentChannel ? `${currentChannel.name} (${currentChannel.description})` : "Nothing right now"}.
            Keep answers short, witty, and relevant to TV/media. Max 2 sentences.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: chatHistory.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            })),
            config: {
                systemInstruction: systemInstruction,
            }
        });
        
        return response.text || "I'm watching the static...";
    } catch (error) {
        console.error("Gemini Chat Error", error);
        return "Signal lost. Try again later.";
    }
}