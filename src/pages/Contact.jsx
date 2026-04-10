import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const phoneNumber = "13375671208"; // Votre numéro US

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    // Construction du message structuré
    const message = `*Nouveau Contact Signature Pets*%0A` +
                    `--------------------------%0A` +
                    `*Nom:* ${formData.name}%0A` +
                    `*Email:* ${formData.email}%0A` +
                    `*Sujet:* ${formData.subject}%0A` +
                    `*Message:* ${formData.message}`;

    // Création du lien WhatsApp (wa.me)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Ouverture de WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* --- 1. Hero Section --- */}
      <section className="relative h-[40vh] flex items-center justify-center bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img 
                src="https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=2000&auto=format&fit=crop" 
                alt="Contact Background" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-serif text-white italic">
            Get in <span className="text-brand-gold not-italic font-sans font-light">Touch</span>
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-6"></div>
        </div>
      </section>

      {/* --- 2. Contact Content --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Infos à gauche */}
          <div className="space-y-12">
            <div>
              <h2 className="text-brand-gold tracking-[0.3em] uppercase text-xs font-bold mb-4">Contact Information</h2>
              <h3 className="text-4xl font-serif text-brand-dark italic mb-8">Direct Access to Excellence.</h3>
              <p className="text-gray-500 leading-relaxed max-w-md">
                Fill out the form to start a direct conversation with our team. Your inquiry will be sent instantly via WhatsApp for a faster response.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-brand-gold/30 flex items-center justify-center shrink-0 text-brand-gold">
                  📍
                </div>
                <div>
                  <h4 className="text-brand-dark font-bold uppercase text-[10px] tracking-widest mb-1">Location</h4>
                  <p className="text-gray-500 text-sm">Louisiana, United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire à droite */}
          <div className="bg-gray-50 p-8 md:p-12 shadow-sm border border-gray-100">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-dark font-bold">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    className="w-full bg-white border-b border-gray-200 py-3 px-4 focus:border-brand-gold outline-none transition-colors text-sm"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-dark font-bold">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    className="w-full bg-white border-b border-gray-200 py-3 px-4 focus:border-brand-gold outline-none transition-colors text-sm"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-dark font-bold">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  className="w-full bg-white border-b border-gray-200 py-3 px-4 focus:border-brand-gold outline-none transition-colors text-sm"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-dark font-bold">Message</label>
                <textarea 
                  rows="4"
                  required
                  value={formData.message}
                  className="w-full bg-white border-b border-gray-200 py-3 px-4 focus:border-brand-gold outline-none transition-colors text-sm resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-brand-dark text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-brand-gold hover:text-brand-dark transition-all duration-700 shadow-xl"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;