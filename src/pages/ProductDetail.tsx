import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { products, formatPrice, Product } from "@/data/mockData";
import { productImages } from "@/data/productImages";
import { ShoppingBag, ArrowLeft, Package, Star, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="font-display text-2xl">Không tìm thấy sản phẩm</h1>
          <Link to="/products" className="btn-primary mt-4 inline-block">Quay lại</Link>
        </div>
      </Layout>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.nameVi} đã được thêm vào giỏ hàng của bạn`,
    });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại cửa hàng
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-cream shadow-elevated">
                {productImages[product.image] ? (
                  <img
                    src={productImages[product.image]}
                    alt={product.nameVi}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl">🍬</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {product.tags && product.tags.length > 0 && (
                <div className="flex gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium"
                    >
                      {tag === "bestseller" ? "🔥 Bán chạy" : tag === "popular" ? "⭐ Phổ biến" : tag === "new" ? "✨ Mới" : "🎯 Giới hạn"}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {product.nameVi}
              </h1>

              {product.occasion && (
                <span className="inline-block px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium">
                  🎉 {product.occasion}
                </span>
              )}

              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.longDescription || product.description}
              </p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                {product.weight && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-cream">
                    <Package className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Trọng lượng</p>
                      <p className="font-medium text-foreground">{product.weight}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-cream">
                  <Star className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Đánh giá</p>
                    <p className="font-medium text-foreground">4.8/5 ⭐</p>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Thành phần
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-3 py-1 rounded-full bg-cream text-sm text-foreground"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
                <Link
                  to="/checkout"
                  className="btn-accent flex-1 text-center flex items-center justify-center gap-2"
                >
                  Mua ngay
                </Link>
              </div>

              {/* QR */}
              <div className="p-4 rounded-xl bg-cream flex items-center gap-4">
                <QrCode className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Quét QR để xem chi tiết</p>
                  <p className="text-sm text-muted-foreground">
                    Mỗi sản phẩm có mã QR riêng dẫn đến trang chi tiết & câu chuyện
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Sản phẩm tương tự
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
