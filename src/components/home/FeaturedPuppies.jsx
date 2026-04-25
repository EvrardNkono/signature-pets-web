import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedPuppies = () => {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPuppy, setSelectedPuppy] = useState(null);

  // --- CONFIGURATION DYNAMIQUE ---
  const isLocal = window.location.hostname === 'localhost';
  const API_BASE_URL = isLocal 
    ? 'http://localhost:5000' 
    : 'https://backpets.vercel.app';

  useEffect(() => {
    const fetchFeaturedPuppies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/v1/puppies`);
        if (response.data.success) {
          let allPuppies = response.data.data;
          const shuffled = allPuppies.sort(() => 0.5 - Math.random());
          const featured = shuffled.slice(0, 15);
          setPuppies(featured);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des chiots vedettes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedPuppies();
  }, [API_BASE_URL]);

  // --- LOGIQUE DU LIVE CHAT (ADOPTION) ---
  const handleInquiry = (puppy) => {
    // 1. Fermer la modal locale
    setSelectedPuppy(null);

    // 2. Déclencher le Live Chat
    const chatEvent = new CustomEvent('openSignatureChat', {
      detail: {
        mode: 'ADOPTION',
        puppyName: puppy.name,
        puppyImage: getImageUrl(puppy),
        message: `Hello Signature Pets! I am interested in ${puppy.name}, the ${puppy.breed} featured on your homepage. Is this companion still available?`
      }
    });

    window.dispatchEvent(chatEvent);
  };

  const getImageUrl = (puppy) => {
    let path = null;
    if (puppy.images && puppy.images.length > 0) {
      path = puppy.images[0];
    } else if (puppy.image) {
      path = puppy.image;
    }
    if (!path) return 'https://via.placeholder.com/600x800?text=Signature+Pets';
    return path.startsWith('http') ? path : `${API_BASE_URL}/${path}`;
  };

  if (loading) {
    return (
      <div className="py-24 text-center bg-white">
        <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Curating Selection...</p>
      </div>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-serif text-brand-dark mb-6 italic">
            Elite <span className="text-brand-terracotta not-italic">Featured</span> Puppies
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold mb-6"></div>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">
            Hand-selected companions from our latest litters
          </p>
        </div>
        <Link to="/puppies" className="text-brand-dark font-bold text-xs border-b border-brand-gold pb-2 tracking-[0.4em] hover:text-brand-terracotta transition-all duration-500 uppercase">
          Explore All Puppies
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
        {puppies.length > 0 ? (
          puppies.map((puppy) => (
            <div key={puppy._id} className="group relative flex flex-col cursor-pointer" onClick={() => setSelectedPuppy(puppy)}>
              <div className="relative mb-10">
                <div className="relative overflow-hidden aspect-[4/5] z-10 shadow-2xl">
                  <img 
                    src={getImageUrl(puppy)} 
                    alt={puppy.name} 
                    loading="lazy"
                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-20">
                      <div className="border border-white/30 p-4 backdrop-blur-[2px]">
                        <span className="text-white text-[8px] uppercase tracking-[0.6em] font-light">View Pedigree</span>
                      </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-brand-gold/20 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="absolute -top-4 right-6 z-30 shadow-xl">
                    <div className={`px-5 py-2 text-[8px] font-black uppercase tracking-[0.4em] 
                    ${puppy.status === 'Available' ? 'bg-brand-dark text-brand-gold border-b-2 border-brand-gold' : 
                      puppy.status === 'Reserved' ? 'bg-brand-terracotta text-white border-b-2 border-white/20' : 
                      'bg-gray-500 text-white'}`}>
                    {puppy.status}
                  </div>
                </div>
              </div>

              <div className="space-y-6 relative z-10 px-2">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-4xl font-serif text-brand-dark leading-none mb-1">{puppy.name}</h3>
                      <p className="text-brand-gold text-[9px] uppercase tracking-[0.4em] font-bold italic">{puppy.breed}</p>
                    </div>
                    <div className="text-right">
                       <span className="block text-brand-terracotta font-serif text-2xl tracking-tighter">
                         ${puppy.price ? puppy.price.toLocaleString() : "TBD"}
                       </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-brand-gold/10">
                    <div className="flex flex-col">
                        <span className="text-[7px] text-gray-400 uppercase tracking-widest">Gender</span>
                        <span className="text-[10px] text-brand-dark font-bold uppercase tracking-tighter">{puppy.gender}</span>
                    </div>
                    <div className="w-px h-6 bg-brand-gold/20"></div>
                    <div className="flex flex-col">
                        <span className="text-[7px] text-gray-400 uppercase tracking-widest">Age</span>
                        <span className="text-[10px] text-brand-dark font-bold uppercase tracking-tighter">{puppy.age}</span>
                    </div>
                  </div>
                </div>
                <button className="group/btn relative w-full h-14 bg-transparent border border-brand-dark overflow-hidden transition-all duration-500">
                  <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-dark group-hover/btn:text-white transition-colors duration-500">
                      Inquire Now
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 italic">No companions available at the moment.</p>
        )}
      </div>

      {/* --- MODAL --- */}
      {selectedPuppy && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={() => setSelectedPuppy(null)}></div>
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedPuppy(null)} className="absolute top-4 right-4 z-20 text-brand-dark hover:text-brand-gold text-2xl">✕</button>
            <div className="w-full md:w-1/2 h-[350px] md:h-auto">
              <img src={getImageUrl(selectedPuppy)} alt={selectedPuppy.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
              <span className="text-brand-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-2">Signature Choice</span>
              <h2 className="text-5xl font-serif text-brand-dark italic mb-6">{selectedPuppy.name}</h2>
              <div className="grid grid-cols-2 gap-6 mb-8 border-y border-gray-100 py-6 font-sans text-brand-dark">
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Breed</p>
                  <p className="font-bold">{selectedPuppy.breed}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Price</p>
                  <p className="font-bold text-brand-terracotta text-lg">${selectedPuppy.price ? selectedPuppy.price.toLocaleString() : "TBD"}</p>
                </div>
              </div>
              <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm italic">
                {selectedPuppy.description || "Raising standard of excellence for your future companion."}
              </p>
              
              {/* BOUTON MODIFIÉ POUR LE LIVE CHAT */}
              <button 
                onClick={() => handleInquiry(selectedPuppy)}
                disabled={selectedPuppy.status !== 'Available'}
                className={`w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all shadow-xl ${
                  selectedPuppy.status === 'Available' 
                  ? 'bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedPuppy.status === 'Available' ? `Inquire to Buy ${selectedPuppy.name}` : 'Reserved'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedPuppies;