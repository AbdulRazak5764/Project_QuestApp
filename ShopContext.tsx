import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviews: Review[];
  images: string[];
  category: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  features?: string[];
  isExclusive?: boolean;
  questCoinsPrice?: number;
  popularity: number;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

interface PurchaseHistory {
  id: string;
  productName: string;
  price: number;
  image: string;
  orderId: string;
  date: string;
}

interface ShopContextType {
  products: Product[];
  trendingProducts: Product[];
  relatedProducts: Product[];
  categories: Category[];
  purchaseHistory: PurchaseHistory[];
  getProductById: (id: string) => Product | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories] = useState<Category[]>([
    { id: 'fashion', name: 'Fashion' },
    { id: 'tech', name: 'Technology' },
    { id: 'home', name: 'Home Decor' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' },
  ]);
  
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium wireless headphones with active noise cancellation.',
      fullDescription: 'Experience immersive sound with these premium wireless headphones featuring active noise cancellation technology. Perfect for travel, work, or enjoying your favorite music without distractions. The comfortable over-ear design and long battery life ensure hours of listening pleasure.',
      price: 299.99,
      salePrice: 249.99,
      rating: 4.7,
      reviews: [],
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
      ],
      category: 'tech',
      popularity: 5,
      createdAt: new Date().toISOString(),
    }
  ]);

  const [trendingProducts] = useState<Product[]>([]);
  const [relatedProducts] = useState<Product[]>([]);
  const [purchaseHistory] = useState<PurchaseHistory[]>([]);

  const getProductById = (id: string) => products.find(product => product.id === id);

  return (
    <ShopContext.Provider value={{ products, trendingProducts, relatedProducts, categories, purchaseHistory, getProductById }}>
      {children}
    </ShopContext.Provider>
  );
};



export { ShopProvider, useShop };
