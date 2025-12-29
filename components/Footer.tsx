import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLegalClick = (type: string) => {
    alert(`The Jive Cold Drinks ${type} will be available for viewing soon. Thank you for your patience!`);
  };

  return (
    <footer id="contact" className="bg-slate-950 border-t border-white/5 pt-16 sm:pt-20 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 sm:mb-16">
          
          {/* Brand */}
          <div className="text-center sm:text-left">
            <button onClick={scrollToTop} className="text-2xl font-black text-white tracking-tight mb-4 sm:mb-6 block group outline-none">
              Jive<span className="text-amber-500 group-hover:animate-pulse">.</span>
            </button>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium mx-auto sm:mx-0 max-w-xs">
              Refreshing Bangalore since 1998. We are committed to serving the best quality beverages in a hygienic environment.
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/5 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-black mb-4 sm:mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-3 font-bold">
              {[
                { name: 'Home', action: scrollToTop },
                { name: 'About Us', href: '#about' },
                { name: 'Menu', href: '#menu' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Visit Us', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  {link.action ? (
                    <button onClick={link.action} className="text-slate-400 hover:text-amber-500 text-sm transition-all hover:translate-x-1 inline-block outline-none">
                      {link.name}
                    </button>
                  ) : (
                    <a href={link.href} className="text-slate-400 hover:text-amber-500 text-sm transition-all hover:translate-x-1 inline-block">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Out */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-black mb-4 sm:mb-6 uppercase tracking-widest text-xs">Reach Out</h4>
            <ul className="space-y-4 font-semibold inline-block text-left w-full">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jive+Cold+Drinks+Indiranagar+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-400 text-sm hover:text-amber-500 transition-colors"
                >
                  <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>12, 100 Feet Rd, Indiranagar,<br />Bengaluru, Karnataka 560038</span>
                </a>
              </li>
              <li>
                <a href="tel:+919886012345" className="flex items-center gap-3 text-slate-400 text-sm hover:text-amber-500 transition-colors">
                  <Phone size={18} className="text-amber-500 shrink-0" />
                  <span>+91 98860 12345</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@jivedrinks.com" className="flex items-center gap-3 text-slate-400 text-sm hover:text-amber-500 transition-colors">
                  <Mail size={18} className="text-amber-500 shrink-0" />
                  <span>hello@jivedrinks.com</span>
                </a>
              </li>
            </ul>

            {/* Designed by Onyx – moved here */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <a
                href="https://onyx-77118.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold tracking-wide text-slate-400 hover:text-amber-500 transition-colors"
              >
                Website Designed by{' '}
                <span className="text-amber-500">Onyx</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-black mb-4 sm:mb-6 uppercase tracking-widest text-xs">Opening Hours</h4>
            <ul className="space-y-4 font-semibold inline-block text-left">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Clock size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-tight">Mon - Sat</p>
                  <p className="font-medium">10:00 AM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Clock size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-tight">Sunday</p>
                  <p className="font-medium">11:00 AM - 11:30 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] sm:text-xs text-center md:text-left font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Jive Cold Drinks. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest">
            <button onClick={() => handleLegalClick('Privacy Policy')} className="hover:text-amber-500 transition-colors">
              Privacy
            </button>
            <button onClick={() => handleLegalClick('Terms of Service')} className="hover:text-amber-500 transition-colors">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
