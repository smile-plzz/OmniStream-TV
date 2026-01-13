import React from 'react';
import { Channel } from '../types';
import { Play, Heart } from 'lucide-react';

interface ChannelGridProps {
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
  currentChannelId?: string;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ 
  channels, 
  onSelectChannel, 
  currentChannelId,
  favorites,
  onToggleFavorite
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {channels.map((channel) => {
        const isFav = favorites.has(channel.id);
        const isActive = currentChannelId === channel.id;

        return (
          <div 
            key={channel.id}
            className={`
              group relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer border transition-all duration-300
              ${isActive
                ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] ring-1 ring-blue-500 transform scale-[1.02]' 
                : 'border-white/5 hover:border-white/20 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/50 bg-zinc-900'
              }
            `}
          >
            {/* Click area for selection */}
            <div className="absolute inset-0 z-0" onClick={() => onSelectChannel(channel)}>
                {/* Background Image */}
                <div className="absolute inset-0 bg-zinc-900">
                   <img 
                     src={`https://img.youtube.com/vi/${channel.streamId}/mqdefault.jpg`} 
                     alt={channel.name}
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                   />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />

                {/* Active Playing Indicator Animation */}
                {isActive && (
                   <div className="absolute top-3 right-3 flex space-x-1 z-10">
                      <div className="w-1 h-3 bg-blue-500 animate-[bounce_1s_infinite]"></div>
                      <div className="w-1 h-3 bg-blue-500 animate-[bounce_1.2s_infinite]"></div>
                      <div className="w-1 h-3 bg-blue-500 animate-[bounce_0.8s_infinite]"></div>
                   </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-xl">
                      <Play fill="white" size={20} className="ml-1" />
                   </div>
                </div>

                {/* Info Area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-1.5">
                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-800/80 backdrop-blur px-2 py-0.5 rounded border border-white/5">
                       {channel.countryCode}
                     </span>
                     {channel.isLive && (
                       <span className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/10">
                         <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                         LIVE
                       </span>
                     )}
                  </div>
                  <h3 className={`font-semibold text-lg leading-tight truncate ${isActive ? 'text-blue-400' : 'text-zinc-100'}`}>
                      {channel.name}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1 truncate group-hover:text-zinc-400 transition-colors">
                      {channel.category}
                  </p>
                </div>
            </div>

            {/* Favorite Button Overlay - Separate from main click area to avoid triggering selection */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(channel.id);
                }}
                className="absolute top-3 left-3 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
                <Heart size={16} className={`transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-zinc-300'}`} />
            </button>
            
            {/* Always show heart if favored, even if not hovering */}
            {isFav && (
                <div className="absolute top-3 left-3 z-10 pointer-events-none group-hover:opacity-0">
                    <Heart size={16} className="fill-red-500 text-red-500 drop-shadow-md" />
                </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChannelGrid;