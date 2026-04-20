import React from 'react';

const TrustBar = () => {
  const trustElements = [
    { 
      label: 'Health Heritage', 
      value: '10-Year Guarantee', 
      detail: 'Industry-leading genetic health backing with comprehensive DNA clearance.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      label: 'Ethical Stewardship', 
      value: 'Home Raised', 
      detail: 'Zero-kennel policy. Our companions are raised in-home with early neurological stimulation.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      label: 'Global Logistics', 
      value: 'Air Nanny VIP', 
      detail: 'Luxury cabin travel with dedicated chaperones. No cargo, no stress—ever.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: 'Lifetime Circle', 
      value: '24/7 Concierge', 
      detail: 'Direct access to behavioral experts and health support for the life of your pet.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ];

  return (
    <section className="bg-brand-dark py-32 relative overflow-hidden">
      {/* Subtle Texture - Damask luxury pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm20 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm20 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' fill='%23D4AF37' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Imposing Header */}
        <div className="text-center mb-24">
            <h2 className="text-brand-gold font-serif italic text-sm tracking-[0.5em] uppercase mb-4">The Signature Commitment</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 italic">Ethically Bred. Professionally Socialized.</h3>
            <div className="w-24 h-[1px] bg-brand-gold/40 mx-auto mb-8"></div>
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
             At SignaturePets, we believe that adopting a puppy is far more than just a transaction; it is the beginning of a unique story. Our mission is to create memorable encounters between passionate families and exceptional companions
            </p>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {trustElements.map((stat, i) => (
            <div 
              key={i} 
              className="relative group p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700 hover:-translate-y-2 text-center"
            >
              {/* Inner Decorative Border */}
              <div className="absolute inset-2 border border-brand-gold/0 group-hover:border-brand-gold/20 transition-all duration-700 pointer-events-none"></div>

              {/* Icon with Glow */}
              <div className="text-brand-gold mb-8 flex justify-center opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                {stat.icon}
              </div>
              
              <h4 className="text-white font-serif text-2xl mb-4 tracking-tight italic">
                {stat.value}
              </h4>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-[1px] w-4 bg-brand-gold/50"></div>
                <p className="text-brand-gold text-[9px] uppercase tracking-[0.4em] font-black">
                    {stat.label}
                </p>
                <div className="h-[1px] w-4 bg-brand-gold/50"></div>
              </div>
              
              <p className="text-gray-500 text-[11px] leading-relaxed font-light italic px-4">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Credibility Footer - Badges */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-white text-[9px] uppercase tracking-[0.3em] font-bold">Registration</span>
                <span className="text-white font-serif text-xl italic tracking-widest">AKC ELITE BLOODLINE</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-white text-[9px] uppercase tracking-[0.3em] font-bold">Welfare Standard</span>
                <span className="text-white font-serif text-xl italic tracking-widest">USDA COMPLIANT</span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-white text-[9px] uppercase tracking-[0.3em] font-bold">Clinical Partner</span>
                <span className="text-white font-serif text-xl italic tracking-widest">VET-CERTIFIED HEALTH</span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-white text-[9px] uppercase tracking-[0.3em] font-bold">Transaction Security</span>
                <span className="text-white font-serif text-xl italic tracking-widest underline decoration-brand-gold/40 decoration-1 underline-offset-8">STRIPE PREMIUM</span>
            </div>
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-64 h-64 border border-brand-gold/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 border border-brand-gold/5 rounded-full pointer-events-none"></div>
    </section>
  );
};

export default TrustBar;