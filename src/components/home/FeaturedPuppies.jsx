import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedPuppies = () => {
  const [selectedPuppy, setSelectedPuppy] = useState(null);
  const phoneNumber = "13375671208";

  const handleWhatsAppBuy = (puppy) => {
    const message = `Hello Signature Pets! I am interested in ${puppy.name}, the ${puppy.breed} featured on your homepage. Is ${puppy.gender} still available for $${puppy.price}?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const puppies = [
    { 
      id: 5, name: 'Milo', breed: 'Cavapoo', price: '3,100', gender: 'Male', age: '12 wks', status: 'Coming Soon', img: 'images/milo.jpg',
      description: "Milo is a particularly intelligent and calm companion. His hypoallergenic coat and gentle temperament make him the ideal choice for apartment living."
    },
    { 
      id: 6, name: 'Daisy', breed: 'English Springer', price: '3,600', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
      description: "Daisy overflows with elegance and energy. Very affectionate, she loves long walks and will be a tireless play partner for the whole family."
    },
    { 
      id: 7, name: 'Teddy', breed: 'German Shepherd', price: '3,000', gender: 'Male', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800',
      description: "Teddy is a loyal future protector. Calm and attentive, he already shows great learning capacity and remarkable natural obedience."
    },
    { 
      id: 8, name: 'Coco', breed: 'Beagle Mix', price: '3,300', gender: 'Female', age: '10 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
      description: "Coco is a born explorer. Her curiosity and joy for life are contagious. She gets along wonderfully with other animals."
    },
    { 
      id: 12, name: 'Rosie', breed: 'Mixed Breed', price: '3,500', gender: 'Female', age: '9 wks', status: 'Available', img: 'images/rosie.jpg',
      description: "Rosie possesses a unique charm. She is a very sensitive little dog looking for a warm home to offer all her loyalty."
    },
    { 
      id: 13, name: 'Archie', breed: 'French Bulldog', price: '3,150', gender: 'Male', age: '8 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800',
      description: "Archie is the little clown of the group. Small in size but big in personality, he will brighten your days with his antics."
    },
    { 
      id: 14, name: 'Lola', breed: 'Golden Retriever Mix', price: '3,450', gender: 'Female', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
      description: "Lola embodies absolute sweetness. She is very patient, making her an exceptional companion for households with young children."
    },
    { 
      id: 15, name: 'Bear', breed: 'Border Collie', price: '3,300', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800',
      description: "Bear is extremely sharp and responsive. He needs a stimulating environment where he can express all his intelligence and agility."
    },
    { 
      id: 19, name: 'Murphy', breed: 'Basset Hound', price: '3,100', gender: 'Male', age: '11 wks', status: 'Available', img: 'images/murphy.jpg',
      description: "Murphy is the very definition of tranquility. He appreciates his comfort and naps in the sun, while remaining a great fan of cuddles."
    },
    { 
      id: 20, name: 'Willow', breed: 'White Terrier', price: '3,600', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
      description: "Willow is a little snowball full of character. Brave and lively, she isn't afraid of anything and loves to be the center of attention."
    },
    { 
      id: 21, name: 'Duke', breed: 'Boxer', price: '2,700', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?auto=format&fit=crop&q=80&w=800',
      description: "Duke is a powerful athlete with a heart of gold. Very protective of his family, he is also a great player once he feels at home."
    },
    { 
      id: 22, name: 'Zoe', breed: 'Dachshund', price: '3,400', gender: 'Female', age: '8 wks', status: 'Available', img: 'images/zoe.jpg',
      description: "Zoe is small but bold. Her elegant appearance hides a curious temperament and a determination typical of her breed."
    },
    { 
      id: 23, name: 'Rex', breed: 'Doberman', price: '2,950', gender: 'Male', age: '9 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800',
      description: "Rex exudes a natural presence. Behind his imposing look lies a very sensitive dog who requires a deep, bonded relationship."
    },
    { 
      id: 24, name: 'Nala', breed: 'Siberian Husky', price: '3,200', gender: 'Female', age: '12 wks', status: 'Available', img: 'images/nala.jpg',
      description: "Nala has a captivating gaze and boundless energy. She will thrive with active owners who love the great outdoors."
    },
    { 
      id: 25, name: 'Buster', breed: 'Pointer', price: '3,100', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
      description: "Buster is an elegant and tireless working dog. Very balanced, he is also an extremely pleasant life companion indoors."
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto bg-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-serif text-brand-dark mb-6 italic">
            Elite <span className="text-brand-terracotta not-italic">Featured</span> Puppies
          </h2>
          <div className="w-24 h-[2px] bg-brand-gold mb-6"></div>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">
            Hand-selected companions from our latest litters
          </p>
        </div>
        <Link 
          to="/puppies" 
          className="text-brand-dark font-bold text-xs border-b border-brand-gold pb-2 tracking-[0.4em] hover:text-brand-terracotta transition-all duration-500 uppercase"
        >
          Explore All Puppies
        </Link>
      </div>

     {/* Grid Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
  {puppies.map((puppy) => (
    <div key={puppy.id} className="group relative flex flex-col" onClick={() => setSelectedPuppy(puppy)}>
      
      {/* Container Image avec Effet de Cadre Décalé */}
      <div className="relative mb-10">
        <div className="relative overflow-hidden aspect-[4/5] z-10 shadow-2xl">
          <img 
            src={puppy.img} 
            alt={puppy.name} 
            loading="lazy"
            className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out" 
          />
          
          {/* Overlay Signature au survol */}
          <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-20">
             <div className="border border-white/30 p-4 backdrop-blur-[2px]">
                <span className="text-white text-[8px] uppercase tracking-[0.6em] font-light">View Pedigree</span>
             </div>
          </div>
        </div>

        {/* Cadre décoratif Terracotta & Gold en arrière-plan (se révèle au hover) */}
        <div className="absolute -bottom-3 -right-3 w-full h-full border border-brand-gold/20 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        
        {/* Status Badge - Flottant et Impérial */}
        <div className="absolute -top-4 right-6 z-30 shadow-xl">
           <div className={`px-5 py-2 text-[8px] font-black uppercase tracking-[0.4em] 
            ${puppy.status === 'Available' ? 'bg-brand-dark text-brand-gold border-b-2 border-brand-gold' : 
              puppy.status === 'Reserved' ? 'bg-brand-terracotta text-white border-b-2 border-white/20' : 
              'bg-gray-500 text-white'}`}>
            {puppy.status}
          </div>
        </div>
      </div>

      {/* Détails de la carte avec plus de caractère */}
      <div className="space-y-6 relative z-10 px-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-4xl font-serif text-brand-dark leading-none mb-1">
                {puppy.name}
              </h3>
              <p className="text-brand-gold text-[9px] uppercase tracking-[0.4em] font-bold italic">
                {puppy.breed}
              </p>
            </div>
            <div className="text-right">
               <span className="block text-brand-terracotta font-serif text-2xl tracking-tighter">${puppy.price}</span>
               <span className="block text-[7px] text-gray-400 uppercase tracking-widest italic">Full Investment</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t border-brand-gold/10">
            <div className="flex flex-col">
                <span className="text-[7px] text-gray-400 uppercase tracking-widest">Gender</span>
                <span className="text-[10px] text-brand-dark font-bold uppercase tracking-tighter">{puppy.gender}</span>
            </div>
            <div className="w-px h-6 bg-brand-gold/20"></div>
            <div className="flex flex-col">
                <span className="text-[7px] text-gray-400 uppercase tracking-widest">Age</span>
                <span className="text-[10px] text-brand-dark font-bold uppercase tracking-tighter">{puppy.age}</span>
            </div>
          </div>
        </div>
        
        {/* Bouton "Couture" avec plus de poids */}
        <button 
          className="group/btn relative w-full h-14 bg-transparent border border-brand-dark overflow-hidden transition-all duration-500"
        >
          {/* Fond qui se remplit de Terracotta ou Dark selon ton envie */}
          <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-dark group-hover/btn:text-white transition-colors duration-500">
              Inquire Now
            </span>
            <div className="w-4 h-[1px] bg-brand-dark group-hover/btn:bg-brand-gold transition-colors duration-500"></div>
          </div>
        </button>
      </div>
    </div>
  ))}
</div>

      {/* --- MODAL --- */}
      {selectedPuppy && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-6">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={() => setSelectedPuppy(null)}></div>
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedPuppy(null)} className="absolute top-4 right-4 z-20 text-brand-dark hover:text-brand-gold text-2xl">✕</button>
            <div className="w-full md:w-1/2 h-[350px] md:h-auto">
              <img src={selectedPuppy.img} alt={selectedPuppy.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-brand-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-2">Signature Choice</span>
              <h2 className="text-5xl font-serif text-brand-dark italic mb-6">{selectedPuppy.name}</h2>
              <div className="grid grid-cols-2 gap-6 mb-8 border-y border-gray-100 py-6 font-sans text-brand-dark">
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Breed</p>
                  <p className="font-bold">{selectedPuppy.breed}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Price</p>
                  <p className="font-bold text-brand-terracotta text-lg">${selectedPuppy.price}</p>
                </div>
              </div>
              <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm italic">
                {selectedPuppy.description || "This elite companion has been raised in a loving environment with the highest standards of care and socialization."}
              </p>
              <button 
                onClick={() => handleWhatsAppBuy(selectedPuppy)}
                disabled={selectedPuppy.status !== 'Available'}
                className={`w-full py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700 shadow-xl ${
                  selectedPuppy.status === 'Available' 
                  ? 'bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedPuppy.status === 'Available' ? `Inquire to Adopt ${selectedPuppy.name}` : 'Reserved'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedPuppies;