import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrinkItem } from '../types';
import SectionHeading from './ui/SectionHeading';
import { Plus, Check } from 'lucide-react';

const MENU_ITEMS: DrinkItem[] = [
  {
    id: '0',
    name: 'Artisan Badam Milk',
    description: 'Slow-cooked milk infused with premium saffron, crushed almonds, and cardamom.',
    price: '₹95',
    priceValue: 95,
    category: 'Special',
    imageUrl: 'https://images.unsplash.com/photo-1616429266184-7455498d96db?q=80&w=1216&auto=format&fit=crop',
    popular: true,
  },
  {
    id: '1',
    name: 'Royal Falooda',
    description: 'Rose syrup, vermicelli, sweet basil seeds, milk, and vanilla ice cream.',
    price: '₹120',
    priceValue: 120,
    category: 'Special',
    imageUrl: 'https://images.unsplash.com/photo-1696487774083-44992ca48eb4?q=80&w=687&auto=format&fit=crop',
    popular: true,
  },
  {
    id: '7',
    name: 'Premium Pomegranate',
    description: '100% Cold-pressed pomegranate juice. Rich in antioxidants.',
    price: '₹140',
    priceValue: 140,
    category: 'Juice',
    imageUrl: 'https://images.unsplash.com/photo-1663955706695-de874fa93c4d?q=80&w=687&auto=format&fit=crop',
    popular: true,
  },
  {
    id: '2',
    name: 'Mango Delight',
    description: 'Fresh Alphonso mango pulp blended with cream and honey.',
    price: '₹90',
    priceValue: 90,
    category: 'Shake',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1695055513501-2573541f00cd?q=80&w=1170&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Dry Fruit Lassi',
    description: 'Creamy yogurt topped with cashews, raisins, and almonds.',
    price: '₹100',
    priceValue: 100,
    category: 'Special',
    imageUrl: 'https://images.unsplash.com/photo-1692620609860-be6717812f71?q=80&w=687&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Watermelon Splash',
    description: 'Fresh watermelon juice with black salt and mint.',
    price: '₹60',
    priceValue: 60,
    category: 'Juice',
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Cold Coffee',
    description: 'Dark brewed coffee with vanilla ice cream.',
    price: '₹80',
    priceValue: 80,
    category: 'Shake',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Strawberry Cocktail',
    description: 'Strawberry syrup with lime juice and chilled soda.',
    price: '₹70',
    priceValue: 70,
    category: 'Soda',
    imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=772&auto=format&fit=crop',
  },
];

const CATEGORIES = ['All', 'Special', 'Juice', 'Shake', 'Soda'];

interface MenuSectionProps {
  addToCart: (item: DrinkItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const filteredItems =
    activeCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: DrinkItem) => {
    addToCart(item);
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 2000);
  };

  return (
    <section id="menu" className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="The Curated Menu" subtitle="EXPLORE FLAVORS" />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => {
              const isAdded = addedItems.has(item.id);
              const isLoaded = loadedImages.has(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-900/40 rounded-[2rem] overflow-hidden border border-white/5"
                >
                  {/* IMAGE — FIXED PROPERLY */}
                  <div className="h-72 relative bg-slate-800">
                    <motion.img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      onLoad={() =>
                        setLoadedImages(prev => new Set(prev).add(item.id))
                      }
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isLoaded ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="w-full h-full object-cover"
                    />

                    {!isLoaded && (
                      <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                    )}

                    {item.popular && (
                      <div className="absolute top-6 left-6 bg-amber-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full">
                        Best Seller
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between mb-3">
                      <h3 className="text-2xl font-black text-white">
                        {item.name}
                      </h3>
                      <span className="text-amber-500 font-black">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm mb-8 line-clamp-2">
                      {item.description}
                    </p>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full py-4 rounded-2xl border-2 font-black uppercase tracking-widest transition ${
                        isAdded
                          ? 'bg-green-500/10 border-green-500/30 text-green-500'
                          : 'border-white/10 text-slate-300 hover:bg-amber-500 hover:text-slate-950'
                      }`}
                    >
                      {isAdded ? <Check size={18} /> : <Plus size={18} />}{' '}
                      {isAdded ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
