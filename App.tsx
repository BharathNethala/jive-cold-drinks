import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { DrinkItem, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (drink: DrinkItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === drink.id);
      if (existing) {
        return prev.map(item => 
          item.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...drink, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <Navbar 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      <main>
        <Hero />
        <Features />
        <AboutSection />
        <Testimonials />
        <MenuSection addToCart={addToCart} />
      </main>
      <Footer />
    </div>
  );
};

export default App;