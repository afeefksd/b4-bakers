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

export interface AboutContent {
  id: string;
  title: string;
  intro: string;
  subtitle: string;
  offerings: AboutOffering[];
  outro: string;
  updatedAt: number;
}

export interface AboutOffering {
  icon: string;
  title: string;
  description: string;
}

