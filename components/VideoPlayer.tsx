import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Maximize2, Minimize2, Volume2, VolumeX, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { Channel } from '../types';

interface VideoPlayerProps {
  channel: Channel;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  theaterMode: boolean;
  setTheaterMode: (mode: boolean) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  channel, 
  isFavorite, 
  onToggleFavorite,
  theaterMode,
  setTheaterMode
}) => {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  let controlsTimeout: NodeJS.Timeout;

  useEffect(() => {
    setError(false);
    setLoading(true);
    setIsPlaying(true);
  }, [channel]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => setShowControls(false), 3000);
  };

  if (!channel) return null;

  return (
    <div 
      className={`
        relative bg-black overflow-hidden shadow-2xl group transition-all duration-500 ease-in-out
        ${theaterMode ? 'w-full h-full rounded-none' : 'w-full aspect-video rounded-2xl border border-white/10'}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Loading State */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10">
           <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-zinc-400 z-20">
          <AlertCircle size={40} className="mb-3 text-red-500 opacity-80" />
          <p className="mb-4 text-center px-4">Stream temporarily unavailable or restricted.</p>
          <button 
            onClick={() => { setError(false); setIsPlaying(true); setLoading(true); }}
            className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all font-medium text-white"
          >
            Retry Connection
          </button>
        </div>
      )}

      <div className="w-full h-full pointer-events-none">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${channel.streamId}`}
          playing={isPlaying}
          muted={muted}
          width="100%"
          height="100%"
          controls={false}
          onReady={() => setLoading(false)}
          onBuffer={() => setLoading(true)}
          onBufferEnd={() => setLoading(false)}
          onError={(e) => { 
            console.log("Player Error", e);
            setLoading(false); 
            setError(true); 
          }}
          config={{
            playerVars: { 
              modestbranding: 1, 
              rel: 0,
              iv_load_policy: 3,
              disablekb: 1,
              fs: 0 
            }
          }}
          style={{ pointerEvents: 'none' }} 
        />
      </div>

      {/* Interactive Overlay Layer */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Gradient Overlay for controls visibility */}
      <div className={`
        absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none transition-opacity duration-300
        ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}
      `} />

      {/* Top Controls (Favorite & Theater) */}
      <div className={`
        absolute top-0 right-0 p-6 flex gap-3 transition-all duration-300 z-30
        ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}>
        <button
          onClick={onToggleFavorite}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition-all border border-white/10 group/btn"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart size={20} className={`transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'group-hover/btn:scale-110'}`} />
        </button>
        
        <button
          onClick={() => setTheaterMode(!theaterMode)}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition-all border border-white/10"
          title={theaterMode ? "Exit Theater Mode" : "Enter Theater Mode"}
        >
          {theaterMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      {/* Bottom Controls Info */}
      <div className={`
        absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end transition-all duration-300 z-30
        ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-3 mb-2">
             {channel.isLive && (
               <span className="flex items-center gap-1.5 bg-red-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-lg">
                 <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                 LIVE
               </span>
             )}
             <h2 className="text-white font-bold text-xl lg:text-2xl drop-shadow-lg tracking-tight">{channel.name}</h2>
          </div>
          <p className="text-zinc-300 text-sm lg:text-base max-w-2xl line-clamp-2 drop-shadow-md font-light leading-relaxed">
            {channel.description}
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setMuted(!muted)}
            className="p-4 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 text-white transition-all border border-white/10 shadow-xl"
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;