import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import Button from './ui/Button';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, updateQuantity, removeFromCart, clearCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeOverlays = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOverlays();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOverlays]);

  const navLinks = [
    { name: 'Home', href: '#', isHome: true },
    { name: 'About Us', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.priceValue * item.quantity), 0);

  const handleLinkClick = (e: React.MouseEvent, isHome?: boolean) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setIsCartOpen(false);
        clearCart();
      }, 2500);
    }, 2000);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-950/80 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={(e) => handleLinkClick(e, true)} 
            className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            aria-label="Jive Cold Drinks Home"
          >
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 font-bold text-xl group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              J
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Jive<span className="text-amber-500">.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.isHome)}
                className="text-slate-300 hover:text-amber-500 transition-colors font-semibold text-sm tracking-wide uppercase focus-visible:text-amber-500 outline-none"
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={openCart}
              className="relative p-2 text-slate-300 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full ml-4"
              aria-label={`Open shopping cart, ${cartCount} items`}
              aria-expanded={isCartOpen}
            >
              <ShoppingBag size={24} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={openCart}
              className="relative p-2 text-slate-300 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full"
              aria-label={`Open shopping cart, ${cartCount} items`}
              aria-expanded={isCartOpen}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.isHome)}
                    className="text-slate-300 hover:text-amber-500 text-lg font-bold py-2 border-b border-white/5 last:border-0 outline-none"
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="w-full justify-center mt-4" onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}>
                  View Shopping Cart
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isCheckingOut && setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 shadow-2xl z-[70] border-l border-white/5 flex flex-col"
              role="dialog"
              aria-label="Shopping cart"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Your Order</h3>
                <button 
                  onClick={() => !isCheckingOut && setIsCartOpen(false)} 
                  className="text-slate-400 hover:text-white transition-colors p-2 focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full outline-none" 
                  aria-label="Close cart"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-6 animate-pulse">
                      <ShoppingBag size={40} />
                    </div>
                    <p className="text-white text-lg font-bold">Your cart is empty</p>
                    <p className="text-slate-500 text-sm mt-2 mb-8">Ready to taste the best badam milk in Bangalore?</p>
                    <Button variant="outline" onClick={() => { setIsCartOpen(false); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      Browse Menu
                    </Button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 group p-4 bg-slate-800/20 rounded-2xl border border-white/5"
                    >
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-xl object-cover shadow-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-bold text-base leading-tight">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-slate-600 hover:text-red-500 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg outline-none" 
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-amber-500 font-black text-sm mt-1">₹{item.priceValue * item.quantity}</p>
                        <div className="flex items-center gap-3 mt-4">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white font-black text-sm w-4 text-center" aria-live="polite">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 outline-none"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-slate-950/50 backdrop-blur-md border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Estimated Total</span>
                    <span className="text-white font-black text-2xl tracking-tighter">₹{totalPrice}</span>
                  </div>
                  <Button 
                    disabled={isCheckingOut || checkoutSuccess}
                    onClick={handleCheckout}
                    className="w-full justify-center py-5 font-black text-lg relative"
                    aria-label={isCheckingOut ? "Processing checkout" : checkoutSuccess ? "Order successfully placed" : "Confirm and Checkout"}
                  >
                    {isCheckingOut ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full"
                      />
                    ) : checkoutSuccess ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={20} /> Order Placed
                      </div>
                    ) : (
                      "Confirm & Checkout"
                    )}
                  </Button>
                  <p className="text-center text-slate-600 text-[10px] uppercase font-bold tracking-widest">
                    Standard delivery rates may apply
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;