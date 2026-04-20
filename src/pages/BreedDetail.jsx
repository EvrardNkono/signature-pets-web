import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PuppyCard from '../components/PuppyCard';

// Logique de détection automatique de l'URL API
const getBaseUrl = () => {
  const isLocal = window.location.hostname === 'localhost';
  return isLocal 
    ? 'http://localhost:5000/api/v1' 
    : 'https://backpets.vercel.app/api/v1';
};

const API_URL = getBaseUrl();

const BreedDetail = () => {
  const { breedName } = useParams();
  const [breed, setBreed] = useState(null);
  const [puppies, setPuppies] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreedData = async () => {
      try {
        setLoading(true);
        setIsVisible(false);

        // 1. Récupérer toutes les races avec l'URL intelligente
        const breedRes = await axios.get(`${API_URL}/breeds`);
        
        const currentBreed = breedRes.data.data.find(b => 
          b.title.toLowerCase().replace(/\s+/g, '-') === breedName.toLowerCase()
        );

        if (!currentBreed) {
          throw new Error("Race introuvable");
        }

        setBreed(currentBreed);

        // 2. Récupérer les chiots avec l'URL intelligente
        const puppiesRes = await axios.get(`${API_URL}/puppies`);
        const breedPuppies = puppiesRes.data.data.filter(p => p.breed === currentBreed.title);
        setPuppies(breedPuppies);

        setTimeout(() => setIsVisible(true), 100);
      } catch (err) {
        console.error("Erreur Signature:", err);
        setError("Cette race d'exception n'est pas encore répertoriée.");
      } finally {
        setLoading(false);
      }
    };

    fetchBreedData();
  }, [breedName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-[0.3em] uppercase text-[10px] font-bold text-brand-gold">Loading Excellence</p>
        </div>
      </div>
    );
  }

  if (error || !breed) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-3xl font-serif italic mb-6 text-center">{error}</h2>
        <Link to="/" className="text-brand-gold uppercase tracking-widest text-[10px] border-b border-brand-gold pb-2">
          Return to Collection
        </Link>
      </div>
    );
  }

  const filteredPuppies = puppies.filter(p => 
    activeFilter === 'All' || p.gender === activeFilter
  );

  return (
    <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-brand-dark text-white">
        <img 
          src={breed.heroImage} 
          alt={breed.title} 
          onLoad={() => setHeroLoaded(true)}
          className={`w-full h-full object-cover scale-105 transition-all duration-[3000ms] ease-out brightness-[0.6] ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-brand-gold tracking-[0.8em] uppercase text-[10px] mb-6 font-bold">
            Signature Elite Breed
          </span>
          <h1 className="text-6xl md:text-9xl font-serif italic drop-shadow-2xl mb-8">
            {breed.title}
          </h1>
          <div className="w-24 h-[1px] bg-brand-gold/60"></div>
        </div>
      </section>

      {/* --- DESCRIPTION SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-[#FAF9F6] p-10 border border-gray-100 relative">
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
                  <span className="text-gray-800 font-serif italic text-lg">{breed.coatCare || 'Premium Grooming'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-6">The Signature Standard</h3>
            <p className="text-2xl md:text-3xl font-light leading-[1.8] text-gray-800 italic first-letter:text-7xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-brand-gold">
              {breed.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- PUPPIES GRID --- */}
      <section className="bg-[#fcfcfc] py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div>
              <h2 className="text-5xl font-serif italic text-brand-dark mb-4">Breeds Available</h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                {filteredPuppies.length} companions ready for home
              </p>
            </div>

            <div className="flex gap-8 border-b border-gray-100 pb-2">
              {['All', 'Mâle', 'Femelle'].map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-[10px] uppercase tracking-widest font-bold transition-all ${
                    activeFilter === f ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-300 hover:text-brand-dark'
                  } pb-2`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPuppies.length > 0 ? (
              filteredPuppies.map((puppy) => (
                <PuppyCard key={puppy._id} puppy={puppy} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-serif italic text-xl">
                  No {breed.title} companions currently available.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 bg-brand-dark text-center">
        <h2 className="text-white font-serif italic text-3xl mb-10">Begin Your Signature Journey</h2>
        <Link to="/contact" className="inline-block bg-brand-gold px-12 py-5 text-[11px] uppercase tracking-[0.4em] text-brand-dark font-black hover:bg-white transition-all">
          Apply for Adoption
        </Link>
      </section>
    </div>
  );
};

export default BreedDetail;