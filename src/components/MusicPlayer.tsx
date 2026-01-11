import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { useState } from "react";
import { useAudio } from "@/context/AudioContext";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const { isPlaying, volume, currentTime, duration, togglePlay, setVolume, setCurrentTime, nextTrack, prevTrack, currentTrackTitle } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.div
        className="glass-strong rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        animate={{ width: isExpanded ? 300 : 80, height: isExpanded ? "auto" : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.button
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(true)}
              className="w-20 h-20 flex items-center justify-center text-primary hover:text-neon-cyan transition-all group relative"
            >
              <div className={cn("absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity", isPlaying && "opacity-100 animate-pulse")} />
              <Music className={cn("w-10 h-10 relative z-10", isPlaying && "animate-spin-slow")} />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 max-w-[200px]">
                  <div className="w-12 h-12 rounded-xl bg-black border-2 border-primary/30 flex items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(0,255,255,0.2)] shrink-0">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-foreground font-display uppercase tracking-tighter truncate">{currentTrackTitle}</div>
                    <div className="text-[10px] text-muted-foreground font-mono uppercase">Studio Broadcast</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-5">
                <button
                  onClick={prevTrack}
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-primary hover:bg-primary/30 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
                >
                  {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 ml-1 fill-current" />}
                </button>
                <button
                  onClick={nextTrack}
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/5">
                {volume === 0 ? <VolumeX className="w-4 h-4 text-muted-foreground" /> : <Volume2 className="w-4 h-4 text-primary" />}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-2 bg-black/40 p-3 rounded-2xl border border-white/5">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                  className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Visualizer */}
              <div className="flex items-end justify-center gap-1 h-10 mt-5 px-2">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-primary to-accent rounded-full"
                    animate={isPlaying ? {
                      height: [4, Math.random() * 30 + 8, 4]
                    } : { height: 4 }}
                    transition={{
                      duration: 0.4 + Math.random() * 0.4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{ height: 4 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;
