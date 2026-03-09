import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gift, Heart, ArrowRight, QrCode, ShoppingBag, Play, Pause, Volume2, Star, Truck, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, Product, categories } from "@/data/mockData";
import heroBanner from "@/assets/hero-banner.jpg";
import storyImage from "@/assets/story-image.jpg";
import qrIllustration from "@/assets/qr-illustration.jpg";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Home = () => {
  const { toast } = useToast();
  const { theme } = useSeasonalTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const bestsellers = products.filter((p) => p.tags?.includes("bestseller")).slice(0, 4);
  const specialEditions = products.filter((p) => p.category === "special").slice(0, 4);
  const combos = products.filter((p) => p.category === "combo");

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.nameVi} đã được thêm vào giỏ hàng`,
    });
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio would play here if we had an actual audio file
  };

  return (
    <Layout>
      {/* National Day Full Background */}
      {theme === "national" && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img src="/assets/national-bg-page1.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/75" />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {theme !== "national" && (
          <div className="absolute inset-0">
            <img src={heroBanner} alt="Chè lam Lam Nhí" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          </div>
        )}

        <div className="container-wide px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6">
              🎁 Quà tặng truyền thống Việt Nam
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Chè lam – <span className="text-primary">vị ngọt tuổi thơ</span> trong từng món quà
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Gói ghém yêu thương cùng những miếng chè lam thơm ngon, mang đậm hương vị truyền thống Việt Nam.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Mua ngay
              </Link>
              <Link to="/products" className="btn-outline flex items-center gap-2">
                Khám phá sản phẩm
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={`py-8 ${theme !== "national" ? "bg-cream" : ""}`}>
        <div className="container-wide px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Star, label: "4.8/5 đánh giá", sub: "500+ khách hàng" },
              { icon: Truck, label: "Giao hàng toàn quốc", sub: "2-3 ngày làm việc" },
              { icon: Shield, label: "Cam kết chất lượng", sub: "100% nguyên liệu sạch" },
              { icon: Gift, label: "Quà tặng đẹp", sub: "Đóng gói sang trọng" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">🔥 Bán chạy nhất</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sản phẩm <span className="text-primary">được yêu thích</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Những hương vị được khách hàng đánh giá cao nhất
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
              Xem tất cả sản phẩm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Story / Storytelling Section */}
      <section className={`section-padding ${theme !== "national" ? "bg-cream" : ""}`}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial">
              <img src={storyImage} alt="Câu chuyện chè lam" className="w-full rounded-3xl shadow-elevated" />
            </motion.div>

            <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="space-y-6">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm">
                <Heart className="w-4 h-4 inline mr-2" />
                Câu chuyện của chúng tôi
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Hương vị truyền thống, <span className="text-primary">tình yêu hiện đại</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Chè lam là món bánh truyền thống của người Việt, thường xuất hiện trong mỗi dịp Tết đến xuân về. 
                Được làm từ bột nếp rang, mạch nha và lạc, mỗi miếng chè lam mang trong mình hương vị của ký ức tuổi thơ.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Tại Lam Nhí, chúng tôi kết hợp công thức truyền thống cùng những hương vị mới lạ, 
                tạo nên những món quà độc đáo dành tặng người thân yêu.
              </p>

              {/* Audio Storytelling */}
              <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
                <button
                  onClick={toggleAudio}
                  className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors flex-shrink-0"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">🎙️ Nghe câu chuyện chè lam</p>
                  <p className="text-xs text-muted-foreground">Podcast • 3 phút</p>
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full bg-primary rounded-full transition-all duration-1000 ${isPlaying ? "w-1/3" : "w-0"}`} />
                  </div>
                </div>
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </div>

              <Link to="/products" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Khám phá sản phẩm <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Special Editions */}
      <section className={`section-padding ${theme !== "national" ? "bg-gradient-hero" : ""}`}>
        <div className="container-wide">
          <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-terracotta/10 text-terracotta font-medium text-sm mb-4">🎁 Phiên bản đặc biệt</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quà tặng theo <span className="text-primary">dịp lễ</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Những phiên bản giới hạn, thiết kế riêng cho từng dịp đặc biệt
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialEditions.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Combo Section */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">📦 Combo tiết kiệm</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mua combo <span className="text-primary">tiết kiệm hơn</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {combos.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* QR Section */}
      <section className={`section-padding relative overflow-hidden ${theme !== "national" ? "bg-cream/80" : ""}`}>
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="space-y-6 order-2 lg:order-1">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <QrCode className="w-4 h-4 inline mr-2" />
                Tính năng QR Code
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Mỗi sản phẩm có <span className="text-primary">mã QR riêng</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Quét mã QR trên mỗi sản phẩm để xem chi tiết, câu chuyện thương hiệu và nội dung marketing đặc biệt. 
                Hỗ trợ custom QR code cho khách hàng B2B theo yêu cầu.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Dẫn đến trang chi tiết sản phẩm",
                  "Xem câu chuyện thương hiệu & nguồn gốc",
                  "Custom QR code cho doanh nghiệp (B2B)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/e-card" className="btn-primary inline-flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                Tạo QR & thiệp
              </Link>
            </motion.div>

            <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="order-1 lg:order-2">
              <img src={qrIllustration} alt="QR Code" className="w-full max-w-md mx-auto rounded-3xl shadow-elevated animate-float" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Sẵn sàng đặt hàng?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Đặt hàng trực tiếp trên website hoặc liên hệ chúng tôi để được tư vấn
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 font-medium transition-all shadow-soft hover:shadow-elevated hover:-translate-y-0.5 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Đặt hàng ngay
              </Link>
              <Link to="/e-card" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 py-3 font-medium transition-all">
                Tạo thiệp điện tử
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
