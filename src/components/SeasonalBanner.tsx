import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";

const SeasonalBanner = () => {
  const { theme, config } = useSeasonalTheme();
  const [dismissed, setDismissed] = useState(false);

  if (theme === "default" || !config || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="seasonal-banner relative overflow-hidden text-center py-2.5 px-4 text-sm font-medium"
      >
        <span>{config.banner}</span>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default SeasonalBanner;
