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
    nameVi: "Truyền thống",
    price: 35000,
    image: "/placeholder-traditional.jpg",
    description: "Hương vị chè lam nguyên bản, ngọt dịu từ mật mía",
    category: "classic",
  },
  {
    id: "2",
    name: "Matcha",
    nameVi: "Matcha",
    price: 45000,
    image: "/placeholder-matcha.jpg",
    description: "Vị trà xanh Nhật Bản hòa quyện cùng chè lam",
    category: "fusion",
  },
  {
    id: "3",
    name: "Cacao",
    nameVi: "Cacao",
    price: 45000,
    image: "/placeholder-cacao.jpg",
    description: "Đậm đà vị cacao nguyên chất",
    category: "fusion",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
