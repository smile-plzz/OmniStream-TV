import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import ChannelGrid from './components/ChannelGrid';
import { CHANNELS } from './constants';
import { Channel, ChannelCategory } from './types';
import { Menu, Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ChannelCategory | 'Favorites'>('All' as ChannelCategory);
  const [currentChannel, setCurrentChannel] = useState<Channel>(CHANNELS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [theaterMode, setTheaterMode] = useState(false);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('omnistream_favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save favorites when changed
  const toggleFavorite = (channelId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(channelId)) {
        next.delete(channelId);
      } else {
        next.add(channelId);
      }
      localStorage.setItem('omnistream_favorites', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Filter logic
  const filteredChannels = CHANNELS.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          channel.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'Favorites') {
      return favorites.has(channel.id) && matchesSearch;
    }

    const matchesCategory = activeCategory === ChannelCategory.ALL || channel.category === activeCategory;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden selection:bg-blue-500/30 font-sans">
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={(cat) => setActiveCategory(cat)}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        favoritesCount={favorites.size}
      />

      <div className={`
        flex-1 flex flex-col h-full relative transition-all duration-500 ease-in-out
        ${theaterMode ? 'lg:ml-0' : 'lg:ml-64'}
      `}>
        {/* Header / Top Bar */}
        <header className={`
          h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 transition-all duration-500
          ${theaterMode ? '-translate-y-full opacity-0 absolute w-full' : 'translate-y-0 opacity-100'}
        `}>
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
                >
                    <Menu size={24} />
                </button>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search channels..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64 bg-zinc-900/50 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:bg-zinc-900 transition-all placeholder-zinc-600"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                 <div className="hidden sm:block text-right">
                    <p className="text-xs font-semibold text-zinc-300">Guest User</p>
                    <p className="text-[10px] text-zinc-500">Premium Plan</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden ring-2 ring-transparent hover:ring-blue-500 transition-all cursor-pointer">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                 </div>
            </div>
        </header>

        {/* Main Content Scroll Area */}
        <main className={`flex-1 overflow-y-auto scroll-smooth ${theaterMode ? 'p-0 overflow-hidden' : 'p-4 lg:p-8'}`}>
            <div className={`mx-auto transition-all duration-500 ${theaterMode ? 'max-w-full h-full' : 'max-w-7xl space-y-8'}`}>
                
                {/* Hero / Player Section */}
                <section className={`${theaterMode ? 'h-full w-full' : ''}`}>
                    {!theaterMode && (
                      <div className="mb-6 flex items-end justify-between animate-fade-in">
                          <div>
                            <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Now Watching</h2>
                          </div>
                          {currentChannel && (
                             <div className="flex items-center gap-2">
                                <span className="px-2 py-1 rounded bg-zinc-900 border border-white/10 text-xs text-zinc-400 font-medium">
                                  {currentChannel.country}
                                </span>
                                <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
                                  {currentChannel.category}
                                </span>
                             </div>
                          )}
                      </div>
                    )}
                    
                    <VideoPlayer 
                      channel={currentChannel} 
                      isFavorite={favorites.has(currentChannel.id)}
                      onToggleFavorite={() => toggleFavorite(currentChannel.id)}
                      theaterMode={theaterMode}
                      setTheaterMode={setTheaterMode}
                    />
                </section>

                {/* Grid Section - Hidden in Theater Mode */}
                {!theaterMode && (
                  <section className="animate-slide-up">
                      <div className="flex items-center justify-between mb-4 sticky top-0 bg-zinc-950/95 backdrop-blur z-10 py-4 border-b border-white/5">
                        <h2 className="text-xl font-semibold text-zinc-200">
                           {activeCategory === 'Favorites' ? 'My Favorites' : activeCategory === ChannelCategory.ALL ? 'Global Channels' : activeCategory}
                           <span className="ml-2 text-sm font-normal text-zinc-500">({filteredChannels.length})</span>
                        </h2>
                      </div>
                      
                      {filteredChannels.length > 0 ? (
                          <ChannelGrid 
                             channels={filteredChannels} 
                             onSelectChannel={(c) => {
                               setCurrentChannel(c);
                               // Optional: Scroll to top smoothly
                               document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
                             }}
                             currentChannelId={currentChannel.id}
                             favorites={favorites}
                             onToggleFavorite={toggleFavorite}
                          />
                      ) : (
                          <div className="h-60 flex flex-col items-center justify-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                              <Search size={32} className="mb-4 opacity-50" />
                              <p className="text-lg font-medium">No channels found</p>
                              <p className="text-sm text-zinc-600 mb-4">Try adjusting your filters or search terms</p>
                              <button 
                                onClick={() => {setSearchQuery(''); setActiveCategory(ChannelCategory.ALL)}} 
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
                              >
                                Clear filters
                              </button>
                          </div>
                      )}
                  </section>
                )}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;