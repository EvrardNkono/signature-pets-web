import React from 'react';

const Breed = () => {
  const characteristics = [
    { title: "Temperament", desc: "Gentle, affectionate, and highly social. Perfect for families and therapy work." },
    { title: "Intelligence", desc: "Top-tier trainability inheriting the Poodle's wit and the Spaniel's focus." },
    { title: "Coat Type", desc: "Hypoallergenic, wavy to curly textures. Virtually non-shedding for luxury living." },
    { title: "Health", desc: "OFA tested parents and clear DNA panels for a robust, long-lived companion." }
  ];

  const steps = [
    { num: "01", title: "Selective Pairing", text: "We only pair champions with impeccable health records." },
    { num: "02", title: "Neurological Stimulation", text: "Early sensory work to build confident, calm adult dogs." },
    { num: "03", title: "Luxury Socialization", text: "Raised in-home, exposed to premium environments and sounds." }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* --- 1. Hero Section : Portrait de Prestige --- */}
      <section className="relative h-[55vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=2000&auto=format&fit=crop" 
            alt="Elite Breed" 
            className="w-full h-full object-cover brightness-[0.4] contrast-[1.1]"
          />
        </div>

        {/* Overlay Design */}
        <div className="absolute inset-0 z-10 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

        <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="w-[90%] h-[80%] border border-brand-gold/10 pointer-events-none"></div>
            <div className="absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent left-1/2 -translate-x-1/2 top-0"></div>
        </div>

        <div className="relative z-30 text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-brand-gold/50"></div>
            <span className="text-brand-gold tracking-[0.8em] uppercase text-[10px] font-bold drop-shadow-lg">
              Signature Excellence
            </span>
            <div className="w-8 h-[1px] bg-brand-gold/50"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif text-white italic mb-8 drop-shadow-2xl">
            The <span className="text-brand-gold not-italic font-sans font-light">Breed</span>
          </h1>

          <p className="text-white/70 text-[10px] uppercase tracking-[0.5em] font-medium max-w-lg mx-auto leading-relaxed border-t border-b border-white/10 py-4">
            A Masterclass in Heritage & Health
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-40"></div>
      </section>

      {/* --- 2. Heritage Section : Détail et Texture --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="aspect-[4/5] bg-brand-dark overflow-hidden rounded-sm shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1500&auto=format&fit=crop" 
              alt="Breed heritage" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-brand-gold/40"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-brand-gold/40"></div>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <h2 className="text-brand-gold font-serif text-sm italic mb-2 font-bold tracking-[0.3em] uppercase">Mastering the Art of</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-brand-dark leading-tight">Elite Breeding</h3>
            <div className="w-12 h-1 bg-brand-gold mt-4"></div>
          </div>
          
          <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-brand-gold first-letter:mr-3 first-letter:float-left">
              Our commitment goes beyond aesthetics. We focus on the genetic blueprint that defines a Signature Pet. By merging the regal grace of the Spaniel with the hypoallergenic brilliance of the Poodle, we create a legacy.
            </p>
            <p className="italic">
              Every dog in our program is a member of our family first. We curate lifetime companions that elevate the lives of those they touch.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 border border-brand-gold flex items-center justify-center text-brand-gold font-serif italic text-xl">S</div>
               <span className="text-[10px] uppercase tracking-widest text-brand-dark font-bold leading-tight">Superior<br/>Genetics</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 border border-brand-gold flex items-center justify-center text-brand-gold font-serif italic text-xl">H</div>
               <span className="text-[10px] uppercase tracking-widest text-brand-dark font-bold leading-tight">Holistic<br/>Health</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Reste du composant (Process, Characteristics, CTA) --- */}
      {/* ... Inchangé ... */}

    </div>
  );
};

export default Breed;