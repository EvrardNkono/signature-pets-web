import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Empêcher le scroll du corps quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Correction des chemins pour correspondre à App.js
  const navLinks = [
    { name: 'Available Puppies', path: '/puppies' },
    { name: 'The Breed', path: '/breed' },
    { name: 'Our Story', path: '/our-story' }, // Corrigé ici
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        isScrolled || isMenuOpen
          ? 'py-4 bg-brand-dark shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'py-6 bg-brand-dark/40 border-b border-white/10 backdrop-blur-[2px]'
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* 1. Logo Section */}
        <Link to="/" className="flex items-center gap-3 z-[110]" onClick={() => setIsMenuOpen(false)}>
          <div className="h-12 w-12 md:h-14 md:w-14 bg-brand-dark border border-brand-gold/30 p-1 rounded-sm shadow-2xl">
              <img src="/images/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-white leading-none">
              SIGNATURE<span className="text-brand-gold">PETS</span>
            </h1>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-brand-gold font-bold mt-1">
              Elite Canine Companions
            </span>
          </div>
        </Link>

        {/* 2. Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.path}
              className="relative text-white text-[10px] uppercase tracking-[0.3em] font-bold group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}
          <Link 
            to="/Contact" 
            className="px-8 py-3 bg-brand-gold text-brand-dark text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all duration-500"
          >
            Inquire
          </Link>
        </nav>

        {/* 3. Bouton Hamburger */}
        <button 
          className="md:hidden z-[110] text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-[1px] bg-brand-gold transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-[1px] bg-brand-gold transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-[1px] bg-brand-gold transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* 4. Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-brand-dark transition-all duration-500 ease-in-out flex flex-col items-center justify-center z-[105] ${
            isMenuOpen 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-full opacity-0 invisible'
          }`}
        >
          <div className={`flex flex-col items-center gap-8 transition-all duration-700 delay-150 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl uppercase tracking-[0.4em] font-serif italic hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 px-12 py-4 bg-brand-gold text-brand-dark text-[10px] uppercase font-bold tracking-widest shadow-2xl"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;