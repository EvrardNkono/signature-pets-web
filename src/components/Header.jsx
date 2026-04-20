import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- CONFIGURATION DE L'API ---
const getBaseUrl = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1'
    : 'https://backpets.vercel.app/api/v1';
};

const API_BREEDS = `${getBaseUrl()}/breeds`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  
  const [signatureBreeds, setSignatureBreeds] = useState([]);
  const phoneNumber = "+1 (337) 567-1208";

  // --- RÉCUPÉRATION DES RACES ---
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(API_BREEDS);
        if (response.data.success) {
          setSignatureBreeds(response.data.data);
        }
      } catch (error) {
        console.error("Erreur navigation breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const getBreedPath = (name) => `/breed/${name.toLowerCase().replace(/\s+/g, '-')}`;

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      isScrolled || isMenuOpen ? 'py-4 bg-[#1a1008] shadow-2xl' : 'py-6 bg-[#1a1008]/40 border-b border-white/10 backdrop-blur-[2px]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-[110]" onClick={() => setIsMenuOpen(false)}>
          <div className="h-12 w-12 bg-[#1a1008] border border-[#D4AF37]/30 p-1 rounded-sm">
            <img src="/images/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-serif font-bold tracking-tighter text-white leading-none">
              SIGNATURE<span className="text-[#D4AF37]">PETS</span>
            </h1>
            <span className="text-[7px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">Elite Canine Companions</span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/puppies" className="text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#D4AF37] transition-colors">Breeds Available</Link>

          {/* ACCORDÉON RACES (DYNAMIQUE) */}
          <div className="relative" onMouseEnter={() => setOpenAccordion('breeds')} onMouseLeave={() => setOpenAccordion(null)}>
            <button className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.3em] font-bold outline-none">
              Breeds <span className={`transition-transform duration-300 ${openAccordion === 'breeds' ? 'rotate-180 text-[#D4AF37]' : ''}`}>▾</span>
            </button>
            <div className={`absolute top-full left-0 mt-4 w-56 bg-[#1a1008] border border-[#D4AF37]/20 shadow-2xl transition-all duration-300 ${openAccordion === 'breeds' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              {signatureBreeds.length > 0 ? (
                signatureBreeds.map(breed => (
                  <Link 
                    key={breed._id} 
                    to={getBreedPath(breed.title)} 
                    className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#1a1008] font-bold transition-colors border-b border-white/5 last:border-0"
                  >
                    {breed.title}
                  </Link>
                ))
              ) : (
                <span className="block px-6 py-3 text-[8px] text-white/40 italic uppercase">Loading breeds...</span>
              )}
            </div>
          </div>

          {/* ACCORDÉON HEALTH */}
          <div className="relative" onMouseEnter={() => setOpenAccordion('health')} onMouseLeave={() => setOpenAccordion(null)}>
            <button className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.3em] font-bold outline-none">
              Care & Health <span className={`transition-transform duration-300 ${openAccordion === 'health' ? 'rotate-180 text-[#D4AF37]' : ''}`}>▾</span>
            </button>
            <div className={`absolute top-full left-0 mt-4 w-56 bg-[#1a1008] border border-[#D4AF37]/20 shadow-2xl transition-all duration-300 ${openAccordion === 'health' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link to="/health" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#1a1008] font-bold">Health Wellness</Link>
              <Link to="/akc-benefits" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#1a1008] font-bold border-t border-white/5">AKC Benefits</Link>
            </div>
          </div>

          {/* ACCORDÉON STORY */}
          <div className="relative" onMouseEnter={() => setOpenAccordion('story')} onMouseLeave={() => setOpenAccordion(null)}>
            <button className="flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.3em] font-bold outline-none">
              Our Legacy <span className={`transition-transform duration-300 ${openAccordion === 'story' ? 'rotate-180 text-[#D4AF37]' : ''}`}>▾</span>
            </button>
            <div className={`absolute top-full left-0 mt-4 w-56 bg-[#1a1008] border border-[#D4AF37]/20 shadow-2xl transition-all duration-300 ${openAccordion === 'story' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <Link to="/about" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#1a1008] font-bold">About Us</Link>
              <Link to="/our-story" className="block px-6 py-3 text-[9px] text-white/80 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#1a1008] font-bold border-t border-white/5">The History</Link>
            </div>
          </div>

          {/* BOUTON CONTACT DIRECT */}
          <Link 
            to="/contact" 
            className="group flex items-center gap-3 pl-6 pr-8 py-3 bg-[#D4AF37] text-[#1a1008] hover:bg-white transition-all duration-500 rounded-sm"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-[#1a1008]/10 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-3 h-3 fill-[#1a1008]" viewBox="0 0 24 24">
                <path d="M21.386 15.085c-1.487-1.487-3.048-1.508-4.537-.019l-1.391 1.391c-.461.461-.913.434-1.547.054-.925-.554-1.841-1.222-2.731-2.012-.891-.79-1.637-1.619-2.233-2.483-.4-.582-.475-1.077-.014-1.538l1.391-1.391c1.488-1.488 1.468-3.05-.019-4.537l-2.731-2.731c-1.487-1.487-3.048-1.508-4.537-.019l-1.391 1.391c-.815.815-1.155 1.838-1.021 3.063.134 1.226.702 2.502 1.701 3.829 2.016 2.677 4.608 5.228 7.766 7.643 3.159 2.415 6.273 3.992 9.341 4.73 1.321.318 2.559-.033 3.714-.852l1.391-1.391c1.489-1.489 1.469-3.051-.018-4.538l-2.731-2.731z"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[7px] uppercase tracking-[0.2em] font-black opacity-60">Inquire Now</span>
              <span className="text-[10px] uppercase tracking-widest font-black leading-tight">{phoneNumber}</span>
            </div>
          </Link>
        </nav>

        {/* Hamburger Mobile */}
        <button className="lg:hidden z-[110] text-[#D4AF37]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-[1px] bg-[#D4AF37] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-[1px] bg-[#D4AF37] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-[1px] bg-[#D4AF37] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#1a1008] transition-all duration-500 z-[105] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 invisible'}`}>
          <div className="flex flex-col pt-32 px-10 gap-8 h-full overflow-y-auto pb-20">
            <Link to="/puppies" onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">Breeds Available</Link>
            {/* ... ton menu mobile reste identique ... */}
            <div className="flex flex-col">
              <button onClick={() => toggleAccordion('breeds')} className="flex justify-between items-center text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">
                Breeds <span className={`text-[#D4AF37] transition-transform duration-300 ${openAccordion === 'breeds' ? 'rotate-180' : ''}`}>▾</span>
              </button>
              <div className={`grid transition-all duration-500 ease-in-out ${openAccordion === 'breeds' ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-[#D4AF37]/20">
                  {signatureBreeds.map(breed => (
                    <Link key={breed._id} to={getBreedPath(breed.title)} onClick={() => setIsMenuOpen(false)} className="text-white/60 text-xs uppercase tracking-widest">{breed.title}</Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Health & Story Mobile */}
            <button onClick={() => toggleAccordion('health')} className="flex justify-between items-center text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">Care & Health <span className={`text-[#D4AF37] transition-transform duration-300 ${openAccordion === 'health' ? 'rotate-180' : ''}`}>▾</span></button>
            <button onClick={() => toggleAccordion('story')} className="flex justify-between items-center text-white text-2xl font-serif italic tracking-widest border-b border-white/5 pb-4">Our Legacy <span className={`text-[#D4AF37] transition-transform duration-300 ${openAccordion === 'story' ? 'rotate-180' : ''}`}>▾</span></button>
            
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="mt-8 py-5 bg-[#D4AF37] text-[#1a1008] text-center text-xs uppercase font-bold tracking-[0.3em] shrink-0 shadow-lg">Contact Concierge</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;