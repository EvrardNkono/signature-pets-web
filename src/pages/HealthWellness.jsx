import React from 'react';

const HealthWellness = () => {
  const healthProtocols = [
    {
      title: "Full Vaccination",
      desc: "Comprehensive protection against Parvovirus, Distemper, Hepatitis, and Leptospirosis.",
      icon: "💉"
    },
    {
      title: "Anti-Parasite Protocol",
      desc: "Bi-monthly deworming and preventive treatments against fleas, ticks, and heartworm.",
      icon: "🛡️"
    },
    {
      title: "Genetic Screening",
      desc: "DNA testing to rule out breed-specific hereditary diseases (Dysplasia, PRA, etc.).",
      icon: "🧬"
    },
    {
      title: "Microchipping & Registry",
      desc: "Electronic identification and official registration in international canine databases.",
      icon: "📍"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24">
      
      {/* --- Section 1: Hero (Clinical & Luxury) --- */}
      <section className="relative py-32 bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-brand-gold tracking-[0.5em] uppercase text-[10px] font-black mb-6 block">Our Medical Standards</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white italic mb-8">
              Wellness as a <span className="text-brand-gold">Signature</span>.
            </h1>
            <p className="text-gray-400 font-light text-lg leading-relaxed">
              Adopting a Signature companion means ensuring a puppy whose health has been scrupulously analyzed, protected, and certified before they take their first step into your home.
            </p>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 -skew-x-12 translate-x-1/2"></div>
      </section>

      {/* --- Section 2: Health Checklist (Technical Grid) --- */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {healthProtocols.map((item, index) => (
            <div key={index} className="p-10 border border-gray-100 hover:border-brand-terracotta/30 transition-all duration-500 group">
              <span className="text-4xl mb-6 block">{item.icon}</span>
              <h3 className="text-brand-dark font-serif text-xl italic mb-4 group-hover:text-brand-terracotta transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 3: Certificate Focus (The "Medical File") --- */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="bg-white p-12 shadow-2xl border-t-8 border-brand-gold relative z-10">
                <h4 className="font-serif text-3xl text-brand-dark mb-8 italic">The Departure Folder</h4>
                <ul className="space-y-6">
                  {[
                    "Veterinary Certificate of Good Health (issued < 5 days)",
                    "Up-to-date International Health Record",
                    "Certificate of Birth (Official Pedigree)",
                    "Premium Nutritional Starter Kit",
                    "Personalized Post-Adoption Care Guide"
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600 text-sm">
                      <span className="text-brand-gold mt-1">✓</span> {doc}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="absolute -bottom-6 -right-6 w-full h-full bg-brand-terracotta/10 -z-10"></div>
          </div>

          <div className="space-y-8">
            <h2 className="text-brand-terracotta font-serif text-sm italic tracking-[0.3em] uppercase font-black">Zero Compromise</h2>
            <h3 className="text-5xl font-serif text-brand-dark leading-tight">Constant Veterinary <br/> Surveillance.</h3>
            <p className="text-gray-600 font-light text-lg">
              Our partner veterinarians conduct weekly visits to monitor the growth curves and behavioral development of every litter.
            </p>
            <div className="p-8 bg-brand-dark text-brand-gold italic font-serif text-xl border-l-4 border-brand-gold">
              "We don't just deliver a dog; we deliver peace of mind for the next 15 years."
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Nutrition & Wellness --- */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-serif italic text-brand-dark mb-12">Partners in Nutritional Excellence</h3>
        <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
          <span className="text-2xl font-black tracking-tighter">ROYAL CANIN <small className="text-[10px]">ELITE</small></span>
          <span className="text-2xl font-black tracking-tighter">DYNAVENA</span>
          <span className="text-2xl font-black tracking-tighter">ZOETIS</span>
        </div>
      </section>

      {/* --- Section 5: CTA --- */}
      <section className="py-24 bg-brand-terracotta text-center">
        <h4 className="text-white font-serif text-3xl mb-8 italic">Questions about our health protocols?</h4>
        <button className="px-12 py-5 bg-brand-dark text-white text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-white hover:text-brand-dark transition-all duration-500">
          Consult a Health Expert
        </button>
      </section>

    </div>
  );
};

export default HealthWellness;