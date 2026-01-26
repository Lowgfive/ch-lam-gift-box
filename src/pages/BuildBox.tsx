import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Layout from "@/components/layout/Layout";
import BoxSlot from "@/components/BoxSlot";
import { products, Product, formatPrice, CartItem } from "@/data/mockData";
import { Gift, CreditCard, Plus, Minus, Package, Sparkles } from "lucide-react";
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

const MAX_ITEMS = 9;

const BuildBox = () => {
  const [boxItems, setBoxItems] = useState<(CartItem | null)[]>(
    Array(MAX_ITEMS).fill(null)
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const selectedCount = boxItems.filter(Boolean).length;
  const totalPrice = boxItems.reduce(
    (sum, item) => sum + (item?.price || 0),
    0
  );

  const handleAddItem = (product: Product) => {
    if (selectedCount >= MAX_ITEMS) return;

    const emptyIndex = boxItems.findIndex((item) => item === null);
    if (emptyIndex !== -1) {
      const newItems = [...boxItems];
      newItems[emptyIndex] = { ...product, slotIndex: emptyIndex };
      setBoxItems(newItems);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...boxItems];
    newItems[index] = null;
    setBoxItems(newItems);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeIndex = boxItems.findIndex(
      (item) => item && `slot-${item.slotIndex}` === active.id
    );
    const overIndex = parseInt(over.id.toString().replace("slot-", ""));

    if (activeIndex !== -1 && activeIndex !== overIndex) {
      const newItems = [...boxItems];
      const temp = newItems[activeIndex];
      newItems[activeIndex] = newItems[overIndex];
      newItems[overIndex] = temp
        ? { ...temp, slotIndex: overIndex }
        : null;
      if (newItems[activeIndex]) {
        newItems[activeIndex] = {
          ...newItems[activeIndex]!,
          slotIndex: activeIndex,
        };
      }
      setBoxItems(newItems);
    }
  };

  const getItemCount = (productId: string) => {
    return boxItems.filter((item) => item?.id === productId).length;
  };

  return (
    <Layout>
      <section className="section-padding bg-gradient-hero min-h-screen">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">
              <Package className="w-4 h-4 inline mr-2" />
              Tạo hộp quà
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Chọn <span className="text-primary">9 món chè lam</span> yêu thích
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Kéo thả hoặc nhấn nút để thêm sản phẩm vào hộp quà của bạn
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gift Box Grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="card-elevated p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    Hộp quà của bạn
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {selectedCount}/{MAX_ITEMS}
                  </span>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={boxItems.map((_, i) => `slot-${i}`)}
                    strategy={rectSortingStrategy}
                  >
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {boxItems.map((item, index) => (
                        <BoxSlot
                          key={`slot-${index}`}
                          id={`slot-${index}`}
                          product={item || undefined}
                          index={index}
                          onRemove={item ? handleRemoveItem : undefined}
                        />
                      ))}
                    </div>
                  </SortableContext>

                  <DragOverlay>
                    {activeId && (
                      <div className="w-20 h-20 rounded-xl bg-accent shadow-elevated flex items-center justify-center">
                        <span className="text-2xl">🍬</span>
                      </div>
                    )}
                  </DragOverlay>
                </DndContext>

                {/* Summary */}
                <div className="mt-8 pt-6 border-t border-border space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Tổng cộng:</span>
                    <span className="font-display text-xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </span>
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
              </div>
            </motion.div>

            {/* Product List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="card-elevated p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Chọn hương vị
                </h2>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  <AnimatePresence>
                    {products.map((product) => {
                      const count = getItemCount(product.id);
                      const canAdd = selectedCount < MAX_ITEMS;

                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-cream hover:bg-cream/80 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {productImages[product.id] ? (
                              <img
                                src={productImages[product.id]}
                                alt={product.nameVi}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">
                                🍬
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {product.nameVi}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {product.description}
                            </p>
                            <p className="text-primary font-semibold mt-1">
                              {formatPrice(product.price)}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {count > 0 && (
                              <>
                                <button
                                  onClick={() => {
                                    let lastIndex = -1;
                                    for (let i = boxItems.length - 1; i >= 0; i--) {
                                      if (boxItems[i]?.id === product.id) {
                                        lastIndex = i;
                                        break;
                                      }
                                    }
                                    if (lastIndex !== -1) {
                                      handleRemoveItem(lastIndex);
                                    }
                                  }}
                                  className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold">
                                  {count}
                                </span>
                              </>
                            )}
                            <button
                              onClick={() => handleAddItem(product)}
                              disabled={!canAdd}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                canAdd
                                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                  : "bg-muted text-muted-foreground cursor-not-allowed"
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BuildBox;
