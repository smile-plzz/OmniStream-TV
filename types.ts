export interface Channel {
  id: string;
  name: string;
  category: ChannelCategory;
  country: string;
  countryCode: string; // ISO code for flag display (e.g., 'US', 'GB')
  streamId: string; // YouTube Video ID for stability in demo
  logo: string; // URL for channel logo/thumbnail
  description: string;
  isLive: boolean;
}

export enum ChannelCategory {
  ALL = 'All',
  NEWS = 'News',
  SPORTS = 'Sports',
  SCIENCE = 'Science',
  NATURE = 'Nature',
  MUSIC = 'Music',
  TECH = 'Tech',
  ENTERTAINMENT = 'Entertainment',
  FINANCE = 'Finance',
  LIFESTYLE = 'Lifestyle'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export type RecommendationRequest = {
  userMood: string;
  currentChannels: Channel[];
};