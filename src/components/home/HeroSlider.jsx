import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const slideImages = [
    "https://images.unsplash.com/photo-1591768793355-74d7af236c1f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=1000&auto=format&fit=crop"
  ];

  return (
    <section className="relative h-screen w-full bg-brand-dark overflow-hidden">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop" 
          className="h-full w-full object-cover opacity-30 scale-105 animate-[pulse_10s_infinite]" 
          alt="Luxury Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark"></div>
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center md:justify-start pt-20 md:pt-44">
        
        {/* Decorative Circle Container */}
        <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] mb-12">
          
          {/* External Rotating Gold Rings */}
          <div className="absolute -inset-4 border border-brand-gold/20 rounded-full animate-spin-slow"></div>
          <div className="absolute -inset-8 border border-brand-gold/5 rounded-full animate-spin-slow-reverse opacity-30"></div>

          {/* Masked Swiper Circle */}
          <div className="relative h-full w-full rounded-full border-[3px] border-brand-gold overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.15)] z-0">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }} // Assure une transition propre pour la 1ère image
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="h-full w-full"
            >
              {slideImages.map((img, index) => (
                <SwiperSlide key={index} className="bg-brand-dark">
                  <img src={img} className="h-full w-full object-cover" alt={`Puppy ${index}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Étiquette Terracotta : z-50 et pointer-events-none pour ne pas bloquer le swiper */}
          <div className="absolute -right-4 bottom-10 bg-brand-terracotta text-white px-6 py-2 text-[9px] font-bold uppercase tracking-[0.2em] -rotate-12 shadow-2xl border border-white/10 z-50 pointer-events-none">
            New Litter
          </div>
        </div>

        {/* 3. Text & CTA */}
        <div className="text-center text-white px-4 max-w-4xl">
          <span className="block text-brand-gold tracking-[0.6em] uppercase text-[9px] md:text-[10px] mb-6 font-bold opacity-80">
            Defining the Standard of Canine Luxury
          </span>
          <h1 className="text-5xl md:text-8xl font-serif mb-10 leading-[0.9] tracking-tighter">
            Signature <br className="md:hidden" />
            <span className="text-brand-terracotta italic font-light">Companions</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="group relative px-12 py-5 overflow-hidden bg-brand-terracotta text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-lg">
              <span className="relative z-10">View Available Puppies</span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            
            <button className="px-12 py-5 border border-white/10 hover:border-brand-gold text-white text-[10px] uppercase tracking-[0.3em] transition-all bg-white/5 backdrop-blur-sm">
              Our Breeding Legacy
            </button>
          </div>
        </div>
      </div>

      {/* Decorative side text */}
      <div className="absolute left-10 bottom-20 hidden lg:block">
        <p className="text-white/10 text-[9px] uppercase tracking-[0.6em] [writing-mode:vertical-lr] rotate-180 font-bold">
          Quality • Integrity • Elegance
        </p>
      </div>
    </section>
  );
};

export default HeroSlider;