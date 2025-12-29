import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Loader2, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ravi Kumar",
    role: "Local Guide",
    content: "The Royal Falooda is simply unbeatable. I've tried many places across Karnataka, but the balance of sweetness and texture here is perfection. Truly the pride of Bangalore!",
    rating: 5,
    avatar: " https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Priya S.",
    role: "College Student",
    content: "Best place in town for a quick refreshment. Their Mango Delight is a lifesaver during the summers. The staff is always friendly and the service is incredibly fast.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1725033489648-a819750348eb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Arjun V.",
    role: "Business Owner",
    content: "Been coming here for over 10 years. The quality has remained remarkably consistent. It's my go-to spot for treating clients to something refreshing and local.",
    rating: 5,
    avatar: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Parent",
    content: "The hygiene levels are impressive and the atmosphere is very welcoming. My kids absolutely love their chocolate shakes. Jive is a family tradition for us now.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1591980896142-4e36328411ec?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Testimonials: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  // Form State
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsPreparing(true);
    setTimeout(() => {
      setIsPreparing(false);
    }, 1200);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setIsPreparing(false);
    setIsSuccess(false);
    setRating(0);
    setName('');
    setExperience('');
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !experience.trim() || rating === 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 3000);
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-amber-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Community Voice" 
          subtitle="TESTIMONIALS" 
          center 
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-slate-900/60 backdrop-blur-md p-10 rounded-[2rem] border border-white/5 hover:border-amber-500/20 transition-all duration-500 group shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="mb-8 flex justify-between items-center">
                  <div className="flex gap-1.5 text-amber-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={32} className="text-amber-500/10 group-hover:text-amber-500/20 transition-colors" />
                </div>

                <p className="text-slate-300 mb-10 italic leading-relaxed text-sm font-medium">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="relative">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-800 group-hover:border-amber-500/50 transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-slate-950">
                    <CheckCircle2 size={10} strokeWidth={4} />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-black text-sm tracking-tight">{testimonial.name}</h4>
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-slate-400 text-sm font-bold tracking-wide uppercase opacity-50">Have something to say?</p>
          <Button 
            ref={triggerRef}
            variant="outline" 
            onClick={handleOpenModal} 
            className="font-black px-12 py-4"
            aria-haspopup="dialog"
          >
            Leave a Review
          </Button>
        </motion.div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-modal-title"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-4xl overflow-hidden"
            >
              {!isSuccess && !isPreparing && (
                <button 
                  onClick={closeModal}
                  className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors z-10 p-2 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none rounded-full"
                  aria-label="Close review modal"
                >
                  <X size={24} />
                </button>
              )}

              <div className="p-10 md:p-14 flex flex-col items-center">
                {isPreparing ? (
                  <div className="min-h-[400px] flex flex-col items-center justify-center space-y-6">
                    <Loader2 size={64} className="text-amber-500 animate-spin" />
                    <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Opening Portal...</p>
                  </div>
                ) : isSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="min-h-[400px] flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 size={56} />
                    </div>
                    <h3 className="text-4xl text-white font-black mb-4 tracking-tighter">Cheers!</h3>
                    <p className="text-slate-400 font-medium text-lg">Your review has been sent to our team.<br/>Expect to see it live soon.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    <h3 id="review-modal-title" className="text-4xl text-white mb-2 font-black tracking-tighter">Write a Review</h3>
                    <p className="text-slate-500 text-sm mb-10 font-bold uppercase tracking-widest">Share the refreshment</p>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">How many stars?</label>
                        <div className="flex gap-3" role="radiogroup" aria-label="Select rating stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => setRating(star)}
                              className="text-amber-500 transition-all hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
                              aria-label={`Rate ${star} stars`}
                              role="radio"
                              aria-checked={rating === star}
                            >
                              <Star 
                                size={32} 
                                fill={star <= (hoveredRating || rating) ? "currentColor" : "none"} 
                                className={star <= (hoveredRating || rating) ? "drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]" : "text-slate-800"}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="user-name" className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">Your Name</label>
                        <input 
                          id="user-name"
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all font-bold"
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="user-experience" className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">The Experience</label>
                        <textarea 
                          id="user-experience"
                          required
                          rows={4}
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          placeholder="What did you love most?"
                          className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all resize-none font-medium"
                        />
                      </div>

                      <Button 
                        disabled={isSubmitting || rating === 0 || !name.trim() || !experience.trim()}
                        className="w-full justify-center py-5 text-lg font-black"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <Loader2 size={24} className="animate-spin" />
                        ) : (
                          <>Publish Review <Send size={20} /></>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;