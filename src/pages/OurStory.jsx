import React from 'react';

const OurStory = () => {
  const whatsappNumber = "13375671208"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      
      {/* --- 1. Hero : L'Origine Immersive --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1444212477490-ca40a0a50599?q=80&w=2500&auto=format&fit=crop" 
            alt="Heritage Background" 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/80"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <span className="block text-brand-gold tracking-[1em] uppercase text-[9px] mb-8 animate-pulse">
            The Legacy of Signature
          </span>
          <h1 className="text-7xl md:text-[12rem] font-serif text-white leading-none mb-4 italic select-none">
            Our <span className="text-brand-gold not-italic">Roots</span>
          </h1>
          <div className="flex items-center justify-center gap-6 mt-12">
            <div className="w-24 h-[1px] bg-brand-gold/30"></div>
            <p className="text-brand-gold font-serif italic text-xl">Est. 2018</p>
            <div className="w-24 h-[1px] bg-brand-gold/30"></div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
           <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold to-transparent"></div>
        </div>
      </section>

      {/* --- 2. The Narrative Intro --- */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="relative z-10 aspect-[4/5] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop" alt="Founder Vision" className="w-full h-full object-cover" />
            </div>
            {/* Cadre flottant Terracotta */}
            <div className="absolute -top-10 -right-10 w-full h-full border-[20px] border-brand-terracotta/10 -z-10"></div>
            <div className="absolute -bottom-6 -left-6 bg-brand-dark p-8 z-20 shadow-xl">
               <p className="text-brand-gold font-serif italic text-2xl">"Uncompromising standards since day one."</p>
            </div>
          </div>
          
          <div className="space-y-10">
            <h2 className="text-brand-dark text-5xl md:text-7xl font-serif italic leading-tight">
              A pursuit of <br/> <span className="text-brand-terracotta not-italic font-sans font-bold uppercase text-4xl tracking-tighter">Pure Perfection.</span>
            </h2>
            <div className="space-y-6 text-gray-600 font-light text-xl leading-relaxed">
              <p>
                Everything started with a simple observation: the world of breeding had lost its soul. Quantity was replacing quality, and the bond was being forgotten.
              </p>
              <p className="text-brand-dark font-medium">
                Signature Pets was founded to restore that bond. We spent three years traveling, meeting the best geneticists, and selecting bloodlines that carry not just beauty, but character.
              </p>
              <p>
                Today, our name stands as a hallmark of excellence in the canine world, recognized by the most demanding owners globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. The Timeline Section (Le "Poids" Historique) --- */}
      <section className="py-32 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center">
             <h3 className="text-brand-gold tracking-[0.4em] uppercase text-xs font-bold mb-4">Chronicles</h3>
             <p className="text-4xl font-serif italic">Milestones of Excellence</p>
          </div>

          <div className="relative space-y-32 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-gold/0 before:via-brand-gold/40 before:to-brand-gold/0">
            
            {/* Year 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold bg-brand-dark text-brand-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-serif italic">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-8 bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl transition-all hover:border-brand-gold/30">
                <time className="font-serif italic text-brand-gold text-2xl mb-2 block">2018 — The Awakening</time>
                <p className="text-gray-400 font-light">Acquisition of our first elite Shiba Inu and Golden Retriever lineages. Setting up our private estate in Melun.</p>
              </div>
            </div>

            {/* Year 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold bg-brand-dark text-brand-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-serif italic">2</div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-8 bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl transition-all hover:border-brand-gold/30">
                <time className="font-serif italic text-brand-gold text-2xl mb-2 block">2021 — Global Recognition</time>
                <p className="text-gray-400 font-light">Our puppies joined families in over 12 countries. Signature becomes a synonym for "Home Raised Luxury".</p>
              </div>
            </div>

             {/* Year 3 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold bg-brand-dark text-brand-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-serif italic">3</div>
              <div className="w-[calc(100%-4rem)] md:w-[45%] p-8 bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl transition-all hover:border-brand-gold/30">
                <time className="font-serif italic text-brand-gold text-2xl mb-2 block">Today — The Signature Hub</time>
                <p className="text-gray-400 font-light">Launching our digital ecosystem and concierge service. Ensuring the "Signature" experience lasts a lifetime.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. The Craft Section --- */}
      <section className="py-40 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-32">
                <div className="lg:w-1/2">
                    <span className="text-brand-terracotta tracking-[0.5em] uppercase text-[10px] font-black mb-6 block">Beyond Breeding</span>
                    <h3 className="text-6xl font-serif italic text-brand-dark mb-12">A Mastercraft in <br/>Socialization.</h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-4 italic">Environment</h4>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">No cages. No stress. Our dogs live in a designed architectural space that mirrors a luxury home environment.</p>
                        </div>
                        <div>
                            <h4 className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-4 italic">Care</h4>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">24/7 human presence. Biometric health tracking. We treat health as a data-driven science and an act of love.</p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="aspect-square bg-gray-100 relative">
                        <img src="https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?q=80&w=1000&auto=format&fit=crop" alt="The Craft" className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-10 -right-10 bg-brand-terracotta text-white w-40 h-40 rounded-full flex items-center justify-center text-center p-4 shadow-2xl rotate-12">
                        <span className="text-[10px] uppercase tracking-widest font-black leading-tight">Certified Excellence</span>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* --- 5. Final Grandeur CTA --- */}
      <section className="h-[80vh] relative flex items-center justify-center bg-brand-dark overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Final Background"
        />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h4 className="text-white font-serif text-5xl md:text-7xl mb-12 italic">Your story with us <br/>begins here.</h4>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block px-16 py-6 border border-brand-gold overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10 text-brand-gold text-[11px] uppercase tracking-[0.6em] font-bold group-hover:text-brand-dark transition-colors duration-500">
              Join the Legacy
            </span>
            <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </a>
        </div>
      </section>

    </div>
  );
};

export default OurStory;