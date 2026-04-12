import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { breedData } from '../data/breeds';
import PuppyCard from '../components/PuppyCard';

const BreedDetail = () => {
  const { breedName } = useParams();
  const [breed, setBreed] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false); // Reset l'animation au changement de race
    
    if (breedData[breedName]) {
      // Petit délai pour laisser ScrollToTop agir avant de révéler le contenu
      const timer = setTimeout(() => {
        setBreed(breedData[breedName]);
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [breedName]);

  if (!breed) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-[0.3em] uppercase text-[10px] font-bold text-brand-gold">Loading Excellence</p>
        </div>
      </div>
    );
  }

  const filteredPuppies = breed.puppies.filter(p => 
    activeFilter === 'All' || p.gender === activeFilter
  );

  return (
    <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] w-full overflow-hidden bg-brand-dark">
        <img 
          src={breed.image} 
          alt={breed.title} 
          className="w-full h-full object-cover scale-105 transition-transform duration-[3000ms] ease-out hover:scale-100 brightness-[0.7]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black/20 via-transparent to-black/40">
          <span className="text-brand-gold tracking-[0.8em] uppercase text-[10px] mb-6 font-bold animate-pulse">
            Signature Elite Breed
          </span>
          <h1 className="text-6xl md:text-9xl font-serif text-white italic drop-shadow-2xl mb-8">
            {breed.title}
          </h1>
          <div className="w-24 h-[1px] bg-brand-gold/60"></div>
        </div>
        {/* Decorative corner */}
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b border-r border-white/20 hidden md:block"></div>
      </section>

      {/* --- DESCRIPTION SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Stats Box */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-gray-50 p-10 border border-gray-100 relative group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-gold transition-all duration-700 group-hover:h-full"></div>
              <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-brand-dark mb-10 border-b border-gray-200 pb-4">
                Breed Profile
              </h2>
              <ul className="space-y-8">
                <li className="flex flex-col">
                  <span className="text-brand-gold text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Origin</span>
                  <span className="text-gray-800 font-serif italic text-lg">{breed.origin}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-brand-gold text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Spirit</span>
                  <span className="text-gray-800 font-serif italic text-lg">{breed.temperament}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-brand-gold text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Coat Care</span>
                  <span className="text-gray-800 font-serif italic text-lg">Premium Grooming Req.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-4">The Standard</h3>
            <p className="text-2xl md:text-3xl font-light leading-[1.8] text-gray-800 italic first-letter:text-8xl first-letter:font-serif first-letter:mr-6 first-letter:float-left first-letter:text-brand-gold first-letter:leading-none">
              {breed.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- PUPPIES GRID SECTION --- */}
      <section className="bg-[#fcfcfc] py-32 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-5xl font-serif italic text-brand-dark mb-6">The Current Litter</h2>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="w-12 h-[1px] bg-brand-gold"></span>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                    {filteredPuppies.length} available companions
                </p>
              </div>
            </div>

            {/* Premium Filter */}
            <div className="flex gap-10 border-b border-gray-100 pb-3">
                {['All', 'Male', 'Female'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`text-[10px] uppercase tracking-widest font-bold transition-all duration-500 relative pb-2 ${
                            activeFilter === f ? 'text-brand-gold' : 'text-gray-300 hover:text-brand-dark'
                        }`}
                    >
                        {f}
                        {activeFilter === f && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold animate-in fade-in slide-in-from-left-2"></span>
                        )}
                    </button>
                ))}
            </div>
          </div>

          {/* Grid with animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {filteredPuppies.map((puppy, index) => (
              <div 
                key={puppy.id} 
                style={{ transitionDelay: `${index * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both"
              >
                <PuppyCard puppy={puppy} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REASSURANCE SECTION --- */}
      <section className="py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                  <div className="group">
                      <div className="w-12 h-12 mx-auto mb-8 border border-brand-gold flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-700">I</div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark mb-4">Certified Health</h4>
                      <p className="text-gray-400 text-xs font-light italic">Complete DNA & OFA screening for all parents.</p>
                  </div>
                  <div className="group">
                      <div className="w-12 h-12 mx-auto mb-8 border border-brand-gold flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-700">II</div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark mb-4">Elite Socialization</h4>
                      <p className="text-gray-400 text-xs font-light italic">Raised in-home with early neurological stimulation.</p>
                  </div>
                  <div className="group">
                      <div className="w-12 h-12 mx-auto mb-8 border border-brand-gold flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-700">III</div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark mb-4">Lifetime Support</h4>
                      <p className="text-gray-400 text-xs font-light italic">A lifetime of guidance for your Signature companion.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-40 text-center bg-brand-dark text-white relative">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px'}}></div>
        <div className="relative z-10 px-6">
            <h3 className="text-4xl md:text-5xl font-serif italic mb-10">Begin Your Journey</h3>
            <p className="text-gray-400 text-sm font-light mb-16 max-w-lg mx-auto italic leading-relaxed">
                Adopting a {breed.title} is an exclusive experience. Our priority waiting list ensures you receive the perfect match for your lifestyle.
            </p>
            <Link to="/contact" className="inline-block bg-brand-gold px-16 py-6 text-[11px] uppercase tracking-[0.5em] text-brand-dark font-black hover:bg-white transition-all duration-700 hover:tracking-[0.6em]">
              Apply for Adoption
            </Link>
        </div>
      </section>
    </div>
  );
};

export default BreedDetail;