import React, { useState } from 'react';

const PuppyCard = ({ puppy }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration WhatsApp
  const phoneNumber = "13375671208";
  const message = `Hello Signature Pets, I am interested in ${puppy.name}, the ${puppy.gender} (${puppy.age}) priced at $${puppy.price}. Is this puppy still available?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* --- CARTE PRINCIPALE (GRILLE) --- */}
      <div className="group bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={puppy.img} 
            alt={puppy.name} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          {puppy.status !== 'Available' && (
            <div className="absolute top-4 right-4 bg-brand-dark/90 text-white text-[8px] uppercase tracking-[0.3em] px-3 py-1.5 z-10">
              {puppy.status}
            </div>
          )}
        </div>
        
        <div className="p-8 text-center">
          <h4 className="text-2xl font-serif text-brand-dark italic mb-2">{puppy.name}</h4>
          <p className="text-brand-gold font-bold tracking-[0.3em] text-sm mb-6">${puppy.price}</p>
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full py-4 bg-brand-dark text-white text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>

      {/* --- MODAL DE PRESTIGE (S'ouvre au clic) --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Conteneur de la Carte Détails */}
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl animate-in zoom-in-95 duration-500">
            
            {/* Bouton Fermer */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 text-brand-dark hover:text-brand-gold transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Partie Gauche : Image de Prestige */}
            <div className="relative h-[400px] md:h-full bg-brand-dark">
              <img 
                src={puppy.img} 
                alt={puppy.name} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 border-[15px] border-white/10 m-4 pointer-events-none"></div>
            </div>

            {/* Partie Droite : Contenu Signature */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-brand-gold tracking-[0.4em] uppercase text-[10px] font-bold">Signature Selection</span>
                <div className="h-[1px] flex-1 bg-brand-gold/20"></div>
              </div>

              <h2 className="text-5xl md:text-6xl font-serif text-brand-dark italic mb-6">
                {puppy.name}
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-10 border-y border-gray-100 py-8">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Gender</span>
                  <span className="text-lg font-serif italic text-brand-dark">{puppy.gender}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Age</span>
                  <span className="text-lg font-serif italic text-brand-dark">{puppy.age}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Health Status</span>
                  <span className="text-lg font-serif italic text-brand-dark">Certified Clear</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Investment</span>
                  <span className="text-lg font-serif italic text-brand-gold">${puppy.price}</span>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <p className="text-gray-500 font-light leading-relaxed italic text-sm">
                  This exceptional companion has undergone our "Signature Socialization" program, 
                  including early neurological stimulation and exposure to premium environments.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-gold text-brand-dark text-[10px] uppercase tracking-[0.4em] font-bold py-5 text-center hover:bg-brand-dark hover:text-white transition-all duration-500 shadow-xl"
                >
                  Apply for Adoption
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[9px] uppercase tracking-[0.2em] text-gray-400 hover:text-brand-dark transition-colors font-bold"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PuppyCard;