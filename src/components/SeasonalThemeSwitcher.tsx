import { useSeasonalTheme, SeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { Palette } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SeasonalThemeSwitcher = () => {
  const { theme, setThemeOverride, allSeasons } = useSeasonalTheme();
  const [open, setOpen] = useState(false);

  const options: { id: SeasonalTheme; label: string; emoji: string }[] = [
    { id: "default", label: "Mặc định", emoji: "🍬" },
    ...allSeasons.map((s) => ({ id: s.id, label: s.label, emoji: s.emoji })),
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 right-0 bg-card border border-border rounded-xl shadow-elevated p-2 min-w-[200px]"
          >
            <p className="text-xs text-muted-foreground px-3 py-1.5 font-medium">Xem trước giao diện mùa lễ</p>
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setThemeOverride(opt.id === "default" ? null : opt.id); setOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors
                  ${theme === opt.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"}`}
              >
                <span>{opt.emoji}</span>
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Đổi giao diện mùa lễ"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SeasonalThemeSwitcher;
