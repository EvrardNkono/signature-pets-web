import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import FeaturedPuppies from '../components/home/FeaturedPuppies';
import TrustBar from '../components/home/TrustBar';

const Home = () => {
  return (
    // On s'assure que le main est bien positionné
    <main className="relative overflow-x-hidden">
      {/* Le HeroSlider doit être en haut. 
        Si le slider utilise des images en 'absolute', 
        vérifie qu'il a bien une hauteur définie (ex: h-screen ou h-[600px])
      */}
      <section className="relative w-full">
        <HeroSlider />
      </section>

      <TrustBar />

      {/* Section Storytelling */}
      <section className="py-24 bg-[#FAFAFA] flex flex-col items-center px-8 text-center">
        <div className="max-w-3xl">
          <span className="text-brand-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6 block">
            The Signature Standard
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8 italic">
            Where Excellence Meets <span className="text-brand-terracotta">Companionship</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 font-sans">
            At Signature Pets, we believe that bringing a new member into your family is a momentous occasion. 
            Our mission is to provide not just a pet, but a legacy of health, temperament, and beauty. 
          </p>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
        </div>
      </section>

      <FeaturedPuppies />

      <div className="pb-20 bg-white"></div>
    </main>
  );
};

export default Home;