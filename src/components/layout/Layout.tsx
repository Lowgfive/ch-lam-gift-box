import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SeasonalBanner from "@/components/SeasonalBanner";
import SeasonalDecorations from "@/components/SeasonalDecorations";
import SeasonalThemeSwitcher from "@/components/SeasonalThemeSwitcher";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SeasonalBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SeasonalDecorations />
      <SeasonalThemeSwitcher />
    </div>
  );
};

export default Layout;
