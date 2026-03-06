export interface Product {
  id: string;
  name: string;
  nameVi: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  longDescription?: string;
  category: "traditional" | "fusion" | "special" | "combo";
  tags?: string[];
  occasion?: string;
  inStock?: boolean;
  weight?: string;
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const products: Product[] = [
  // === TRUYỀN THỐNG ===
  {
    id: "1",
    name: "Traditional",
    nameVi: "Chè lam truyền thống",
    price: 35000,
    image: "traditional",
    description: "Hương vị chè lam nguyên bản, ngọt dịu từ mật mía",
    longDescription: "Chè lam truyền thống được làm từ bột nếp rang thơm, mạch nha và lạc rang giòn. Mỗi miếng chè lam mang trong mình hương vị của ký ức tuổi thơ, ngọt dịu từ mật mía tự nhiên.",
    category: "traditional",
    tags: ["bestseller"],
    inStock: true,
    weight: "200g",
    ingredients: ["Bột nếp rang", "Mạch nha", "Lạc rang", "Mật mía", "Gừng"],
  },
  {
    id: "2",
    name: "Matcha",
    nameVi: "Chè lam matcha",
    price: 45000,
    image: "matcha",
    description: "Vị trà xanh Nhật Bản hòa quyện cùng chè lam",
    longDescription: "Sự kết hợp tinh tế giữa bột matcha Nhật Bản cao cấp và chè lam truyền thống. Vị đắng nhẹ của trà xanh cân bằng hoàn hảo với vị ngọt dịu của mạch nha.",
    category: "fusion",
    tags: ["popular"],
    inStock: true,
    weight: "200g",
    ingredients: ["Bột nếp rang", "Bột matcha", "Mạch nha", "Lạc rang"],
  },
  {
    id: "3",
    name: "Cacao",
    nameVi: "Chè lam cacao",
    price: 45000,
    image: "cacao",
    description: "Đậm đà vị cacao nguyên chất",
    longDescription: "Bột cacao nguyên chất được hòa quyện cùng chè lam truyền thống, tạo nên hương vị đậm đà, thơm lừng. Phù hợp cho những ai yêu thích vị socola.",
    category: "fusion",
    tags: ["popular"],
    inStock: true,
    weight: "200g",
    ingredients: ["Bột nếp rang", "Bột cacao", "Mạch nha", "Lạc rang"],
  },
  {
    id: "4",
    name: "Ginger Honey",
    nameVi: "Chè lam gừng mật ong",
    price: 40000,
    image: "ginger",
    description: "Ấm nồng vị gừng tươi, ngọt dịu mật ong rừng",
    longDescription: "Gừng tươi Hưng Yên kết hợp mật ong rừng nguyên chất, mang đến vị ấm nồng đặc trưng. Đặc biệt thích hợp cho mùa đông se lạnh.",
    category: "traditional",
    tags: [],
    inStock: true,
    weight: "200g",
    ingredients: ["Bột nếp rang", "Gừng tươi", "Mật ong rừng", "Mạch nha", "Lạc rang"],
  },
  {
    id: "5",
    name: "Black Sesame",
    nameVi: "Chè lam mè đen",
    price: 42000,
    image: "sesame",
    description: "Thơm bùi vị mè đen rang, bổ dưỡng tự nhiên",
    longDescription: "Mè đen rang thơm bùi hòa vào từng miếng chè lam, tạo nên hương vị đậm đà và giàu dinh dưỡng. Mè đen giàu canxi và khoáng chất tốt cho sức khỏe.",
    category: "traditional",
    tags: ["new"],
    inStock: true,
    weight: "200g",
    ingredients: ["Bột nếp rang", "Mè đen rang", "Mạch nha", "Lạc rang"],
  },
  {
    id: "6",
    name: "Coconut",
    nameVi: "Chè lam dừa",
    price: 42000,
    image: "coconut",
    description: "Béo ngậy nước cốt dừa, thơm lừng cơm dừa nạo",
    longDescription: "Nước cốt dừa béo ngậy hòa quyện cùng cơm dừa nạo mịn, tạo nên hương vị nhiệt đới đặc trưng cho từng miếng chè lam.",
    category: "fusion",
    tags: [],
    inStock: true,
    weight: "200g",
    ingredients: ["Bột nếp rang", "Nước cốt dừa", "Cơm dừa nạo", "Mạch nha"],
  },

  // === PHIÊN BẢN ĐẶC BIỆT ===
  {
    id: "sp-valentine",
    name: "Valentine Edition",
    nameVi: "Phiên bản Valentine",
    price: 120000,
    originalPrice: 150000,
    image: "valentine",
    description: "Hộp quà tình yêu với hình trái tim, kèm thiệp handmade",
    longDescription: "Phiên bản giới hạn dành riêng cho ngày Valentine. Hộp quà hình trái tim chứa 6 viên chè lam đặc biệt phủ socola hồng, kèm thiệp handmade và hoa khô.",
    category: "special",
    tags: ["limited"],
    occasion: "Valentine",
    inStock: true,
    weight: "300g",
  },
  {
    id: "sp-tet",
    name: "Tết Edition",
    nameVi: "Phiên bản Tết",
    price: 180000,
    originalPrice: 220000,
    image: "tet",
    description: "Hộp quà Tết sang trọng, bao bì truyền thống, kèm câu đối",
    longDescription: "Hộp quà Tết cao cấp với bao bì truyền thống màu đỏ - vàng. Bao gồm 9 viên chè lam hảo hạng, câu đối và thiệp chúc Tết.",
    category: "special",
    tags: ["bestseller", "limited"],
    occasion: "Tết",
    inStock: true,
    weight: "500g",
  },
  {
    id: "sp-birthday",
    name: "Birthday Edition",
    nameVi: "Phiên bản sinh nhật",
    price: 99000,
    image: "birthday",
    description: "Hộp quà sinh nhật đáng yêu, kèm nến và thiệp cá nhân hóa",
    longDescription: "Hộp quà sinh nhật với bao bì đầy màu sắc, chứa 6 viên chè lam với các hương vị đa dạng, kèm nến mini và thiệp cá nhân hóa.",
    category: "special",
    tags: [],
    occasion: "Sinh nhật",
    inStock: true,
    weight: "250g",
  },
  {
    id: "sp-304",
    name: "30/4 - 1/5 Edition",
    nameVi: "Phiên bản 30/4 - 1/5",
    price: 135000,
    originalPrice: 160000,
    image: "national",
    description: "Kỷ niệm ngày lễ lớn với hộp quà mang đậm bản sắc dân tộc",
    longDescription: "Phiên bản đặc biệt kỷ niệm ngày thống nhất đất nước. Bao bì mang màu cờ Tổ quốc, chứa 9 viên chè lam truyền thống.",
    category: "special",
    tags: ["limited"],
    occasion: "30/4 - 1/5",
    inStock: true,
    weight: "400g",
  },

  // === COMBO ===
  {
    id: "combo-3",
    name: "Combo 3 Flavors",
    nameVi: "Combo 3 hương vị",
    price: 110000,
    originalPrice: 125000,
    image: "combo3",
    description: "3 hương vị: Truyền thống + Matcha + Cacao",
    longDescription: "Combo tiết kiệm gồm 3 hương vị được yêu thích nhất: Chè lam truyền thống, Matcha và Cacao. Mỗi hương vị 200g, đựng trong hộp quà sang trọng.",
    category: "combo",
    tags: ["bestseller"],
    inStock: true,
    weight: "600g",
  },
  {
    id: "combo-6",
    name: "Combo 6 Flavors",
    nameVi: "Combo 6 hương vị",
    price: 220000,
    originalPrice: 260000,
    image: "combo6",
    description: "Trọn bộ 6 hương vị chè lam trong hộp quà cao cấp",
    longDescription: "Combo đầy đủ 6 hương vị: Truyền thống, Matcha, Cacao, Gừng mật ong, Mè đen và Dừa. Đóng trong hộp quà cao cấp, lý tưởng làm quà biếu.",
    category: "combo",
    tags: ["bestseller", "popular"],
    inStock: true,
    weight: "1.2kg",
  },
];

export const categories = [
  { id: "all", label: "Tất cả", icon: "🍬" },
  { id: "traditional", label: "Truyền thống", icon: "🏮" },
  { id: "fusion", label: "Hương vị mới", icon: "✨" },
  { id: "special", label: "Phiên bản đặc biệt", icon: "🎁" },
  { id: "combo", label: "Combo tiết kiệm", icon: "📦" },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
