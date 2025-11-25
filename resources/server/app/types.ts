export interface Product {
  id: string;
  title: string;
  description: string;
  photo: string;
  price: number;
  stock: number;
}

export interface BasketItem {
  id: string;
  title: string;
  price: number;
}
