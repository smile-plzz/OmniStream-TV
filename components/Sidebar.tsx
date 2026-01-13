import React from 'react';
import { Tv, Globe, Zap, Coffee, TrendingUp, Menu, Film, Heart, Music, Leaf, Cpu } from 'lucide-react';
import { ChannelCategory } from '../types';

interface SidebarProps {
  activeCategory: ChannelCategory | 'Favorites';
  onSelectCategory: (category: ChannelCategory | 'Favorites') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  favoritesCount: number;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [ChannelCategory.ALL]: <Globe size={20} />,
  [ChannelCategory.NEWS]: <TrendingUp size={20} />,
  [ChannelCategory.SPORTS]: <Zap size={20} />,
  [ChannelCategory.SCIENCE]: <Tv size={20} />,
  [ChannelCategory.NATURE]: <Leaf size={20} />,
  [ChannelCategory.MUSIC]: <Music size={20} />,
  [ChannelCategory.TECH]: <Cpu size={20} />,
  [ChannelCategory.ENTERTAINMENT]: <Film size={20} />,
  [ChannelCategory.FINANCE]: <TrendingUp size={20} />,
  [ChannelCategory.LIFESTYLE]: <Coffee size={20} />,
};

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory, isOpen, setIsOpen, favoritesCount }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content */}
      <div className={`
        fixed top-0 left-0 bottom-0 z-40
        w-64 glass-panel border-r-0 border-r-white/5
        flex flex-col bg-[#09090b]/95
        transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
            O
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            OmniStream
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1 scrollbar-hide">
          <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-3 mt-2">
            My Library
          </div>
          
          <button
            onClick={() => {
              onSelectCategory('Favorites');
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${activeCategory === 'Favorites'
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
              }
            `}
          >
            <Heart size={20} className={activeCategory === 'Favorites' ? 'fill-blue-400/20' : ''} />
            <span className="font-medium text-sm flex-1 text-left">Favorites</span>
            {favoritesCount > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeCategory === 'Favorites' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700'}`}>
                {favoritesCount}
              </span>
            )}
          </button>

          <div className="h-4"></div>
          
          <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-3">
            Discover
          </div>
          
          {Object.values(ChannelCategory).map((category) => (
            <button
              key={category}
              onClick={() => {
                onSelectCategory(category);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${activeCategory === category 
                  ? 'bg-white/10 text-white shadow-lg shadow-black/20 border border-white/5' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                }
              `}
            >
              <span className={`${activeCategory === category ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                {CATEGORY_ICONS[category] || <Tv size={20} />}
              </span>
              <span className="font-medium text-sm">{category}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-zinc-900/50 backdrop-blur-xl">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 border border-white/5 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <h3 className="text-sm font-semibold text-white mb-1 relative z-10">Premium Plan</h3>
            <p className="text-xs text-zinc-400 mb-3 relative z-10">4K HDR & No Ads</p>
            <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
              <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            </div>
            <button className="mt-3 w-full py-1.5 text-xs font-medium text-center text-zinc-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
              Manage Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;