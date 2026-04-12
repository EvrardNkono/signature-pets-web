import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const phoneNumber = "+1 (337) 567-1208";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const signatureBreeds = [
    "Golden Retriever", "German Shepherd", "French Bulldog", 
    "Siberian Husky", "Samoyed", "Dachshund", "Shiba Inu"
  ];

  const getBreedPath = (name) => `/breed/${name.toLowerCase().replace(/\s+/g, '-')}`;

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      isScrolled || isMenuOpen ? 'py-4 bg-brand-dark shadow-2xl' : 'py-6 bg-brand-dark/40 border-b border-white/10 backdrop-blur-[2px]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-[110]" onClick={() => setIsMenuOpen(false)}>
          <div className="h-12 w-12 bg-brand-dark border border-brand-gold/30 p-1 rounded-sm">
            <img src="/images/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-serif font-bold tracking-tighter text-white leading-none">
              SIGNATURE<span className="text-brand-gold">PETS</span>
            </h1>
            <span className="text-[7px] uppercase tracking-[0.4em] text-brand-gold font-bold">Elite Canine Companions</span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/puppies" className="text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:text-brand-gold transition-colors">Available Puppies</Link>

          {/* ACCORDÉON RACES */}
          <div className="relative" onMouseEnter={() => setOpenAccordion('breeds')} onMouseLeave={() => setOpenAccordion(null)}>
            <button className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.3em] font-bold outline-none">
              The Breeds <span className={`transition-transform ${openAccordion === 'breeds' ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div className={`absolute top-full left-0 mt-4 w-56 bg-brand-dark border border-brand-gold/20 transition-all duration-300 ${openAccordion === 'breeds' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              {signatureBreeds.map(breed => (
                <Link key={breed} to={getBreedPath(breed)} className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark font-bold transition-colors">{breed}</Link>
              ))}
            </div>
          </div>

          {/* ACCORDÉON HEALTH */}
          <div className="relative" onMouseEnter={() => setOpenAccordion('health')} onMouseLeave={() => setOpenAccordion(null)}>
            <button className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.3em] font-bold outline-none">
              Care & Health <span className={`transition-transform ${openAccordion === 'health' ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div className={`absolute top-full left-0 mt-4 w-56 bg-brand-dark border border-brand-gold/20 transition-all duration-300 ${openAccordion === 'health' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link to="/health" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark font-bold">Health Wellness</Link>
              <Link to="/akc-benefits" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark font-bold border-t border-white/5">AKC Benefits</Link>
            </div>
          </div>

          {/* ACCORDÉON STORY */}
          <div className="relative" onMouseEnter={() => setOpenAccordion('story')} onMouseLeave={() => setOpenAccordion(null)}>
            <button className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.3em] font-bold outline-none">
              Our Legacy <span className={`transition-transform ${openAccordion === 'story' ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div className={`absolute top-full left-0 mt-4 w-56 bg-brand-dark border border-brand-gold/20 transition-all duration-300 ${openAccordion === 'story' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link to="/about" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark font-bold">About Us</Link>
              <Link to="/our-story" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark font-bold border-t border-white/5">The History</Link>
            </div>
          </div>

          {/* BOUTON CONTACT DIRECT (Le Numéro) */}
          <Link 
            to="/contact" 
            className="group flex items-center gap-3 pl-6 pr-8 py-3 bg-brand-gold text-brand-dark hover:bg-white transition-all duration-500 rounded-sm"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-brand-dark/10 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-3 h-3 fill-brand-dark" viewBox="0 0 24 24">
                <path d="M21.386 15.085c-1.487-1.487-3.048-1.508-4.537-.019l-1.391 1.391c-.461.461-.913.434-1.547.054-.925-.554-1.841-1.222-2.731-2.012-.891-.79-1.637-1.619-2.233-2.483-.4-.582-.475-1.077-.014-1.538l1.391-1.391c1.488-1.488 1.468-3.05-.019-4.537l-2.731-2.731c-1.487-1.487-3.048-1.508-4.537-.019l-1.391 1.391c-.815.815-1.155 1.838-1.021 3.063.134 1.226.702 2.502 1.701 3.829 2.016 2.677 4.608 5.228 7.766 7.643 3.159 2.415 6.273 3.992 9.341 4.73 1.321.318 2.559-.033 3.714-.852l1.391-1.391c1.489-1.489 1.469-3.051-.018-4.538l-2.731-2.731z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[7px] uppercase tracking-[0.2em] font-black opacity-60">Inquire Now</span>
              <span className="text-[10px] uppercase tracking-widest font-black leading-tight">{phoneNumber}</span>
            </div>
          </Link>
        </nav>

        {/* Hamburger Mobile */}
        <button className="lg:hidden z-[110] text-brand-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-[1px] bg-brand-gold transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-[1px] bg-brand-gold transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-[1px] bg-brand-gold transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-brand-dark transition-all duration-500 z-[105] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 invisible'}`}>
          <div className="flex flex-col pt-32 px-10 gap-8 h-full overflow-y-auto pb-20">
            
            <Link to="/puppies" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">Available Puppies</Link>

            {/* Accordéon Races (Mobile) */}
            <div className="flex flex-col">
              <button onClick={() => toggleAccordion('breeds')} className="flex justify-between items-center text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">
                The Breeds <span className={`text-brand-gold transition-transform duration-300 ${openAccordion === 'breeds' ? 'rotate-180' : ''}`}>▾</span>
              </button>
              <div className={`grid transition-all duration-500 ease-in-out ${openAccordion === 'breeds' ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-brand-gold/20">
                  {signatureBreeds.map(breed => (
                    <Link key={breed} to={getBreedPath(breed)} onClick={() => setIsMenuOpen(false)} className="text-white/60 text-xs uppercase tracking-widest">{breed}</Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Accordéon Health (Mobile) */}
            <div className="flex flex-col">
              <button onClick={() => toggleAccordion('health')} className="flex justify-between items-center text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">
                Care & Health <span className={`text-brand-gold transition-transform duration-300 ${openAccordion === 'health' ? 'rotate-180' : ''}`}>▾</span>
              </button>
              <div className={`grid transition-all duration-500 ease-in-out ${openAccordion === 'health' ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden flex flex-col gap-6 pl-4 border-l border-brand-gold/20">
                  <Link to="/health" onClick={() => setIsMenuOpen(false)} className="text-white/60 text-xs uppercase tracking-widest">Health Wellness</Link>
                  <Link to="/akc-benefits" onClick={() => setIsMenuOpen(false)} className="text-white/60 text-xs uppercase tracking-widest">AKC Benefits</Link>
                </div>
              </div>
            </div>

            {/* Accordéon Story (Mobile) */}
            <div className="flex flex-col">
              <button onClick={() => toggleAccordion('story')} className="flex justify-between items-center text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">
                Our Legacy <span className={`text-brand-gold transition-transform duration-300 ${openAccordion === 'story' ? 'rotate-180' : ''}`}>▾</span>
              </button>
              <div className={`grid transition-all duration-500 ease-in-out ${openAccordion === 'story' ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden flex flex-col gap-6 pl-4 border-l border-brand-gold/20">
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-white/60 text-xs uppercase tracking-widest">About Us</Link>
                  <Link to="/our-story" onClick={() => setIsMenuOpen(false)} className="text-white/60 text-xs uppercase tracking-widest">The History</Link>
                </div>
              </div>
            </div>

            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="mt-8 py-5 bg-brand-gold text-brand-dark text-center text-xs uppercase font-bold tracking-[0.3em] shrink-0 shadow-lg">
              Contact Concierge: {phoneNumber}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;