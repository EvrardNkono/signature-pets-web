import React, { useState, useEffect } from 'react';

const PuppyCard = ({ puppy }) => {
  const [isOpen, setIsOpen] = useState(false);

  // --- GESTION DU SCROLL ---
  // Bloque le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Sécurité pour l'image
  const mainImage = puppy.images && puppy.images.length > 0 
    ? puppy.images[0] 
    : 'https://via.placeholder.com/600x800?text=Signature+Pets';

  // Configuration WhatsApp
  const phoneNumber = "13375671208";
  
  // Sécurité prix
  const displayPrice = puppy.price ? puppy.price.toLocaleString() : "Contact Us";
  
  const message = `Hello Signature Pets, I am interested in ${puppy.name}, the ${puppy.gender} ${puppy.breed} priced at $${displayPrice}. Is this puppy still available?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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

      {/* --- MODAL DE PRESTIGE --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Overlay avec effet flou */}
          <div 
            className="absolute inset-0 bg-[#1a1008]/95 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl animate-in zoom-in-95 duration-500">
            
            {/* Bouton de fermeture flottant */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 text-[#1a1008] hover:rotate-90 hover:text-[#D4AF37] transition-all duration-300 bg-white/80 p-2 rounded-full shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Partie Gauche : Image de Prestige */}
            <div className="relative h-[400px] md:h-full bg-[#1a1008]">
              <img 
                src={mainImage} 
                alt={puppy.name} 
                className="w-full h-full object-cover opacity-90"
              />
              {/* Cadre décoratif interne */}
              <div className="absolute inset-0 border-[15px] border-white/10 m-4 pointer-events-none"></div>
            </div>

            {/* Partie Droite : Contenu Signature */}
            <div className="p-8 md:p-16 flex flex-col justify-center bg-[#FAF9F6]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#D4AF37] tracking-[0.4em] uppercase text-[10px] font-bold">Signature Selection</span>
                <div className="h-[1px] flex-1 bg-[#D4AF37]/20"></div>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif text-[#1a1008] italic mb-2">
                {puppy.name}
              </h2>
              <p className="text-[#D4AF37] tracking-[0.2em] text-xs font-bold mb-8 uppercase">{puppy.breed}</p>

              <div className="grid grid-cols-2 gap-8 mb-10 border-y border-[#D4AF37]/10 py-8">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Gender</span>
                  <span className="text-lg font-serif italic text-[#1a1008]">{puppy.gender}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Age</span>
                  <span className="text-lg font-serif italic text-[#1a1008]">{puppy.age}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Color</span>
                  <span className="text-lg font-serif italic text-[#1a1008]">{puppy.color || 'Standard'}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Investment</span>
                  <span className="text-lg font-serif italic text-[#D4AF37]">${displayPrice}</span>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <p className="text-gray-500 font-light leading-relaxed italic text-sm">
                  {puppy.description || `This exceptional ${puppy.breed} companion has undergone our "Signature Socialization" program.`}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1a1008] text-white text-[10px] uppercase tracking-[0.4em] font-bold py-5 text-center hover:bg-[#D4AF37] hover:text-[#1a1008] transition-all duration-500 shadow-xl"
                >
                  Apply for Adoption
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PuppyCard;