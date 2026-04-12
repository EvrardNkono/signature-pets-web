import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    breed: 'General Inquiry',
    message: ''
  });

  const phoneNumber = "13375671208";

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const message = `*NEW SIGNATURE PETS INQUIRY*%0A` +
                    `--------------------------%0A` +
                    `*Client:* ${formData.name}%0A` +
                    `*Email:* ${formData.email}%0A` +
                    `*Interest:* ${formData.breed}%0A` +
                    `*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* --- Section Hero --- */}
      <section className="relative h-[50vh] flex items-center justify-center bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30"
            alt="Signature Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 to-white"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold tracking-[0.6em] uppercase text-[10px] font-black mb-4 block">Concierge Service</span>
          <h1 className="text-5xl md:text-8xl font-serif text-brand-dark italic">
            Get in <span className="text-brand-gold not-italic font-light">Touch</span>
          </h1>
        </div>
      </section>

      {/* --- Section Content --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Infos à gauche */}
          <div className="lg:sticky lg:top-32 space-y-16">
            <div>
              <h2 className="text-brand-terracotta tracking-[0.3em] uppercase text-[10px] font-black mb-6">Direct Access</h2>
              <h3 className="text-5xl font-serif text-brand-dark italic leading-tight mb-8">
                Your journey to excellence starts here.
              </h3>
              <p className="text-gray-500 font-light text-lg leading-relaxed max-w-md">
                Our specialists are available for a private consultation. Experience the Signature Pets standard through our direct concierge.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 border border-brand-gold/20 flex items-center justify-center text-2xl group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500">
                  📍
                </div>
                <div>
                  <h4 className="text-brand-dark font-black uppercase text-[10px] tracking-widest mb-1">Headquarters</h4>
                  <p className="text-gray-500 font-light">Louisiana, United States</p>
                </div>
              </div>

              <div className="flex items-center gap-8 group">
                <div className="w-16 h-16 border border-brand-gold/20 flex items-center justify-center text-2xl group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500">
                  💬
                </div>
                <div>
                  <h4 className="text-brand-dark font-black uppercase text-[10px] tracking-widest mb-1">WhatsApp Concierge</h4>
                  <p className="text-gray-500 font-light">+1 (337) 567-1208</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire à droite */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-gold/5 rounded-xl blur-2xl"></div>
            <div className="relative bg-white p-8 md:p-16 shadow-2xl border-t-4 border-brand-gold">
              <form onSubmit={handleWhatsAppSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Alexander Pierce"
                      className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-brand-gold outline-none transition-all font-light text-brand-dark"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com"
                      className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-brand-gold outline-none transition-all font-light text-brand-dark"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Interested In</label>
                  <select 
                    className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-brand-gold outline-none transition-all font-light text-gray-500 appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, breed: e.target.value})}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="French Bulldog">French Bulldog</option>
                    <option value="German Shepherd">German Shepherd</option>
                    <option value="Other Breed">Other Elite Breed</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Your Message</label>
                  <textarea 
                    rows="4"
                    required
                    placeholder="How can we assist you?"
                    className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-brand-gold outline-none transition-all font-light resize-none text-brand-dark"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-brand-dark text-brand-gold text-[11px] uppercase tracking-[0.5em] font-black hover:bg-brand-terracotta hover:text-white transition-all duration-700 shadow-2xl flex items-center justify-center gap-3"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.516.903 3.003 1.387 4.793 1.388 5.204 0 9.44-4.233 9.442-9.441.002-5.209-4.235-9.447-9.44-9.447-2.522 0-4.893.984-6.674 2.77s-2.766 4.156-2.768 6.679c0 1.896.505 3.321 1.503 4.885l-1.003 3.665 3.747-.983l-.001-.001z"/>
                  </svg>
                  Inquire via WhatsApp
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;