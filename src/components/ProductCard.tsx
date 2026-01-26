import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product, formatPrice } from "@/data/mockData";
import productTraditional from "@/assets/product-traditional.jpg";
import productMatcha from "@/assets/product-matcha.jpg";
import productCacao from "@/assets/product-cacao.jpg";
import productGinger from "@/assets/product-ginger.jpg";

const productImages: Record<string, string> = {
  "1": productTraditional,
  "2": productMatcha,
  "3": productCacao,
  "4": productGinger,
};

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
  showAddButton?: boolean;
  isDraggable?: boolean;
}

const ProductCard = ({
  product,
  onAdd,
  showAddButton = true,
  isDraggable = false,
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`product-card group ${isDraggable ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-cream mb-4">
        {productImages[product.id] ? (
          <img
            src={productImages[product.id]}
            alt={product.nameVi}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <span className="text-4xl">🍬</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.nameVi}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          {showAddButton && onAdd && (
            <button
              onClick={() => onAdd(product)}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-all hover:scale-105 shadow-card"
              aria-label={`Add ${product.name} to box`}
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
