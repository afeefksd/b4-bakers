export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Ghee' | 'Fruit Crushes' | 'Baking Supplies' | 'Other';
  createdAt: number;
}

export interface Banner {
  id: string;
  image: string;
  order: number;
  createdAt: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  createdAt: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  businessName: string;
  message: string;
  items: CartItem[];
}

