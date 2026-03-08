import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories, Product } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";

const Products = () => {
  const { toast } = useToast();
  const { theme } = useSeasonalTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) =>
      p.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.nameVi} đã được thêm vào giỏ hàng`,
    });
  };

  return (
    <Layout>
      <section className="section-padding min-h-screen">
        <div className="container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cửa hàng <span className="text-primary">Lam Nhí</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Khám phá các hương vị chè lam truyền thống và hiện đại, combo tiết kiệm và phiên bản đặc biệt
            </p>
          </motion.div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-warm w-full pl-11"
              />
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="input-warm pl-11 pr-8 appearance-none cursor-pointer"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-cream text-foreground hover:bg-cream/80"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <motion.div
            key={activeCategory + sortBy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
              />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-muted-foreground text-lg">Không tìm thấy sản phẩm phù hợp</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
