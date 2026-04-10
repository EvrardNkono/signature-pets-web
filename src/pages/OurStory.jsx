import React from 'react';

const OurStory = () => {
  // WhatsApp Configuration
  const whatsappNumber = "13375671208"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="bg-white min-h-screen">
      
      {/* --- 1. Hero Section : Image Immense et Élégante --- */}
      <section className="relative h-[70vh] flex items-center justify-center bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80&w=2000&auto=format&fit=crop" 
            alt="Signature Pets Heritage" 
            className="w-full h-full object-cover opacity-40 grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-transparent to-brand-dark"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <h2 className="text-brand-gold tracking-[0.8em] uppercase text-[10px] font-bold mb-6">
            Since the beginning
          </h2>
          <h1 className="text-6xl md:text-8xl font-serif text-white italic mb-4">
            Our <span className="text-brand-gold not-italic font-sans font-light">Story</span>
          </h1>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto mt-8"></div>
        </div>
      </section>

      {/* --- 2. The Vision --- */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <span className="text-brand-gold font-serif text-2xl italic mb-8 block">"More than an enrichment, a life companion."</span>
        <div className="space-y-8 text-gray-600 font-light leading-relaxed text-lg md:text-xl">
          <p>
            The **Signature Pets** adventure was born from a demanding vision: to redefine the standards of canine breeding by bringing together luxury, genetic rigor, and unconditional love.
          </p>
        </div>
      </section>

      {/* --- 3. Philosophy & Image Showcase : Nouvelles Images --- */}
      <section className="bg-gray-50 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Left Text */}
            <div className="lg:w-1/3 space-y-8 sticky top-32 h-fit">
              <h3 className="text-brand-gold tracking-[0.3em] uppercase text-xs font-bold">Our Philosophy</h3>
              <h4 className="text-4xl font-serif text-brand-dark italic leading-tight">Driven by Passion, <br/>Defined by Quality.</h4>
              <p className="text-gray-500 leading-relaxed">
                Every litter is the result of months of research. We believe in an ethical approach where mental and physical health takes precedence over everything else.
              </p>
              <ul className="space-y-6 pt-4">
                {['Certified Genetics', 'Premium Socialization', 'Lifetime Support'].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-brand-dark font-serif italic text-lg">
                    <span className="w-8 h-[1px] bg-brand-gold"></span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Images - MISES À JOUR AVEC UNSPLASH */}
            <div className="lg:w-2/3 space-y-12">
              <div className="relative">
                <div className="group overflow-hidden rounded-sm shadow-2xl aspect-[16/9]">
                  <img 
                    src="images/work.png" 
                    alt="Work - Excellence in detail" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                </div>
                <span className="absolute -bottom-6 -left-6 text-[100px] font-serif italic text-brand-gold/10 pointer-events-none">Work</span>
              </div>

              <div className="relative pt-12 lg:pl-20">
                <div className="group overflow-hidden rounded-sm shadow-2xl aspect-[16/9]">
                  <img 
                    src="images/passion.png" 
                    alt="Passion - The human-canine bond" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                </div>
                <span className="absolute -top-6 -right-6 text-[100px] font-serif italic text-brand-gold/10 pointer-events-none">Passion</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- 4. Quality Standards --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { id: '01', title: "The Origin", desc: "Rigorous selection of breeding stock from the world's finest bloodlines." },
              { id: '02', title: "The Care", desc: "Holistic nutrition and weekly veterinary monitoring for optimal growth." },
              { id: '03', title: "The Commitment", desc: "Personalized guidance for every new owner, even long after adoption." }
            ].map((std) => (
              <div key={std.id} className="text-center p-8 border border-gray-50 hover:border-brand-gold/20 transition-all duration-500 group">
                <h5 className="text-brand-gold font-serif text-4xl mb-6 italic group-hover:translate-y-[-5px] transition-transform">{std.id}</h5>
                <h6 className="text-brand-dark font-bold uppercase tracking-widest text-xs mb-4">{std.title}</h6>
                <p className="text-gray-400 text-sm leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. Final CTA --- */}
      <section className="py-32 bg-brand-dark text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none uppercase font-serif text-[20vw] text-white">
          Signature
        </div>
        
        <div className="relative z-10 px-6">
          <p className="text-brand-gold font-serif italic text-3xl mb-12">
            "We don't just sell puppies, we build families."
          </p>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-12"></div>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-14 py-5 border border-brand-gold text-brand-gold text-[11px] uppercase tracking-[0.6em] font-bold hover:bg-brand-gold hover:text-brand-dark transition-all duration-700"
          >
            Contact Our Team
          </a>
        </div>
      </section>

    </div>
  );
};

export default OurStory;