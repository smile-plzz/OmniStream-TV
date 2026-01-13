import { Channel, ChannelCategory } from './types';

// IDs are based on standard YouTube Live Video IDs or persistent Channel Live references.
// Note: YouTube Live IDs can change, but these are for major broadcasters who maintain persistent streams.

export const CHANNELS: Channel[] = [
  // --- NEWS ---
  {
    id: 'aljazeera',
    name: 'Al Jazeera English',
    category: ChannelCategory.NEWS,
    country: 'Qatar',
    countryCode: 'QA',
    streamId: 'gCNeDWCI0vo',
    logo: 'https://yt3.googleusercontent.com/ytc/AIdro_n4F_j4_j4_j4',
    description: 'Breaking news and in-depth analysis from the Middle East and around the world.',
    isLive: true
  },
  {
    id: 'skynews',
    name: 'Sky News',
    category: ChannelCategory.NEWS,
    country: 'UK',
    countryCode: 'GB',
    streamId: '9Auq9mYxFEE',
    logo: '',
    description: 'Top stories, business, politics and breaking news from the United Kingdom.',
    isLive: true
  },
  {
    id: 'dw',
    name: 'DW News',
    category: ChannelCategory.NEWS,
    country: 'Germany',
    countryCode: 'DE',
    streamId: 'GE_SwfE3xAQ',
    logo: '',
    description: 'Journalism made in Germany. Global news and analysis.',
    isLive: true
  },
  {
    id: 'france24',
    name: 'France 24 English',
    category: ChannelCategory.NEWS,
    country: 'France',
    countryCode: 'FR',
    streamId: 'h3MuIUNCCzI',
    logo: '',
    description: 'International news 24/7 from a French perspective.',
    isLive: true
  },
  {
    id: 'abc_aus',
    name: 'ABC News',
    category: ChannelCategory.NEWS,
    country: 'Australia',
    countryCode: 'AU',
    streamId: 'W1ilCy6XrmI',
    logo: '',
    description: 'Australia\'s most trusted news source.',
    isLive: true
  },
  {
    id: 'cna',
    name: 'CNA',
    category: ChannelCategory.NEWS,
    country: 'Singapore',
    countryCode: 'SG',
    streamId: 'XWq5kBlakcQ',
    logo: '',
    description: 'Breaking news from Asia and Singapore.',
    isLive: true
  },
  {
    id: 'euronews',
    name: 'Euronews',
    category: ChannelCategory.NEWS,
    country: 'Europe',
    countryCode: 'EU',
    streamId: 'py5F882iW5E',
    logo: '',
    description: 'European news, international news, and analysis.',
    isLive: true
  },
  {
    id: 'gbnews',
    name: 'GB News',
    category: ChannelCategory.NEWS,
    country: 'UK',
    countryCode: 'GB',
    streamId: 'T5z_C_rU5_I', // Often live
    logo: '',
    description: 'News, opinion and debate for all the UK.',
    isLive: true
  },
  {
    id: 'nbcnews',
    name: 'NBC News Now',
    category: ChannelCategory.NEWS,
    country: 'USA',
    countryCode: 'US',
    streamId: 'hB80pW7J8_Q', 
    logo: '',
    description: 'Breaking news, headlines and live events from NBC News.',
    isLive: true
  },
  {
    id: 'wion',
    name: 'WION',
    category: ChannelCategory.NEWS,
    country: 'India',
    countryCode: 'IN',
    streamId: 'Q5_w2W5G9g8',
    logo: '',
    description: 'World Is One News. International news from India.',
    isLive: true
  },

  // --- SCIENCE & TECH ---
  {
    id: 'nasa',
    name: 'NASA TV',
    category: ChannelCategory.SCIENCE,
    country: 'USA',
    countryCode: 'US',
    streamId: '21X5lGlDOfg',
    logo: '',
    description: 'Official stream of NASA TV. Live launches, spacewalks, and educational programming.',
    isLive: true
  },
  {
    id: 'iss_live',
    name: 'ISS Live Feed',
    category: ChannelCategory.SCIENCE,
    country: 'Space',
    countryCode: 'UN',
    streamId: 'P9C256OJ8fw', // Official NASA ISS
    logo: '',
    description: 'Live video from the International Space Station.',
    isLive: true
  },
  {
    id: 'spacex_mock',
    name: 'Space Videos',
    category: ChannelCategory.TECH,
    country: 'USA',
    countryCode: 'US',
    streamId: 'DDU-rZs-Ic4', // Often Starbase Live
    logo: '',
    description: '24/7 coverage of Starship development and space activities.',
    isLive: true
  },

  // --- NATURE ---
  {
    id: 'namib',
    name: 'Namib Desert Cam',
    category: ChannelCategory.NATURE,
    country: 'Namibia',
    countryCode: 'NA',
    streamId: 'ydYDqZQpim8',
    logo: '',
    description: 'Live wildlife camera from the Gondwana Namib Park waterhole.',
    isLive: true
  },
  {
    id: 'jellyfish',
    name: 'Jellyfish Cam',
    category: ChannelCategory.NATURE,
    country: 'USA',
    countryCode: 'US',
    streamId: '2gZceX7h4tY',
    logo: '',
    description: 'Monterey Bay Aquarium Sea Nettles. Relaxing deep sea views.',
    isLive: true
  },
  {
    id: 'shark_cam',
    name: 'Shark Cam',
    category: ChannelCategory.NATURE,
    country: 'USA',
    countryCode: 'US',
    streamId: 'L_LUpnjgPso', // Explore.org
    logo: '',
    description: 'Live underwater shark camera from Cape Fear.',
    isLive: true
  },
   {
    id: 'africam_tau',
    name: 'Africam Tau',
    category: ChannelCategory.NATURE,
    country: 'South Africa',
    countryCode: 'ZA',
    streamId: '3sL0omwElxw',
    logo: '',
    description: 'Live African wildlife from the Tau Waterhole.',
    isLive: true
  },

  // --- MUSIC ---
  {
    id: 'lofi',
    name: 'Lofi Girl',
    category: ChannelCategory.MUSIC,
    country: 'France',
    countryCode: 'FR',
    streamId: 'jfKfPfyJRdk',
    logo: '',
    description: 'Lofi hip hop radio - beats to relax/study to.',
    isLive: true
  },
  {
    id: 'chillhop',
    name: 'Chillhop Radio',
    category: ChannelCategory.MUSIC,
    country: 'Netherlands',
    countryCode: 'NL',
    streamId: '5yx6BWlEVcY',
    logo: '',
    description: 'Jazzy & Lofi Hip Hop beats.',
    isLive: true
  },
  {
    id: 'synthwave',
    name: 'Synthwave Radio',
    category: ChannelCategory.MUSIC,
    country: 'Global',
    countryCode: 'UN',
    streamId: '4xDzrJKXOOY',
    logo: '',
    description: 'Retrowave / Synthwave music for programming and gaming.',
    isLive: true
  },
  {
    id: 'classical',
    name: 'Classical Radio',
    category: ChannelCategory.MUSIC,
    country: 'Global',
    countryCode: 'UN',
    streamId: 'M9FmrqS23Dk', // Halidon Music
    logo: '',
    description: 'The best of Classical Music - Mozart, Beethoven, Bach.',
    isLive: true
  },

  // --- LIFESTYLE & FINANCE ---
  {
    id: 'bloomberg',
    name: 'Bloomberg TV',
    category: ChannelCategory.FINANCE,
    country: 'USA',
    countryCode: 'US',
    streamId: 'dp8PhLsUcFE',
    logo: '',
    description: 'Global business and financial news.',
    isLive: true
  },
  {
    id: 'tokyo_live',
    name: 'Tokyo Live Cam',
    category: ChannelCategory.LIFESTYLE,
    country: 'Japan',
    countryCode: 'JP',
    streamId: 'n3Dru5y3YcI',
    logo: '',
    description: 'Live view of Tokyo Tower and Roppongi Hills.',
    isLive: true
  },
  {
    id: 'venice',
    name: 'Venice Live',
    category: ChannelCategory.LIFESTYLE,
    country: 'Italy',
    countryCode: 'IT',
    streamId: 'ph1vpnYIxJk',
    logo: '',
    description: 'Live view of the Grand Canal in Venice.',
    isLive: true
  },
  {
    id: 'nhk',
    name: 'NHK World-Japan',
    category: ChannelCategory.LIFESTYLE,
    country: 'Japan',
    countryCode: 'JP',
    streamId: 'f0lYkdA-Gtw',
    logo: '',
    description: 'The latest news, culture and lifestyle from Japan.',
    isLive: true
  },
  
  // --- SPORTS ---
  {
    id: 'redbull',
    name: 'Red Bull TV',
    category: ChannelCategory.SPORTS,
    country: 'Austria',
    countryCode: 'AT',
    streamId: 'uQ5zI-rWlDw', // Often generic Red Bull stream
    logo: '',
    description: 'World of Red Bull. Extreme sports, music, and lifestyle.',
    isLive: true
  }
];

export const CATEGORIES = Object.values(ChannelCategory);