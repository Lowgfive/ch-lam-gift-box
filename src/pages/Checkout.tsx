import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import {
  CreditCard,
  Wallet,
  Building2,
  Package,
  Check,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const mockOrder = {
  items: [
    { name: "Chè lam truyền thống", quantity: 3, price: 35000 },
    { name: "Chè lam matcha", quantity: 2, price: 45000 },
    { name: "Chè lam cacao", quantity: 2, price: 45000 },
    { name: "Chè lam gừng mật ong", quantity: 2, price: 40000 },
  ],
  eCard: 0,
  shipping: 30000,
};

const paymentMethods = [
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng",
    description: "COD - Trả tiền mặt khi nhận hàng",
    icon: Package,
  },
  {
    id: "momo",
    name: "Ví MoMo",
    description: "Thanh toán qua ví điện tử MoMo",
    icon: Wallet,
  },
  {
    id: "bank",
    name: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản qua tài khoản ngân hàng",
    icon: Building2,
  },
];

const Checkout = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const subtotal = mockOrder.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + mockOrder.eCard + mockOrder.shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đặt hàng thành công! 🎉",
      description: "Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.",
    });
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
              <ShoppingBag className="w-4 h-4 inline mr-2" />
              Thanh toán
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hoàn tất <span className="text-primary">đơn hàng</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Info */}
                <div className="card-elevated p-6 md:p-8 space-y-6">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Thông tin giao hàng
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="input-warm w-full"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="input-warm w-full"
                        placeholder="0909 123 456"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input-warm w-full"
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Địa chỉ giao hàng
                    </label>
                    <textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="input-warm w-full min-h-[80px] resize-none"
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      required
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="card-elevated p-6 md:p-8 space-y-4">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Phương thức thanh toán
                  </h2>

                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-cream border-2 border-transparent hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-5 h-5 text-primary focus:ring-primary"
                      />
                      <method.icon className="w-6 h-6 text-primary" />
                      <div className="flex-1">
                        <span className="font-medium text-foreground">
                          {method.name}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      {formData.paymentMethod === method.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
                >
                  <CreditCard className="w-5 h-5" />
                  Đặt hàng
                </button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-elevated p-6 md:p-8 sticky top-24">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Đơn hàng của bạn
                </h2>

                <div className="space-y-4">
                  {mockOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-cream flex items-center justify-center text-xl">
                          🍬
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            x{item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Thiệp điện tử</span>
                    <span>{formatPrice(mockOrder.eCard)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(mockOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-display text-lg font-semibold text-foreground">
                      Tổng cộng
                    </span>
                    <span className="font-display text-2xl font-bold text-primary">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary/10 rounded-xl">
                  <p className="text-sm text-secondary flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Đơn hàng sẽ được giao trong 2-3 ngày làm việc
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
