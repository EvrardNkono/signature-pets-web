import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-[#FCFAFA] min-h-screen">
      
      {/* --- SECTION 1: THE MANIFESTO (Hero) --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 z-10">
            <h2 className="text-brand-gold tracking-[0.6em] uppercase text-[10px] font-black mb-6">Our Philosophy</h2>
            <h1 className="text-6xl md:text-8xl font-serif text-brand-dark italic leading-tight mb-8">
              Where <span className="text-brand-terracotta not-italic">Love</span> Meets <span className="text-brand-gold">Legacy</span>.
            </h1>
            <p className="text-gray-600 text-lg font-light leading-relaxed max-w-xl italic border-l-4 border-brand-gold pl-8">
              "We believe a dog is not a transaction, but a transformation of the home. At Signature Pets, we curate happiness, one lineage at a time."
            </p>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] overflow-hidden shadow-[30px_30px_0px_#E2725B]">
              <img 
                src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1200&auto=format&fit=crop" 
                alt="Happy Signature Puppy" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]"
              />
            </div>
            {/* Element décoratif Gold */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-brand-gold/20 -z-10"></div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE QUALITY OF LIFE (Image Masonry) --- */}
      <section className="py-32 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h3 className="text-4xl md:text-5xl font-serif mb-6">Uncompromising Welfare.</h3>
              <p className="text-gray-400 font-light leading-relaxed uppercase tracking-widest text-xs">
                Raised in-home, never in kennels. Every Signature companion is socialized for excellence.
              </p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-brand-gold/50 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-8">
              <div className="group overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop" className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110" alt="Happy dog" />
                <div className="absolute inset-0 bg-brand-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 border border-white/5 bg-white/[0.02]">
                <h4 className="text-brand-gold font-serif text-xl mb-4 italic font-bold">Physical Vitality</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Premium nutrition and clinical-grade health checks are non-negotiable standards for our litters.</p>
              </div>
            </div>

            <div className="space-y-8 md:mt-20">
              <div className="p-8 bg-brand-terracotta text-white">
                <h4 className="font-serif text-2xl mb-4 italic">"Socialization isn't a task, it's our lifestyle."</h4>
                <p className="text-white/70 text-sm">Every puppy is introduced to household sounds, children, and various textures to ensure a confident transition to your home.</p>
              </div>
              <div className="group overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop" className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110" alt="Golden Retriever" />
                <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="group overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop" className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110" alt="Dog life" />
              </div>
              <div className="p-8 border border-white/5 bg-white/[0.02]">
                <h4 className="text-brand-gold font-serif text-xl mb-4 italic font-bold">Ethical Heart</h4>
                <p className="text-gray-500 text-sm leading-relaxed">We stand firmly against puppy mills. Our ethical stewardship ensures the parents are as happy as the puppies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THE SIGNATURE DIFFERENCE (Details) --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-6 py-2 border border-brand-gold/30 mb-12">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-black">Our Standards</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-brand-dark mb-16 italic">Built on Three Foundations.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
            <div>
              <span className="block font-serif text-4xl text-brand-terracotta mb-6">01</span>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-4">Genetic Excellence</h5>
              <p className="text-gray-500 text-sm leading-relaxed font-light">We exclusively breed bloodlines that represent the pinnacle of their breed's health and temperament standards.</p>
            </div>
            <div className="md:pt-12">
              <span className="block font-serif text-4xl text-brand-terracotta mb-6">02</span>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-4">Holistic Rearing</h5>
              <p className="text-gray-500 text-sm leading-relaxed font-light">From Bio-Sensor stimulation to tailored play, our methodology builds resilient and intelligent companions.</p>
            </div>
            <div className="md:pt-24">
              <span className="block font-serif text-4xl text-brand-terracotta mb-6">03</span>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-4">Lifelong Support</h5>
              <p className="text-gray-500 text-sm leading-relaxed font-light">The Signature journey doesn't end at adoption. We provide a lifetime of guidance for every family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CALL TO ACTION --- */}
      <section className="py-40 bg-[#1A1A1A] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-serif italic mb-12">Become part of the <span className="text-brand-gold">Signature Family</span>.</h2>
          <button className="px-16 py-6 bg-brand-terracotta text-white text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-brand-gold hover:text-brand-dark transition-all duration-700 shadow-2xl">
            Inquire About Adoption
          </button>
        </div>
        
        {/* Background text decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[30vw] font-serif italic text-white whitespace-nowrap">Signature</h2>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;