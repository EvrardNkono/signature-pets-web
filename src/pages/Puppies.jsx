import React, { useState } from 'react';

const Puppies = () => {
  // État pour filtrer par genre
  const [activeFilter, setActiveFilter] = useState('All');

  // Données simulées (Prêtes pour une future intégration MongoDB)
  const puppyList = [
    {
      id: 1,
      name: "Prince",
      gender: "Male",
      price: "2,800",
      image: "/images/puppy1.jpg", 
      status: "Available",
      breed: "F1 Cavapoo"
    },
    {
      id: 2,
      name: "Bella",
      gender: "Female",
      price: "3,200",
      image: "/images/puppy2.jpg",
      status: "Reserved",
      breed: "Toy Cavapoo"
    },
    {
      id: 3,
      name: "Cooper",
      gender: "Male",
      price: "2,500",
      image: "/images/puppy3.jpg",
      status: "Available",
      breed: "F1b Cavapoo"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* --- 1. Hero Banner Section --- */}
      <section className="relative h-[45vh] min-h-[400px] bg-brand-dark flex items-center justify-center overflow-hidden">
        {/* Effet visuel de profondeur (Radial Gradient) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center px-6 mt-16">
          <span className="text-brand-gold tracking-[0.6em] uppercase text-[10px] md:text-[12px] font-bold mb-4 block animate-pulse">
            Signature Standard
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white italic mb-6">
            Our Available <span className="text-brand-gold font-sans not-italic font-light">Puppies</span>
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
        </div>

        {/* Ligne décorative dorée en bas de bannière */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
      </section>

      {/* --- 2. Barre de Filtres --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex justify-center gap-8 md:gap-12">
        {['All', 'Male', 'Female'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 transition-all duration-300 ${
              activeFilter === filter 
              ? 'text-brand-gold border-b-2 border-brand-gold' 
              : 'text-gray-400 hover:text-brand-dark'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* --- 3. Grille des Chiots --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {puppyList
          .filter(p => activeFilter === 'All' || p.gender === activeFilter)
          .map((puppy) => (
            <div key={puppy.id} className="group relative">
              {/* Conteneur Image avec zoom au survol */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm shadow-sm">
                <img 
                  src={puppy.image} 
                  alt={puppy.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                
                {/* Badge Statut Dynamique */}
                <div className={`absolute top-6 left-6 px-4 py-1 text-[8px] uppercase tracking-widest font-bold text-white z-10 ${
                  puppy.status === 'Available' 
                  ? 'bg-brand-gold shadow-lg' 
                  : 'bg-brand-dark/60 backdrop-blur-md'
                }`}>
                  {puppy.status}
                </div>

                {/* Overlay subtil au survol */}
                <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Informations du chiot */}
              <div className="mt-8 text-center px-4">
                <h3 className="text-2xl font-serif text-brand-dark group-hover:text-brand-gold transition-colors duration-300">
                  {puppy.name}
                </h3>
                <p className="text-gray-400 text-[9px] uppercase tracking-[0.4em] mt-2 mb-6">
                  {puppy.gender} • {puppy.breed}
                </p>
                <div className="flex flex-col items-center gap-5">
                  <span className="text-brand-dark font-serif text-xl tracking-tight">
                    ${puppy.price}
                  </span>
                  <button className="w-full max-w-[220px] py-4 border border-brand-dark/20 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-500 hover:border-brand-dark">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Message si aucun chiot ne correspond (Sécurité) */}
      {puppyList.filter(p => activeFilter === 'All' || p.gender === activeFilter).length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 font-serif italic">No puppies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Puppies;