import React, { useState, useEffect, useCallback, useRef } from 'react';

const ImageCarousel = ({ images, puppyName, fallbackImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);
  
  // Nettoie les images
  const validImages = images?.filter(img => img && img.trim() !== '') || [];
  const imageList = validImages.length > 0 ? validImages : [fallbackImage];
  
  // Navigation
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  }, [imageList.length]);
  
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length);
  }, [imageList.length]);
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  
  // Auto-slide
  useEffect(() => {
    if (isAutoPlaying && imageList.length > 1) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, goToNext, imageList.length]);
  
  // Pause auto-slide au survol
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  // Swipe tactile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0);
      setTouchEnd(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  
  // Si une seule image
  if (imageList.length === 1) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
        <img 
          src={imageList[0]} 
          alt={puppyName} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  return (
    <div 
      className="relative w-full h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* === PHOTO PRINCIPALE (grande) === */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img 
            src={imageList[currentIndex]} 
            alt={`${puppyName} - Photo ${currentIndex + 1}`} 
            className="w-full h-full object-cover transition-all duration-500 ease-out"
          />
          
          {/* Overlay gradient pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          
          {/* Compteur */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
            <span className="text-white text-xs font-medium">
              {currentIndex + 1} / {imageList.length}
            </span>
          </div>
          
          {/* Indicateur auto-play */}
          {isAutoPlaying && (
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-[8px] uppercase tracking-wider font-bold">Auto</span>
              </div>
            </div>
          )}
          
          {/* Flèche gauche */}
          <button 
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 
                       backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10
                       hover:scale-110 transform active:scale-95 opacity-70 hover:opacity-100"
            aria-label="Previous photo"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Flèche droite */}
          <button 
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 
                       backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10
                       hover:scale-110 transform active:scale-95 opacity-70 hover:opacity-100"
            aria-label="Next photo"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* === MINIATURES (décalées/en retrait) === */}
      {imageList.length > 1 && (
        <div className="relative mt-4 pb-4 px-4">
          {/* Ligne décorative au-dessus des miniatures */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
          
          {/* Container des miniatures avec décalage visuel */}
          <div className="relative -mt-2">
            <div className="flex justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide py-3 px-2">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`relative flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden
                    ${currentIndex === idx 
                      ? 'ring-2 ring-brand-gold ring-offset-2 scale-105 shadow-xl' 
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  style={{ width: '70px', height: '70px' }}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay sur l'image active */}
                  {currentIndex === idx && (
                    <div className="absolute inset-0 bg-brand-gold/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Indicateur de swipe pour mobile */}
          <div className="md:hidden text-center mt-2">
            <span className="text-[8px] text-gray-400 uppercase tracking-wider">
              ← Swipe photos →
            </span>
          </div>
        </div>
      )}
      
      {/* Style CSS pour cacher la scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;