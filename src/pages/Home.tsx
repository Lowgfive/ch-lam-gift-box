import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gift, ArrowRight, ShoppingBag, Star, Truck, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { useCart } from "@/contexts/CartContext";
import StickyAudioPlayer from "@/components/StickyAudioPlayer";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Home = () => {
  const { toast } = useToast();
  const { theme } = useSeasonalTheme();
  const { addItem } = useCart();

  const bestsellers = products.filter((p) => p.tags?.includes("bestseller")).slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.nameVi} đã được thêm vào giỏ hàng`,
    });
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

      {/* Video Hero Section - Full Width */}
      <section className="relative w-full">
        <div className="relative w-full" style={{ paddingBottom: "50%" }}>
          <div className="absolute inset-0">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ZHETsUjETyY?autoplay=0&rel=0&showinfo=0"
              title="Video giới thiệu Lam Nhí"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            {/* Gradient overlay at bottom for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Title + Description + Buttons */}
      <section className="relative z-10 -mt-16 pb-12">
        <div className="container-wide px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6">
              🎁 Quà tặng truyền thống Việt Nam
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Chè lam – <span className="text-primary">vị ngọt tuổi thơ</span> trong từng món quà
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Gói ghém yêu thương cùng những miếng chè lam thơm ngon, mang đậm hương vị truyền thống Việt Nam.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="btn-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Mua ngay
              </Link>
              <Link to="/story" className="btn-outline flex items-center gap-2">
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
              <Link to="/story" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 py-3 font-medium transition-all">
                Câu chuyện chè lam
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <StickyAudioPlayer />
    </Layout>
  );
};

export default Home;
