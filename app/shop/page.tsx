'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import styles from './shop.module.css';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: { product: Product; quantity: number }) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const categories = ['All', 'Ghee', 'Fruit Crushes', 'Baking Supplies', 'Other'];
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className={styles.shop}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Our Products</h1>
          <p>Discover our wide range of premium dairy and bakery supplies</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.filters}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${filter === category ? styles.active : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.loading}>Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className={styles.empty}>
            <h3>No products found</h3>
            <p>Check back later for new arrivals!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>

      {notification && (
        <div className={styles.notification}>
          {notification}
        </div>
      )}
    </div>
  );
}

