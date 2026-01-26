import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gift, Heart, Send, QrCode, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/mockData";
import heroBanner from "@/assets/hero-banner.jpg";
import storyImage from "@/assets/story-image.jpg";
import qrIllustration from "@/assets/qr-illustration.jpg";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const featuredProducts = products.slice(0, 4);

  const handleAddToBox = (product: Product) => {
    toast({
      title: "Đã thêm vào hộp quà",
      description: `${product.nameVi} đã được thêm vào hộp quà của bạn`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Gửi thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn sớm nhất.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Chè lam truyền thống"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="container-wide px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6">
              🎁 Quà tặng truyền thống
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Chè lam – <span className="text-primary">vị ngọt tuổi thơ</span> trong từng món quà
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Gói ghém yêu thương cùng những miếng chè lam thơm ngon, 
              mang đậm hương vị truyền thống Việt Nam.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/build-box" className="btn-primary flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Tạo hộp quà
              </Link>
              <Link to="/build-box" className="btn-outline flex items-center gap-2">
                Mua ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
            >
              <img
                src={storyImage}
                alt="Câu chuyện chè lam"
                className="w-full rounded-3xl shadow-elevated"
              />
            </motion.div>

            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm">
                <Heart className="w-4 h-4 inline mr-2" />
                Câu chuyện của chúng tôi
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Hương vị truyền thống, <span className="text-primary">tình yêu hiện đại</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Chè lam là món bánh truyền thống của người Việt, thường xuất hiện trong 
                mỗi dịp Tết đến xuân về. Được làm từ bột nếp rang, mạch nha và lạc, 
                mỗi miếng chè lam mang trong mình hương vị của ký ức tuổi thơ.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Tại Chè Lam Gift Box, chúng tôi kết hợp công thức truyền thống cùng 
                những hương vị mới lạ, tạo nên những món quà độc đáo dành tặng người thân yêu.
              </p>
              <Link
                to="/build-box"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Khám phá thêm <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">
              Sản phẩm nổi bật
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hương vị <span className="text-primary">đa dạng</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Từ vị truyền thống đến các biến tấu hiện đại, 
              chọn hương vị yêu thích cho hộp quà của bạn.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToBox}
              />
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/build-box" className="btn-secondary inline-flex items-center gap-2">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QR / E-Card Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
              className="space-y-6 order-2 lg:order-1"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <QrCode className="w-4 h-4 inline mr-2" />
                Tính năng độc đáo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Gửi lời yêu thương <span className="text-primary">qua mã QR</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Kèm theo mỗi hộp quà là một thiệp điện tử đặc biệt. Người nhận chỉ cần 
                quét mã QR để xem lời chúc, video hoặc hình ảnh bạn gửi gắm.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm">✓</span>
                  Viết lời chúc cá nhân hóa
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm">✓</span>
                  Đính kèm video kỷ niệm
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm">✓</span>
                  In thiệp giấy hoặc gửi online
                </li>
              </ul>
              <Link to="/e-card" className="btn-primary inline-flex items-center gap-2">
                <Send className="w-4 h-4" />
                Tạo thiệp ngay
              </Link>
            </motion.div>

            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
              className="order-1 lg:order-2"
            >
              <img
                src={qrIllustration}
                alt="QR Code Gift"
                className="w-full max-w-md mx-auto rounded-3xl shadow-elevated animate-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
              className="text-center mb-10"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">
                Liên hệ
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Bạn cần <span className="text-primary">hỗ trợ?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Gửi tin nhắn cho chúng tôi, đội ngũ sẽ phản hồi trong thời gian sớm nhất.
              </p>
            </motion.div>

            <motion.form
              {...fadeInUp}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
              onSubmit={handleSubmit}
              className="card-elevated p-8"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-warm w-full"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-warm w-full"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-warm w-full min-h-[120px] resize-none"
                    placeholder="Nội dung tin nhắn..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Gửi tin nhắn
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
