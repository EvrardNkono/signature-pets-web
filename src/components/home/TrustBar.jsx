import React from 'react';

const TrustBar = () => {
  const stats = [
    { label: 'Health Guarantee', value: '10 Years', detail: 'Full protection' },
    { label: 'Registered Breeders', value: 'AKC Elite', detail: 'Certified bloodlines' },
    { label: 'Global Delivery', value: 'White Glove', detail: 'Safe arrival' },
    { label: 'Expert Support', value: '24/7', detail: 'Lifetime guidance' },
  ];

  return (
    <section className="bg-brand-dark py-20 relative overflow-hidden">
      {/* Texture de fond subtile (optionnelle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="group text-center px-4 border-r last:border-0 border-white/5 md:hover:scale-105 transition-transform duration-500"
            >
              {/* Petite icône décorative ornée */}
              <div className="w-1 h-1 bg-brand-gold mx-auto mb-6 rounded-full shadow-[0_0_8px_#D4AF37]"></div>
              
              <h4 className="text-brand-gold font-serif text-3xl mb-2 tracking-tight italic">
                {stat.value}
              </h4>
              
              <p className="text-white text-[10px] uppercase tracking-[0.4em] font-bold mb-1">
                {stat.label}
              </p>
              
              <p className="text-gray-500 text-[8px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ligne de finition dorée en bas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
    </section>
  );
};

export default TrustBar;