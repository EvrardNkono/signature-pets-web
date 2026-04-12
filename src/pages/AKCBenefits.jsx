import React from 'react';

const AKCBenefits = () => {
  const benefits = [
    {
      title: "Certified Lineage",
      desc: "Every puppy comes with an official pedigree spanning several generations, ensuring breed purity and traceability.",
      icon: "📜"
    },
    {
      title: "Show Eligibility",
      desc: "Your companion is officially recognized to compete in prestigious AKC exhibitions and sanctioned events.",
      icon: "🏆"
    },
    {
      title: "Medical Research",
      desc: "The AKC invests millions in canine health research, directly benefiting the long-term wellness of our bloodlines.",
      icon: "🔬"
    },
    {
      title: "Protection & Recovery",
      desc: "Includes official ownership transfer and access to recovery services for lost animals (AKC Reunite).",
      icon: "🛡️"
    }
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-24">
      
      {/* --- Section Hero: Prestige --- */}
      <section className="relative py-32 bg-[#002855] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <span className="text-brand-gold tracking-[0.4em] uppercase text-[10px] font-black mb-6 block">The Gold Standard</span>
              <h1 className="text-5xl md:text-7xl font-serif italic mb-6">
                <span className="text-brand-gold">AKC</span> Excellence.
              </h1>
              <p className="text-blue-100/80 font-light text-lg leading-relaxed max-w-2xl">
                At Signature Pets, we never compromise on authenticity. AKC registration is the ultimate proof that your puppy belongs to the world's breed elite.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
                {/* Seal Icon / Symbolic Logo */}
                <div className="w-48 h-48 border-2 border-brand-gold rounded-full flex items-center justify-center p-4">
                    <div className="w-full h-full border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold font-serif italic text-4xl text-center">
                        AKC <br/> <span className="text-[10px] uppercase tracking-widest">Elite</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: The Advantages --- */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-brand-dark text-4xl font-serif italic">Why Registration Matters</h2>
          <div className="w-20 h-1 bg-brand-terracotta mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-8 p-8 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 border-l-4 border-brand-gold">
              <span className="text-4xl">{benefit.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-2 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 3: The Signature Commitment --- */}
      <section className="py-32 bg-brand-dark overflow-hidden relative">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white text-4xl font-serif italic mb-8">More Than Paper, A Legacy.</h2>
          <p className="text-gray-400 text-lg mb-12 font-light">
            Every Signature owner receives a comprehensive AKC folder, including the official birth certificate, pedigree transfer, and exclusive access to the American Kennel Club’s educational resources.
          </p>
          <div className="inline-block px-10 py-4 bg-white/5 border border-brand-gold text-brand-gold font-serif italic text-xl">
             "Protecting the integrity of the breed."
          </div>
        </div>
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] pointer-events-none select-none">
          HERITAGE
        </div>
      </section>

    </div>
  );
};

export default AKCBenefits;