import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// --- LOGIQUE D'URL DYNAMIQUE ---
const getBaseUrl = () => {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1'
    : 'https://backpets.vercel.app/api/v1';
};

const API_BREEDS = `${getBaseUrl()}/breeds`;

const Breed = () => {
  const { breedName } = useParams(); 
  const [breedData, setBreedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBreedInfo = async () => {
      try {
        setLoading(true);
        setError(false);
        // On utilise le titre/nom pour chercher la race
        const response = await axios.get(`${API_BREEDS}/${breedName}`);
        
        if (response.data && response.data.success) {
          setBreedData(response.data.data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Erreur breed info:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBreedInfo();
  }, [breedName]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FDFCFB]">
        <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="font-serif italic text-[#D4AF37] tracking-widest">Loading Heritage...</div>
      </div>
    );
  }

  if (error || !breedData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFCFB] text-gray-400 font-light tracking-widest uppercase text-xs">
        Breed heritage not found.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      
      {/* --- HERO SECTION DYNAMIQUE --- */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#1a1008]">
        <div className="absolute inset-0 z-0">
          <img 
            src={breedData.heroImage || breedData.image} 
            alt={breedData.title} 
            className="w-full h-full object-cover brightness-[0.4] contrast-[1.1] scale-105"
          />
        </div>

        {/* Overlay décoratif Signature Pets */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#FDFCFB]"></div>

        <div className="relative z-30 text-center px-6">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] mb-6 block animate-pulse">
            Exclusive Pedigree
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-white italic mb-8">
            The <span className="text-[#D4AF37] not-italic font-sans font-light">{breedData.title}</span>
          </h1>
          <p className="text-white/70 text-[10px] uppercase tracking-[0.5em] font-medium max-w-lg mx-auto leading-relaxed border-t border-b border-white/10 py-5">
            {breedData.origin || "A Masterclass in Heritage & Health"}
          </p>
        </div>
      </section>

      {/* --- HERITAGE SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          {/* Bordure d'angle dorée (Style Signature) */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37] z-20"></div>
          
          <div className="relative aspect-[4/5] bg-[#1a1008] overflow-hidden shadow-2xl">
            <img 
              src={breedData.heroImage || breedData.image} 
              alt={`${breedData.title} heritage`} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-90"
            />
          </div>
          
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37] z-20"></div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-[#D4AF37] font-serif italic text-2xl">Elite Breeding</h3>
            <h2 className="text-5xl md:text-6xl font-serif text-[#1a1008] leading-tight">Authentic Standards</h2>
          </div>

          <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
            <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-[#D4AF37] first-letter:mr-4 first-letter:float-left">
              {breedData.description || "No description available for this prestigious breed at the moment."}
            </p>
          </div>
          
          {/* CARACTÉRISTIQUES DYNAMIQUES */}
          <div className="grid grid-cols-2 gap-10 pt-12 border-t border-gray-100">
             <div>
                <h4 className="text-[#1a1008] font-serif italic text-xl mb-2">Temperament</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{breedData.temperament || "Gentle & Loyal"}</p>
             </div>
             <div>
                <h4 className="text-[#1a1008] font-serif italic text-xl mb-2">Coat Care</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{breedData.coatCare || "Premium Grooming required"}</p>
             </div>
          </div>

          <div className="pt-10">
            <button className="bg-[#1a1008] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-colors duration-500 shadow-xl">
              View Available {breedData.title}s
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Breed;