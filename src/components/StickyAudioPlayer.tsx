import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const StickyAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 150);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-elevated">
      <div className="container-wide px-4 py-3 flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">🎙️ Câu chuyện chè lam truyền thống</p>
          <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-muted-foreground flex-shrink-0">3:00</span>
      </div>
    </div>
  );
};

export default StickyAudioPlayer;
