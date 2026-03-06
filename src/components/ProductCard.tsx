import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/data/mockData";
import { productImages } from "@/data/productImages";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

const tagColors: Record<string, string> = {
  bestseller: "bg-accent text-accent-foreground",
  popular: "bg-secondary text-secondary-foreground",
  new: "bg-primary text-primary-foreground",
  limited: "bg-terracotta text-terracotta-foreground",
};

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="product-card group relative"
    >
      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="absolute top-3 left-3 z-10 flex gap-1">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag] || "bg-muted text-muted-foreground"}`}
            >
              {tag === "bestseller" ? "Bán chạy" : tag === "popular" ? "Phổ biến" : tag === "new" ? "Mới" : "Giới hạn"}
            </span>
          ))}
        </div>
      )}

      <Link to={`/product/${product.id}`}>
        <div className="aspect-square rounded-xl overflow-hidden bg-cream mb-4">
          {productImages[product.image] ? (
            <img
              src={productImages[product.image]}
              alt={product.nameVi}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <span className="text-4xl">🍬</span>
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.nameVi}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        {product.weight && (
          <p className="text-xs text-muted-foreground">{product.weight}</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {onAdd && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onAdd(product);
              }}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-all hover:scale-105 shadow-card"
              aria-label={`Thêm ${product.nameVi} vào giỏ`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
