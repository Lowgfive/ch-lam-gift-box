import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { motion } from "framer-motion";

const particles: Record<string, string[]> = {
  tet: ["🧧", "🎆", "🏮", "🌸", "✨"],
  valentine: ["💝", "💕", "🌹", "💗", "✨"],
  national: ["⭐", "🇻🇳", "🎉", "🎊", "✨"],
  "mid-autumn": ["🏮", "🌕", "🐇", "⭐", "✨"],
};

const SeasonalDecorations = () => {
  const { theme } = useSeasonalTheme();
  if (theme === "default") return null;

  const emojis = particles[theme] ?? [];

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden>
      {emojis.map((emoji, i) => (
        <motion.span
          key={`${theme}-${i}`}
          className="absolute text-2xl select-none"
          initial={{ 
            x: `${10 + i * 20}vw`, 
            y: "-5vh", 
            opacity: 0.8,
            rotate: 0 
          }}
          animate={{ 
            y: "105vh", 
            opacity: [0.8, 0.6, 0],
            rotate: 360 
          }}
          transition={{ 
            duration: 8 + i * 2, 
            repeat: Infinity, 
            delay: i * 3,
            ease: "linear" 
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
};

export default SeasonalDecorations;
