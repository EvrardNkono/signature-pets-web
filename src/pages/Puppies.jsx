import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- LOGIQUE D'URL DYNAMIQUE ---
const getBaseUrl = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1'
    : 'https://backpets.vercel.app/api/v1';
};

const API_PUPPIES = `${getBaseUrl()}/puppies`;

const Puppies = () => {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPuppy, setSelectedPuppy] = useState(null);

  // Numéro WhatsApp (Format international sans le + pour le lien)
  const phoneNumber = "13375671208";

  useEffect(() => {
    const fetchPuppies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_PUPPIES); 
        if (response.data && response.data.data) {
          setPuppies(response.data.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des chiots:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPuppies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[#D4AF37] tracking-[0.3em] uppercase text-[10px] font-light">
            Signature Pets
          </div>
        </div>
      </div>
    );
  }

  const filteredPuppies = puppies.filter(p => 
    activeFilter === 'All' || p.gender === activeFilter
  );

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-sans text-gray-900">
      {/* --- HEADER --- */}
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-4 block">Available Companions</span>
        <h1 className="text-5xl md:text-6xl font-serif mb-6 italic">The Collection</h1>
        <div className="h-px w-20 bg-[#D4AF37] mx-auto mb-8"></div>
      </section>

      {/* --- FILTERS --- */}
      <div className="flex justify-center gap-12 mb-20">
        {['All', 'Mâle', 'Femelle'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`group relative pb-2 text-xs tracking-[0.2em] uppercase transition-colors ${
              activeFilter === filter ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {filter === 'All' ? 'View All' : filter}
            <span className={`absolute bottom-0 left-0 h-px bg-gray-900 transition-all duration-500 ${
              activeFilter === filter ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </button>
        ))}
      </div>

      {/* --- GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredPuppies.map((puppy) => (
            <div 
              key={puppy._id} 
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedPuppy(puppy)}
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img 
                  src={puppy.images?.[0] || 'https://via.placeholder.com/600x800?text=Signature+Pets'} 
                  alt={puppy.name}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* OVERLAY AU SURVOL */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <span className="bg-white/90 backdrop-blur px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     Discover {puppy.name}
                   </span>
                </div>

                {/* BADGE STATUS */}
                {puppy.status !== 'Available' && (
                  <div className="absolute top-6 left-6 bg-black/80 text-white px-4 py-1 text-[9px] tracking-widest uppercase rounded-full">
                    {puppy.status}
                  </div>
                )}
              </div>

              {/* INFO CONTAINER */}
              <div className="p-8 flex flex-col items-center text-center">
                <h3 className="text-2xl font-serif italic mb-2 text-gray-800">{puppy.name}</h3>
                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mb-4">
                  {puppy.breed} • {puppy.gender}
                </p>
                <div className="text-lg font-light text-[#D4AF37]">
                  {puppy.price?.toLocaleString() || "Price on request"} €
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPuppies.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic">
            No companions found in this category.
          </div>
        )}
      </section>

      {/* --- MODAL --- */}
      {selectedPuppy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md transition-all">
          <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto relative rounded-3xl shadow-2xl flex flex-col md:flex-row">
            <button 
              onClick={() => setSelectedPuppy(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-gray-400 hover:text-gray-900 transition-colors"
            >
              ✕
            </button>
            
            <div className="md:w-1/2 bg-gray-100">
              <img 
                src={selectedPuppy.images?.[0] || 'https://via.placeholder.com/600x800'} 
                alt={selectedPuppy.name}
                className="w-full h-full object-cover min-h-[400px]"
              />
            </div>
            
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col">
              <div className="mb-8">
                <span className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-2 block">Premium Companion</span>
                <h2 className="text-4xl font-serif italic text-gray-900 mb-2">{selectedPuppy.name}</h2>
                <p className="text-2xl font-light text-gray-400">{selectedPuppy.price} €</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8 py-8 border-y border-gray-100">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Breed</label>
                  <p className="text-sm font-medium">{selectedPuppy.breed}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Age</label>
                  <p className="text-sm font-medium">{selectedPuppy.age}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Gender</label>
                  <p className="text-sm font-medium">{selectedPuppy.gender}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Color</label>
                  <p className="text-sm font-medium">{selectedPuppy.color || "Standard"}</p>
                </div>
              </div>

              <p className="text-gray-500 leading-relaxed text-sm font-light mb-12 italic">
                {selectedPuppy.description ? `"${selectedPuppy.description}"` : "This exceptional companion is waiting for its forever home."}
              </p>

              <a 
                href={`https://wa.me/${phoneNumber}?text=Bonjour, je souhaite me renseigner sur le chiot ${selectedPuppy.name} (${selectedPuppy.breed})`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto group flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-xl text-[10px] tracking-[0.3em] uppercase hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
              >
                Inquire now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Puppies;