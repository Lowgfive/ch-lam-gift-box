import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Scene3D from "@/components/3d/Scene3D";
import { products, Product, formatPrice } from "@/data/mockData";
import { Gift, CreditCard, Sparkles, Package, RotateCcw, MousePointer } from "lucide-react";

const MAX_ITEMS = 9;

const BuildBox = () => {
  const [boxItems, setBoxItems] = useState<(string | null)[]>(
    Array(MAX_ITEMS).fill(null)
  );

  const selectedCount = boxItems.filter(Boolean).length;
  
  // Calculate total price based on product IDs in box
  const totalPrice = boxItems.reduce((sum, productId) => {
    if (!productId) return sum;
    const product = products.find(p => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);

  const handleAddItem = (productId: string) => {
    if (selectedCount >= MAX_ITEMS) return;
    const emptyIndex = boxItems.findIndex((item) => item === null);
    if (emptyIndex === -1) return;
    const newItems = [...boxItems];
    newItems[emptyIndex] = productId;
    setBoxItems(newItems);
  };

  const handleDropItem = (productId: string, slotIndex: number) => {
    if (selectedCount >= MAX_ITEMS) return;
    if (slotIndex < 0 || slotIndex >= MAX_ITEMS) return;
    if (boxItems[slotIndex] !== null) return;
    const newItems = [...boxItems];
    newItems[slotIndex] = productId;
    setBoxItems(newItems);
  };

  const handleReset = () => {
    setBoxItems(Array(MAX_ITEMS).fill(null));
  };

  const getItemCount = (productId: string) => {
    return boxItems.filter((id) => id === productId).length;
  };

  return (
    <Layout>
      <section className="section-padding bg-gradient-hero min-h-screen">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">
              <Package className="w-4 h-4 inline mr-2" />
              Tạo hộp quà 3D
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Chọn <span className="text-primary">9 món chè lam</span> yêu thích
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              Xoay hộp quà 360° và kéo thả các viên chè lam vào hộp
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MousePointer className="w-4 h-4" />
                Kéo để xoay
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-4 h-4" />
                Tự động xoay
              </span>
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="card-elevated overflow-hidden">
              <Scene3D
                products={products}
                boxItems={boxItems}
                onDropItem={handleDropItem}
                selectedCount={selectedCount}
                maxItems={MAX_ITEMS}
              />
            </div>
          </motion.div>

          {/* Bottom Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Selected Items Summary */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Hộp quà của bạn
                </h2>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {selectedCount}/{MAX_ITEMS}
                  </span>
                  {selectedCount > 0 && (
                    <button
                      onClick={handleReset}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      title="Làm mới"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Item breakdown */}
              <div className="space-y-2 mb-4 max-h-[150px] overflow-y-auto">
                {products.map((product) => {
                  const count = getItemCount(product.id);
                  if (count === 0) return null;
                  return (
                    <div key={product.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{product.nameVi}</span>
                      <span className="text-muted-foreground">
                        x{count} = {formatPrice(product.price * count)}
                      </span>
                    </div>
                  );
                })}
                {selectedCount === 0 && (
                  <p className="text-muted-foreground text-sm italic">
                    Kéo các viên chè lam vào hộp quà...
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Tổng cộng:</span>
                  <span className="font-display text-xl font-bold text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-elevated p-6 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Hương vị có sẵn
                </h2>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleAddItem(product.id)}
                      disabled={selectedCount >= MAX_ITEMS}
                      className="p-3 rounded-xl bg-cream hover:bg-cream/80 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="font-medium text-foreground text-sm block truncate">
                        {product.nameVi}
                      </span>
                      <span className="text-primary text-xs">
                        {formatPrice(product.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/e-card"
                  className="btn-outline flex-1 text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Thêm thiệp
                </Link>
                <Link
                  to="/checkout"
                  className={`btn-primary flex-1 text-center flex items-center justify-center gap-2 ${
                    selectedCount === 0 ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Thanh toán
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BuildBox;
