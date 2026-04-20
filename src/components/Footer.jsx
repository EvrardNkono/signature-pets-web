import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // WhatsApp number formatted for the link
  const whatsappNumber = "13375671208"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-brand-gold/10 relative overflow-hidden">
      {/* Light background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30' stroke='%23d4af37' stroke-width='1'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* 1. Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 border border-brand-gold/30 p-1 bg-brand-dark">
                <img src="/images/logo.png" alt="Signature Pets" className="h-full w-full object-contain" />
              </div>
              <h2 className="text-xl font-serif tracking-tighter">
                SIGNATURE<span className="text-brand-gold">PETS</span>
              </h2>
            </Link>
            <p className="text-white/40 text-xs leading-relaxed tracking-wide uppercase font-light">
              Excellence in canine companionship. Dedicated breeders of exceptional pedigree companions.
            </p>
            <div className="flex gap-4">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 border border-brand-gold/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 group"
                title="Contact us on WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.52s.149.088.407.243c1.577.95 3.401 1.453 5.261 1.454 5.482 0 9.944-4.461 9.947-9.945.002-2.657-1.032-5.155-2.914-7.039-1.882-1.884-4.38-2.92-7.037-2.922-5.485 0-9.946 4.462-9.948 9.946-.001 1.914.536 3.784 1.554 5.439l-.1.173-1.012 3.701 3.782-.992z"/>
                </svg>
              </a>
              {['instagram', 'pinterest'].map((social) => (
                <a key={social} href={`#${social}`} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-gold transition-colors duration-500">
                  <div className="w-1 h-1 bg-brand-gold"></div>
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation */}
          <div className="space-y-6">
            <h4 className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/puppies" className="text-white/60 text-[10px] uppercase tracking-widest hover:text-brand-gold transition-colors">Available breeds</Link></li>
              <li><Link to="/breed" className="text-white/60 text-[10px] uppercase tracking-widest hover:text-brand-gold transition-colors">Breed Standard</Link></li>
              <li><Link to="/our-story" className="text-white/60 text-[10px] uppercase tracking-widest hover:text-brand-gold transition-colors">Our Heritage</Link></li>
            </ul>
          </div>

          {/* 3. Concierge */}
          <div className="space-y-6">
            <h4 className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold">Concierge</h4>
            <ul className="space-y-4 text-white/60 text-[10px] uppercase tracking-widest">
              <li>Location: Louisiana, United States</li>
              <li>Email: contact@signature-pets.com</li>
              <li className="text-brand-gold font-bold">+1 (337) 567-1208</li>
            </ul>
          </div>

          {/* 4. Direct WhatsApp Action */}
          <div className="space-y-6">
            <h4 className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold">Inquiry</h4>
            <p className="text-white/40 text-[10px] uppercase tracking-widest leading-loose">
              Ready to welcome a new member to your family? Chat with our experts.
            </p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full border border-brand-gold/30 px-6 py-4 hover:bg-brand-gold transition-all duration-500"
            >
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.3em] group-hover:text-brand-dark transition-colors">
                CONTACT OUR TEAM
              </span>
              <svg className="w-4 h-4 text-brand-gold group-hover:text-brand-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] uppercase tracking-[0.5em] text-white/20">
          <span>© 2026 Signature Pets. All Rights Reserved.</span>
          <div className="flex gap-8">
            <Link to="/legal" className="hover:text-brand-gold transition-colors">Legal Mentions</Link>
            <Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;