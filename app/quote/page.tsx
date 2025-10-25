'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CartItem } from '@/types';
import styles from './quote.module.css';

export default function QuotePage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    message: '',
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    // Format WhatsApp message
    let message = `*New Quote Request from B4-Baking Website*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Business: ${formData.businessName || 'N/A'}\n\n`;
    message += `*Order Details:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.product.price} each\n`;
      message += `   Subtotal: ₹${(item.product.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `*Total Amount: ₹${calculateTotal().toFixed(2)}*\n\n`;
    
    if (formData.message) {
      message += `*Additional Message:*\n${formData.message}`;
    }

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Clear cart
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Redirect to shop
    setTimeout(() => {
      router.push('/shop');
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyContent}>
          <h2>Your Cart is Empty</h2>
          <p>Add some products to your cart to request a quote</p>
          <button onClick={() => router.push('/shop')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quote}>
      <div className={styles.hero}>
        <h1>Request a Quote</h1>
        <p>Review your order and send us a quote request via WhatsApp</p>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.cartSection}>
            <h2>Your Cart</h2>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.product.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.product.name}</h3>
                    <p className={styles.itemPrice}>₹{item.product.price} each</p>
                  </div>
                  <div className={styles.itemQuantity}>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <div className={styles.itemTotal}>
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeItem(item.product.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.cartTotal}>
              <span>Total:</span>
              <span className={styles.totalAmount}>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Your Details</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Additional Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any special requirements or questions..."
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send Quote Request via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

