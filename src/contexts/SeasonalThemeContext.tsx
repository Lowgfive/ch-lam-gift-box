import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SeasonalTheme = "default" | "tet" | "valentine" | "national" | "mid-autumn";

interface SeasonConfig {
  id: SeasonalTheme;
  label: string;
  emoji: string;
  banner: string;
  dateRanges: { start: [number, number]; end: [number, number] }[]; // [month(0-indexed), day]
}

const SEASONS: SeasonConfig[] = [
  {
    id: "tet",
    label: "Chúc Mừng Năm Mới",
    emoji: "🧧",
    banner: "🎆 Chào đón Tết Nguyên Đán — Ưu đãi đặc biệt cho mùa xuân!",
    dateRanges: [{ start: [0, 10], end: [1, 15] }], // Jan 10 – Feb 15
  },
  {
    id: "valentine",
    label: "Happy Valentine's Day",
    emoji: "💝",
    banner: "💕 Valentine — Gửi yêu thương qua từng miếng chè lam!",
    dateRanges: [{ start: [1, 1], end: [1, 20] }], // Feb 1 – Feb 20
  },
  {
    id: "national",
    label: "Mừng Ngày Lễ Lớn",
    emoji: "🇻🇳",
    banner: "🎉 Mừng 30/4 – 1/5 — Phiên bản đặc biệt giới hạn!",
    dateRanges: [{ start: [3, 20], end: [4, 5] }], // Apr 20 – May 5
  },
  {
    id: "mid-autumn",
    label: "Tết Trung Thu",
    emoji: "🏮",
    banner: "🌕 Tết Trung Thu — Quà tặng ý nghĩa cho gia đình!",
    dateRanges: [{ start: [7, 15], end: [8, 20] }], // Aug 15 – Sep 20
  },
];

function detectSeason(date: Date): SeasonalTheme {
  const month = date.getMonth();
  const day = date.getDate();

  for (const season of SEASONS) {
    for (const range of season.dateRanges) {
      const [sm, sd] = range.start;
      const [em, ed] = range.end;
      const afterStart = month > sm || (month === sm && day >= sd);
      const beforeEnd = month < em || (month === em && day <= ed);
      if (afterStart && beforeEnd) return season.id;
    }
  }
  return "default";
}

interface SeasonalThemeContextValue {
  theme: SeasonalTheme;
  config: SeasonConfig | null;
  setThemeOverride: (theme: SeasonalTheme | null) => void;
  allSeasons: SeasonConfig[];
}

const SeasonalThemeContext = createContext<SeasonalThemeContextValue>({
  theme: "default",
  config: null,
  setThemeOverride: () => {},
  allSeasons: SEASONS,
});

export const useSeasonalTheme = () => useContext(SeasonalThemeContext);

export const SeasonalThemeProvider = ({ children }: { children: ReactNode }) => {
  const [override, setOverride] = useState<SeasonalTheme | null>(null);
  const autoTheme = detectSeason(new Date());
  const theme = override ?? autoTheme;
  const config = SEASONS.find((s) => s.id === theme) ?? null;

  useEffect(() => {
    const root = document.documentElement;
    // Remove all season classes
    root.classList.remove("season-tet", "season-valentine", "season-national", "season-mid-autumn");
    if (theme !== "default") {
      root.classList.add(`season-${theme}`);
    }
  }, [theme]);

  return (
    <SeasonalThemeContext.Provider value={{ theme, config, setThemeOverride: setOverride, allSeasons: SEASONS }}>
      {children}
    </SeasonalThemeContext.Provider>
  );
};
