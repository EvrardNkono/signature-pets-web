import React, { useState } from 'react';

const Puppies = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPuppy, setSelectedPuppy] = useState(null);

  const phoneNumber = "13375671208";

  const handleWhatsAppBuy = (puppy) => {
    const message = `Hello Signature Pets! I've reviewed the details for ${puppy.name} (${puppy.breed}) and I'm ready to proceed with the adoption. Is ${puppy.gender} still available for $${puppy.price}?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const puppyList = [
    { 
      id: 1, name: 'Cooper', breed: 'Golden Retriever', price: '3,200', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
      description: "Cooper is the quintessential family companion. Brave, kind, and incredibly intelligent, he is already showing great progress in basic potty training.",
      features: ["AKC Registered", "Vaccinated", "Health Guarantee"]
    },
    { 
      id: 2, name: 'Luna', breed: 'Labrador Retriever', price: '3,500', gender: 'Female', age: '9 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
      description: "Luna is a bundle of joy with a shiny coat and a heart of gold. She loves water and playing fetch in the garden.",
      features: ["Microchipped", "Socialized with children", "Dewormed"]
    },
    { 
      id: 3, name: 'Charlie', breed: 'Yellow Lab', price: '2,900', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=800',
      description: "Charlie is a laid-back gentleman. He enjoys long naps and gentle play. He's perfect for a family looking for a calmer puppy.",
      features: ["Champion bloodline", "Vet checked", "First shots included"]
    },
    { 
      id: 4, name: 'Bella', breed: 'Jack Russell', price: '3,400', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
      description: "Bella is small but mighty! Her energy is boundless and she has a very keen intelligence that makes her easy to train for tricks.",
      features: ["High energy", "Agility potential", "Travel ready"]
    },
    { 
      id: 5, name: 'Milo', breed: 'Cavapoo', price: '3,100', gender: 'Male', age: '12 wks', status: 'Coming Soon', img: 'images/milo.jpg',
      description: "Milo is a hypoallergenic sweetheart. He's very affectionate and thrives on human companionship. A perfect lap dog.",
      features: ["Non-shedding coat", "Apartment friendly", "Calm temperament"]
    },
    { 
      id: 6, name: 'Daisy', breed: 'English Springer', price: '3,600', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
      description: "Daisy is an elegant pup with beautiful markings. She is highly active and would love a home with a big backyard to explore.",
      features: ["Pedigree papers", "Well-socialized", "Healthy joints"]
    },
    { 
      id: 7, name: 'Teddy', breed: 'German Shepherd', price: '3,000', gender: 'Male', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800',
      description: "Teddy is a focused and loyal young male. He has a strong protective instinct and would excel in professional obedience training.",
      features: ["High intelligence", "Working line", "Vaccinated"]
    },
    { 
      id: 8, name: 'Coco', breed: 'Beagle Mix', price: '3,300', gender: 'Female', age: '10 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
      description: "Coco is a social butterfly. She gets along with everyone and has a very melodic howl that will make you smile every day.",
      features: ["Great with other dogs", "Curious nature", "Healthy weight"]
    },
    { 
      id: 9, name: 'Oliver', breed: 'Pug', price: '3,200', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?auto=format&fit=crop&q=80&w=800',
      description: "Oliver is the life of the party. With his expressive face and playful spirit, there is never a dull moment when he is around.",
      features: ["Playful spirit", "Apartment ready", "Vet cleared"]
    },
    { 
      id: 10, name: 'Ruby', breed: 'Samoyed', price: '3,700', gender: 'Female', age: '11 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
      description: "Ruby is a stunning white cloud. She is gentle, kind, and loves the cold weather. She is truly a 'smiling' Samoyed.",
      features: ["Hypoallergenic", "Elite lineage", "Beautiful coat"]
    },
    { 
      id: 11, name: 'Leo', breed: 'Beagle', price: '2,800', gender: 'Male', age: '12 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
      description: "Leo is a scent-driven explorer. He's very independent but loves a good snuggle session after a day of 'hunting' in the grass.",
      features: ["Active lifestyle", "Healthy heart", "Ready to home"]
    },
    { 
      id: 12, name: 'Rosie', breed: 'Mixed Breed', price: '3,500', gender: 'Female', age: '9 wks', status: 'Available', img: 'images/rosie.jpg',
      description: "Rosie is a unique mix with a wonderful personality. She is incredibly adaptable and learns new commands in record time.",
      features: ["Smart learner", "Unique look", "Fully vaccinated"]
    },
    { 
      id: 13, name: 'Archie', breed: 'French Bulldog', price: '3,150', gender: 'Male', age: '8 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800',
      description: "Archie is a sturdy little companion. He's very chill and loves to just hang out on the sofa with his favorite humans.",
      features: ["Low exercise needs", "Great for city living", "Microchipped"]
    },
    { 
      id: 14, name: 'Lola', breed: 'Golden Retriever Mix', price: '3,450', gender: 'Female', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
      description: "Lola is as sweet as honey. She is very intuitive and seems to know exactly when you need a little extra puppy love.",
      features: ["Family friendly", "Soft coat", "Health guarantee"]
    },
    { 
      id: 15, name: 'Bear', breed: 'Border Collie', price: '3,300', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800',
      description: "Bear is a genius-level pup. He needs a job to do and a family that will keep his mind active with puzzles and training.",
      features: ["Work-driven", "Agility star", "Extremely smart"]
    },
    { 
      id: 16, name: 'Sophie', breed: 'Cocker Spaniel', price: '3,800', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=800',
      description: "Sophie has the softest ears and the kindest eyes. She is a very soulful puppy who loves to follow her owner everywhere.",
      features: ["Show quality", "Gentle nature", "First vet check done"]
    },
    { 
      id: 17, name: 'Finn', breed: 'Labrador Mix', price: '3,000', gender: 'Male', age: '10 wks', status: 'Coming Soon', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
      description: "Finn is a sturdy boy who loves the outdoors. He's very brave and was the first of his litter to explore the entire yard.",
      features: ["Outdoor companion", "Active", "Health certs pending"]
    },
    { 
      id: 18, name: 'Mia', breed: 'Australian Shepherd', price: '3,250', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1516222338250-863216ce01ea?auto=format&fit=crop&q=80&w=800',
      description: "Mia is a visual masterpiece with her striking eyes. She is highly observant and very connected to her human handlers.",
      features: ["Herding instinct", "Smart & active", "Bred for health"]
    },
    { 
      id: 19, name: 'Murphy', breed: 'Basset Hound', price: '3,100', gender: 'Male', age: '11 wks', status: 'Available', img: 'images/murphy.jpg',
      description: "Murphy is a lovable 'low-rider'. His long ears and sad eyes are impossible to resist, but he's actually quite a happy guy.",
      features: ["Calm energy", "Classic Basset look", "Socialized"]
    },
    { 
      id: 20, name: 'Willow', breed: 'White Terrier', price: '3,600', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800',
      description: "Willow is a feisty little terrier. She's got a big personality in a small body and is very protective of her favorite toys.",
      features: ["Big personality", "Non-shedding", "Vet checked"]
    },
    { 
      id: 21, name: 'Duke', breed: 'Boxer', price: '2,700', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?auto=format&fit=crop&q=80&w=800',
      description: "Duke is a playful and goofy Boxer. He's very athletic and will make a great jogging partner once he's a bit older.",
      features: ["Loyal guard dog", "Athletic", "Friendly"]
    },
    { 
      id: 22, name: 'Zoe', breed: 'Dachshund', price: '3,400', gender: 'Female', age: '8 wks', status: 'Available', img: 'images/zoe.jpg',
      description: "Zoe is a darling 'wiener dog' with a huge heart. She's very brave and loves to burrow into blankets for long naps.",
      features: ["Brave nature", "Classic Dachshund", "Healthy spine"]
    },
    { 
      id: 23, name: 'Rex', breed: 'Doberman', price: '2,950', gender: 'Male', age: '9 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800',
      description: "Rex is an elegant and powerful Doberman pup. He's very sensitive and forms a very deep bond with his primary owner.",
      features: ["Protective", "Smart learner", "Bred for stability"]
    },
    { 
      id: 24, name: 'Nala', breed: 'Siberian Husky', price: '3,200', gender: 'Female', age: '12 wks', status: 'Available', img: 'images/nala.jpg',
      description: "Nala is a vocal and energetic girl. She needs a family that loves long walks and doesn't mind a bit of husky 'singing'.",
      features: ["High energy", "Stunning eyes", "Socialized"]
    },
    { 
      id: 25, name: 'Buster', breed: 'Pointer', price: '3,100', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
      description: "Buster is a refined and capable Pointer. He's very alert and is already pointing at birds in the garden.",
      features: ["Natural instinct", "Athletic", "Vet cleared"]
    },
    { 
      id: 27, name: 'Gus', breed: 'Bulldog', price: '2,800', gender: 'Male', age: '11 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&q=80&w=800',
      description: "Gus is a chunky, lovable bulldog. He is very determined and has the most charming snort you've ever heard.",
      features: ["Classic Bulldog", "Chill energy", "Family ready"]
    },
    { 
      id: 28, name: 'Peaches', breed: 'Pomeranian', price: '3,300', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&q=80&w=800',
      description: "Peaches is a tiny fluff-ball with a massive personality. She believes she is the queen of the house and acts accordingly.",
      features: ["Elite fluff", "Tiny size", "Playful spirit"]
    },
    { 
      id: 29, name: 'Simba', breed: 'Shiba Inu', price: '3,050', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=800',
      description: "Simba is a proud and independent Shiba. He is very clean and almost 'cat-like' in his grooming habits.",
      features: ["Independent", "Very clean", "Stunning coat"]
    },
    { 
      id: 30, name: 'Lady', breed: 'Cocker Spaniel', price: '3,600', gender: 'Female', age: '8 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800',
      description: "Lady is as elegant as her name suggests. She is very soft-spoken and gentle with everyone she meets.",
      features: ["Show bloodline", "Gentle", "Health checked"]
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* --- 1. Hero & Filters --- */}
      <section className="relative h-[45vh] bg-brand-dark flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center mt-16">
          <h1 className="text-4xl md:text-6xl font-serif text-white italic">Available <span className="text-brand-gold font-sans not-italic font-light">Companions</span></h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-6"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 flex justify-center gap-8">
        {['All', 'Male', 'Female'].map((f) => (
          <button key={f} onClick={() => setActiveFilter(f)} className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 ${activeFilter === f ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>{f}</button>
        ))}
      </div>

      {/* --- 2. Grid Section --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {puppyList.filter(p => activeFilter === 'All' || p.gender === activeFilter).map((puppy) => (
          <div key={puppy.id} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm">
              <img src={puppy.img} alt={puppy.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-serif text-brand-dark">{puppy.name}</h3>
              <p className="text-gray-400 text-[9px] uppercase tracking-[0.4em] mt-2 mb-6">{puppy.breed} • ${puppy.price}</p>
              <button 
                onClick={() => setSelectedPuppy(puppy)}
                className="w-full max-w-[200px] py-4 border border-brand-dark/20 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- 3. MODAL SECTION --- */}
      {selectedPuppy && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-6">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={() => setSelectedPuppy(null)}></div>
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedPuppy(null)} className="absolute top-4 right-4 z-20 text-brand-dark hover:text-brand-gold text-2xl">✕</button>
            <div className="w-full md:w-1/2 h-[400px] md:h-auto">
              <img src={selectedPuppy.img} alt={selectedPuppy.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-brand-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-2">Signature Elite Pet</span>
              <h2 className="text-5xl font-serif text-brand-dark italic mb-6">{selectedPuppy.name}</h2>
              <div className="grid grid-cols-2 gap-6 mb-8 border-y border-gray-100 py-6">
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Breed</p>
                  <p className="font-bold text-brand-dark">{selectedPuppy.breed}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Gender</p>
                  <p className="font-bold text-brand-dark">{selectedPuppy.gender}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Age</p>
                  <p className="font-bold text-brand-dark">{selectedPuppy.age}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-400 tracking-widest mb-1">Price</p>
                  <p className="font-bold text-brand-gold text-xl">${selectedPuppy.price}</p>
                </div>
              </div>
              <p className="text-gray-500 font-light leading-relaxed mb-8 italic">
                {selectedPuppy.description || "This elite companion has been raised in a loving environment with the highest standards of care and socialization."}
              </p>
              <div className="space-y-3 mb-10">
                {selectedPuppy.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-brand-dark italic">
                        <span className="w-4 h-[1px] bg-brand-gold"></span> {f}
                    </div>
                ))}
              </div>
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
    </div>
  );
};

export default Puppies;