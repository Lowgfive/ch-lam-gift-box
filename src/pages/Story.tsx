import { motion } from "framer-motion";
import { Heart, Leaf, Clock, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import StickyAudioPlayer from "@/components/StickyAudioPlayer";
import storyImage from "@/assets/story-image.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Story = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Làng nghề chè lam" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6">
            <Heart className="w-4 h-4 inline mr-2" />
            Câu chuyện của chúng tôi
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Hành trình của <span className="text-primary">Chè Lam</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Từ làng nghề truyền thống đến bàn ăn hiện đại
          </p>
        </motion.div>
      </section>

      {/* History */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto">
          <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Lịch sử chè lam</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Chè lam có nguồn gốc từ vùng đất Phủ Quốc Oai, Hà Nội, với lịch sử hàng trăm năm. 
                Đây là món bánh truyền thống không thể thiếu trong mỗi dịp Tết cổ truyền của người Việt.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Theo truyền thuyết, chè lam ra đời từ thời kỳ các vua Hùng, 
                khi người dân sử dụng bột nếp rang trộn với mật mía và lạc để làm lương thực dự trữ. 
                Qua thời gian, món ăn này trở thành đặc sản quý, biểu tượng cho sự ấm áp và đoàn viên.
              </p>
            </div>
            <img src={storyImage} alt="Lịch sử chè lam" className="w-full rounded-2xl shadow-elevated" />
          </motion.div>
        </div>
      </section>

      {/* Production Process */}
      <section className="section-padding bg-cream">
        <div className="container-wide max-w-4xl mx-auto">
          <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Quy trình sản xuất truyền thống</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mỗi miếng chè lam được làm thủ công qua nhiều công đoạn tỉ mỉ
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Chọn nguyên liệu", desc: "Nếp cái hoa vàng, mạch nha tự nhiên, lạc rang giòn" },
              { step: "02", title: "Rang bột nếp", desc: "Rang trên lửa nhỏ đến khi thơm lừng, vàng đều" },
              { step: "03", title: "Nấu mạch nha", desc: "Đun mạch nha với gừng tươi đến độ kéo sợi" },
              { step: "04", title: "Trộn & đóng gói", desc: "Trộn đều, cán phẳng, cắt miếng và đóng gói" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl p-6 shadow-card text-center"
              >
                <span className="text-4xl font-display font-bold text-primary/20">{item.step}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Meaning */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto">
          <motion.div {...fadeInUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="grid md:grid-cols-2 gap-12 items-center">
            <img src={heroBanner} alt="Ý nghĩa văn hóa" className="w-full rounded-2xl shadow-elevated order-2 md:order-1" />
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Ý nghĩa văn hóa</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Chè lam không chỉ là một món ăn, mà còn là biểu tượng văn hóa của người Việt. 
                Trong mỗi dịp Tết, miếng chè lam gói ghém tình cảm gia đình, 
                sự kính trọng tổ tiên và niềm tự hào về truyền thống.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tặng chè lam là tặng một phần hồn Việt – vị ngọt của yêu thương, 
                hương thơm của kỷ niệm và sự ấm áp của quê hương.
              </p>
              <ul className="space-y-3">
                {[
                  "Biểu tượng của sự đoàn viên gia đình",
                  "Quà Tết truyền thống lâu đời",
                  "Kết nối thế hệ qua hương vị",
                  "Di sản ẩm thực cần được bảo tồn",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <StickyAudioPlayer />
    </Layout>
  );
};

export default Story;
