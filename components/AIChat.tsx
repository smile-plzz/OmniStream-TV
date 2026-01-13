import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import { getAIRecommendation, getLiveChatResponse } from '../services/geminiService';
import { Channel } from '../types';

interface AIChatProps {
  currentChannel: Channel | null;
  availableChannels: Channel[];
  favorites: string[];
  onRecommendationSelect: (channelId: string) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isRecommendation?: boolean;
}

const AIChat: React.FC<AIChatProps> = ({ currentChannel, availableChannels, favorites, onRecommendationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi! I\'m Omni. Tell me your mood or what you want to watch, and I\'ll find the perfect channel.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const isRecommendationIntent = /watch|show|mood|recommend|feel like|want to see/i.test(userMsg.content);

      if (isRecommendationIntent) {
        // Pass favorites here
        const { channelIds, reasoning } = await getAIRecommendation(userMsg.content, availableChannels, favorites);
        
        const recChannels = availableChannels.filter(c => channelIds.includes(c.id));
        
        if (recChannels.length > 0) {
           setMessages(prev => [...prev, {
             id: (Date.now() + 1).toString(),
             role: 'assistant',
             content: reasoning,
             isRecommendation: true
           }]);
           
           const bestMatch = recChannels[0];
           onRecommendationSelect(bestMatch.id);
           
           setMessages(prev => [...prev, {
               id: (Date.now() + 2).toString(),
               role: 'assistant',
               content: `I've tuned you into ${bestMatch.name}. Enjoy!`
           }]);

        } else {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: reasoning
            }]);
        }
      } else {
        const chatHistory = messages.concat(userMsg).map(m => ({role: m.role, content: m.content}));
        const response = await getLiveChatResponse(chatHistory, currentChannel);
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response
        }]);
      }

    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Sorry, I lost connection to the server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center
          ${isOpen ? 'bg-zinc-800 text-zinc-400 rotate-90' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30'}
        `}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      <div className={`
        fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] z-40
        glass-panel rounded-2xl flex flex-col shadow-2xl overflow-hidden
        transition-all duration-300 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none translate-y-10'}
      `}>
        <div className="p-4 bg-zinc-900/50 border-b border-white/5 flex items-center gap-2">
            <Bot size={18} className="text-blue-400" />
            <h3 className="font-semibold text-white">Omni AI Assistant</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`
                        max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-md
                        ${msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-zinc-800 text-zinc-200 border border-white/5 rounded-bl-none'
                        }
                    `}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-zinc-800 border border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex space-x-1 items-center">
                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-zinc-900/80 backdrop-blur-md border-t border-white/5">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="w-full bg-zinc-800 text-white placeholder-zinc-500 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-white/5 shadow-inner"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-2 p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;