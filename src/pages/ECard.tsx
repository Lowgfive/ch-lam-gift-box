import { useState } from "react";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  QrCode,
  Upload,
  Save,
  Heart,
  ArrowRight,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ECard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    senderName: "",
    receiverName: "",
    message: "",
    generateQR: true,
    uploadVideo: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Lưu thành công!",
      description: "Thiệp điện tử của bạn đã được lưu.",
    });
  };

  return (
    <Layout>
      {/* National Day Full Background */}
      {theme === "national" && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img src="/assets/national-bg-page1.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
        </div>
      )}
      <section className="section-padding bg-gradient-hero min-h-screen relative">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">
              <Heart className="w-4 h-4 inline mr-2" />
              Thiệp điện tử
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Gửi <span className="text-primary">lời yêu thương</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tạo thiệp điện tử cá nhân hóa để gửi cùng hộp quà
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="card-elevated p-6 md:p-8 space-y-6">
                <div>
                  <label
                    htmlFor="senderName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Tên người gửi
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    value={formData.senderName}
                    onChange={(e) =>
                      setFormData({ ...formData, senderName: e.target.value })
                    }
                    className="input-warm w-full"
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="receiverName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Tên người nhận
                  </label>
                  <input
                    type="text"
                    id="receiverName"
                    value={formData.receiverName}
                    onChange={(e) =>
                      setFormData({ ...formData, receiverName: e.target.value })
                    }
                    className="input-warm w-full"
                    placeholder="Nhập tên người nhận"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Lời chúc
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="input-warm w-full min-h-[150px] resize-none"
                    placeholder="Viết lời chúc của bạn..."
                    required
                  />
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Tùy chọn</p>


                  <label className="flex items-center gap-3 p-4 rounded-xl bg-cream hover:bg-cream/80 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.generateQR}
                      onChange={(e) =>
                        setFormData({ ...formData, generateQR: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <QrCode className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <span className="font-medium text-foreground">Tạo mã QR</span>
                      <p className="text-sm text-muted-foreground">
                        Người nhận quét QR để xem lời chúc
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl bg-cream hover:bg-cream/80 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.uploadVideo}
                      onChange={(e) =>
                        setFormData({ ...formData, uploadVideo: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <Upload className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <span className="font-medium text-foreground">Tải video</span>
                      <p className="text-sm text-muted-foreground">
                        Đính kèm video kỷ niệm (tối đa 30s)
                      </p>
                    </div>
                  </label>
                </div>

                {formData.uploadVideo && (
                  <div className="p-4 rounded-xl border-2 border-dashed border-border text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Kéo thả hoặc click để tải video
                    </p>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id="videoUpload"
                    />
                  </div>
                )}

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Lưu thiệp
                </button>
              </form>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-elevated p-6 md:p-8 sticky top-24">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-terracotta" />
                  Xem trước thiệp
                </h2>

                {/* Card Preview */}
                <div className="bg-cream rounded-2xl p-6 md:p-8 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-accent/30 to-transparent rounded-br-full" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-full" />

                  <div className="relative space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Gửi đến{" "}
                      <span className="font-semibold text-primary">
                        {formData.receiverName || "..."}
                      </span>
                    </p>

                    <p className="font-display text-lg text-foreground leading-relaxed min-h-[100px]">
                      {formData.message || "Lời chúc của bạn sẽ hiển thị ở đây..."}
                    </p>

                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground">
                        Yêu thương từ{" "}
                        <span className="font-semibold text-foreground">
                          {formData.senderName || "..."}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code Preview */}
                {formData.generateQR && (
                  <div className="mt-6 p-4 bg-cream rounded-xl flex items-center gap-4">
                    <div className="w-20 h-20 bg-foreground rounded-lg flex items-center justify-center">
                      <div className="w-16 h-16 bg-background rounded grid grid-cols-4 grid-rows-4 gap-0.5 p-1">
                        {Array(16)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className={`${
                                Math.random() > 0.5 ? "bg-foreground" : "bg-background"
                              }`}
                            />
                          ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Mã QR của bạn</p>
                      <p className="text-sm text-muted-foreground">
                        Quét để xem lời chúc
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-secondary" />
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <Link
                    to="/build-box"
                    className="btn-outline flex-1 text-center text-sm"
                  >
                    Quay lại
                  </Link>
                  <Link
                    to="/checkout"
                    className="btn-primary flex-1 text-center flex items-center justify-center gap-2 text-sm"
                  >
                    Tiếp tục
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ECard;
