import React, { useState, useEffect } from 'react';
import ImageCarousel from './home/ImageCarousel';

const PuppyCard = ({ puppy, apiBaseUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- GESTION DU SCROLL ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // --- FONCTION POUR RÉCUPÉRER TOUTES LES IMAGES ---
  const getAllImages = () => {
    if (puppy.images && puppy.images.length > 0) {
      return puppy.images
        .filter(img => img && img.trim() !== '')
        .map(img => img.startsWith('http') ? img : `${apiBaseUrl}/${img}`);
    }
    if (puppy.image) {
      return [puppy.image.startsWith('http') ? puppy.image : `${apiBaseUrl}/${puppy.image}`];
    }
    return ['https://via.placeholder.com/600x800?text=Signature+Pets'];
  };

  // Sécurité pour l'image principale
  const mainImage = puppy.images && puppy.images.length > 0 
    ? (puppy.images[0].startsWith('http') ? puppy.images[0] : `${apiBaseUrl}/${puppy.images[0]}`)
    : 'https://via.placeholder.com/600x800?text=Signature+Pets';

  // Sécurité prix
  const displayPrice = puppy.price ? puppy.price.toLocaleString() : "Contact Us";

  // --- DÉCLENCHEUR DU LIVE CHAT ---
  const handleApplyForAdoption = () => {
    setIsOpen(false);
    const chatEvent = new CustomEvent('openSignatureChat', {
      detail: {
        mode: 'ADOPTION',
        puppyName: puppy.name,
        puppyImage: mainImage,
        message: `Hello, I am interested in ${puppy.name} (${puppy.breed}). Is this puppy still available?`
      }
    });
    window.dispatchEvent(chatEvent);
  };

  return (
    <>
      {/* --- CARTE PRINCIPALE (GRILLE) --- */}
      <div className="group bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={mainImage} 
            alt={puppy.name} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          {puppy.status !== 'Available' && (
            <div className="absolute top-4 right-4 bg-[#1a1008]/90 text-white text-[8px] uppercase tracking-[0.3em] px-3 py-1.5 z-10">
              {puppy.status}
            </div>
          )}
          {/* Indicateur de galerie */}
          {puppy.images && puppy.images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg z-10">
              <span className="text-white text-[8px] font-bold">📸 {puppy.images.length} photos</span>
            </div>
          )}
        </div>
        
        <div className="p-8 text-center">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mb-1">{puppy.breed}</p>
          <h4 className="text-2xl font-serif text-[#1a1008] italic mb-2">{puppy.name}</h4>
          <p className="text-[#1a1008]/60 font-bold tracking-[0.3em] text-xs mb-6">${displayPrice}</p>
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full py-4 bg-[#1a1008] text-white text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] hover:text-[#1a1008] transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>

      {/* --- MODAL AVEC CAROUSEL (COMME FEATUREDPUPPIES) --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#1a1008]/95 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Container principal avec scroll global sur mobile */}
          <div className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] md:max-h-[90vh]">
            <button 
              onClick={() => setIsOpen(false)} 
              className="sticky md:absolute top-4 right-4 z-30 text-[#1a1008] hover:text-[#D4AF37] text-2xl bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-lg ml-auto mr-4 mt-4 md:mt-0"
            >
              ✕
            </button>
            
            <div className="flex flex-col md:flex-row">
              {/* SECTION CAROUSEL - GAUCHE */}
              <div className="w-full md:w-1/2 bg-gray-100">
                <div className="h-[400px] md:h-[500px]">
                  <ImageCarousel 
                    images={getAllImages()}
                    puppyName={puppy.name}
                    fallbackImage="https://via.placeholder.com/600x800?text=Signature+Pets"
                  />
                </div>
              </div>
              
              {/* SECTION INFORMATIONS - DROITE */}
              <div className="w-full md:w-1/2 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#D4AF37] tracking-[0.4em] uppercase text-[10px] font-bold">Signature Selection</span>
                  <div className="h-[1px] flex-1 bg-[#D4AF37]/20"></div>
                </div>

                <h2 className="text-3xl md:text-4xl font-serif text-[#1a1008] italic mb-2">
                  {puppy.name}
                </h2>
                <p className="text-[#D4AF37] tracking-[0.2em] text-xs font-bold mb-4 uppercase">{puppy.breed}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 border-y border-[#D4AF37]/10 py-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Gender</span>
                    <span className="font-bold text-sm">{puppy.gender}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Age</span>
                    <span className="font-bold text-sm">{puppy.age}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Color</span>
                    <span className="font-bold text-sm">{puppy.color || 'Standard'}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Investment</span>
                    <span className="font-bold text-sm text-[#D4AF37]">${displayPrice}</span>
                  </div>
                </div>

                {/* Indicateur nombre de photos */}
                {getAllImages().length > 1 && (
                  <div className="mb-4 flex items-center gap-2 text-[8px] uppercase tracking-wider text-[#D4AF37] font-bold">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{getAllImages().length} photos in gallery</span>
                  </div>
                )}

                <p className="text-gray-500 font-light leading-relaxed mb-6 text-sm">
                  {puppy.description || `This exceptional ${puppy.breed} companion has undergone our "Signature Socialization" program.`}
                </p>

                {puppy.pedigree && (
                  <div className="bg-[#1a1008]/5 p-3 mb-6 rounded-lg">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-1">Pedigree</p>
                    <p className="text-xs text-[#1a1008]/70">{puppy.pedigree}</p>
                  </div>
                )}

                {/* BOUTON ADOPTION */}
                <button 
                  onClick={handleApplyForAdoption}
                  className="w-full bg-[#1a1008] text-white text-[10px] uppercase tracking-[0.4em] font-bold py-4 text-center hover:bg-[#D4AF37] hover:text-[#1a1008] transition-all duration-500 shadow-lg rounded-lg"
                >
                  Apply for Adoption
                </button>
                <p className="text-[7px] text-gray-400 text-center uppercase tracking-wider mt-2">
                  All adoptions include health guarantee & pedigree certificate
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PuppyCard;