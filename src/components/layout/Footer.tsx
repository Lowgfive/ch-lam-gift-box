import { Gift, Phone, MapPin, Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-semibold">
                Chè Lam Gift Box
              </span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Mang hương vị truyền thống đến từng món quà, 
              gói ghém yêu thương trong từng hộp chè lam.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Liên kết</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/build-box" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Tạo hộp quà
                </Link>
              </li>
              <li>
                <Link to="/e-card" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Thiệp điện tử
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">0909 123 456</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-1" />
                <span className="text-primary-foreground/80">
                  123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80">hello@chelam.vn</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Theo dõi</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Theo dõi để cập nhật ưu đãi mới nhất!
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
          © 2024 Chè Lam Gift Box. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
