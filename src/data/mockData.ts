export interface Product {
  id: string;
  name: string;
  nameVi: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  slotIndex: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Traditional",
    nameVi: "Chè lam truyền thống",
    price: 35000,
    image: "/placeholder-traditional.jpg",
    description: "Hương vị chè lam nguyên bản, ngọt dịu từ mật mía",
    category: "classic",
  },
  {
    id: "2",
    name: "Matcha",
    nameVi: "Chè lam matcha",
    price: 45000,
    image: "/placeholder-matcha.jpg",
    description: "Vị trà xanh Nhật Bản hòa quyện cùng chè lam",
    category: "fusion",
  },
  {
    id: "3",
    name: "Cacao",
    nameVi: "Chè lam cacao",
    price: 45000,
    image: "/placeholder-cacao.jpg",
    description: "Đậm đà vị cacao nguyên chất",
    category: "fusion",
  },
  {
    id: "4",
    name: "Ginger Honey",
    nameVi: "Chè lam gừng mật ong",
    price: 40000,
    image: "/placeholder-ginger.jpg",
    description: "Ấm áp vị gừng, ngọt thanh mật ong",
    category: "classic",
  },
  {
    id: "5",
    name: "Pandan",
    nameVi: "Chè lam lá dứa",
    price: 40000,
    image: "/placeholder-pandan.jpg",
    description: "Thơm ngát hương lá dứa thiên nhiên",
    category: "fusion",
  },
  {
    id: "6",
    name: "Coconut",
    nameVi: "Chè lam dừa",
    price: 42000,
    image: "/placeholder-coconut.jpg",
    description: "Béo thơm vị dừa tươi miền Tây",
    category: "classic",
  },
  {
    id: "7",
    name: "Sesame",
    nameVi: "Chè lam mè đen",
    price: 42000,
    image: "/placeholder-sesame.jpg",
    description: "Bùi bùi vị mè đen rang",
    category: "classic",
  },
  {
    id: "8",
    name: "Peanut",
    nameVi: "Chè lam đậu phộng",
    price: 38000,
    image: "/placeholder-peanut.jpg",
    description: "Giòn tan đậu phộng trong từng miếng",
    category: "classic",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
