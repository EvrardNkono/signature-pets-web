import React, { useState } from 'react';

const Puppies = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const puppyList = [
    { id: 1, name: 'Cooper', breed: 'Golden Retriever', price: '3,200', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Luna', breed: 'Labrador Retriever', price: '3,500', gender: 'Female', age: '9 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Charlie', breed: 'Yellow Lab', price: '2,900', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Bella', breed: 'Jack Russell', price: '3,400', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800' },
   { id: 5, name: 'Milo', breed: 'Cavapoo', price: '3,100', gender: 'Male', age: '12 wks', status: 'Coming Soon', img: 'images/milo.jpg' },
    { id: 6, name: 'Daisy', breed: 'English Springer', price: '3,600', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800' },
    { id: 7, name: 'Teddy', breed: 'German Shepherd', price: '3,000', gender: 'Male', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800' },
    { id: 8, name: 'Coco', breed: 'Beagle Mix', price: '3,300', gender: 'Female', age: '10 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800' },
    { id: 9, name: 'Oliver', breed: 'Pug', price: '3,200', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af?auto=format&fit=crop&q=80&w=800' },
    { id: 10, name: 'Ruby', breed: 'Samoyed', price: '3,700', gender: 'Female', age: '11 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800' },
    { id: 11, name: 'Leo', breed: 'Beagle', price: '2,800', gender: 'Male', age: '12 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800' },
    { id: 12, name: 'Rosie', breed: 'Mixed Breed', price: '3,500', gender: 'Female', age: '9 wks', status: 'Available', img: 'images/rosie.jpg' },
    { id: 13, name: 'Archie', breed: 'French Bulldog', price: '3,150', gender: 'Male', age: '8 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800' },
    { id: 14, name: 'Lola', breed: 'Golden Retriever Mix', price: '3,450', gender: 'Female', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800' },
    { id: 15, name: 'Bear', breed: 'Border Collie', price: '3,300', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800' },
    { id: 16, name: 'Sophie', breed: 'Cocker Spaniel', price: '3,800', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=800' },
    { id: 17, name: 'Finn', breed: 'Labrador Mix', price: '3,000', gender: 'Male', age: '10 wks', status: 'Coming Soon', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800' },
    { id: 18, name: 'Mia', breed: 'Australian Shepherd', price: '3,250', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1516222338250-863216ce01ea?auto=format&fit=crop&q=80&w=800' },
    { id: 19, name: 'Murphy', breed: 'Basset Hound', price: '3,100', gender: 'Male', age: '11 wks', status: 'Available', img: 'images/murphy.jpg' },
    { id: 20, name: 'Willow', breed: 'White Terrier', price: '3,600', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800' },
    // 10 CHIOTS SUPPLÉMENTAIRES
    { id: 21, name: 'Duke', breed: 'Boxer', price: '2,700', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?auto=format&fit=crop&q=80&w=800' },
    { id: 22, name: 'Zoe', breed: 'Dachshund', price: '3,400', gender: 'Female', age: '8 wks', status: 'Available', img: 'images/zoe.jpg' },
    { id: 23, name: 'Rex', breed: 'Doberman', price: '2,950', gender: 'Male', age: '9 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800' },
    { id: 24, name: 'Nala', breed: 'Siberian Husky', price: '3,200', gender: 'Female', age: '12 wks', status: 'Available', img: 'images/nala.jpg' },
    { id: 25, name: 'Buster', breed: 'Pointer', price: '3,100', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800' },
    
    { id: 27, name: 'Gus', breed: 'Bulldog', price: '2,800', gender: 'Male', age: '11 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&q=80&w=800' },
    { id: 28, name: 'Peaches', breed: 'Pomeranian', price: '3,300', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&q=80&w=800' },
    { id: 29, name: 'Simba', breed: 'Shiba Inu', price: '3,050', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=800' },
    { id: 30, name: 'Lady', breed: 'Cocker Spaniel', price: '3,600', gender: 'Female', age: '8 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* --- 1. Hero Banner --- */}
      <section className="relative h-[45vh] min-h-[400px] bg-brand-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-6 mt-16">
          <span className="text-brand-gold tracking-[0.6em] uppercase text-[10px] md:text-[12px] font-bold mb-4 block animate-pulse">
            Signature Standard
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white italic mb-6">
            Our Available <span className="text-brand-gold font-sans not-italic font-light">Puppies</span>
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
      </section>

      {/* --- 2. Filtres --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex justify-center gap-8 md:gap-12">
        {['All', 'Male', 'Female'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 transition-all duration-300 ${
              activeFilter === filter 
              ? 'text-brand-gold border-b-2 border-brand-gold' 
              : 'text-gray-400 hover:text-brand-dark'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* --- 3. Grille --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {puppyList
          .filter(p => activeFilter === 'All' || p.gender === activeFilter)
          .map((puppy) => (
            <div key={puppy.id} className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm shadow-sm">
                <img 
                  src={puppy.img} 
                  alt={puppy.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className={`absolute top-6 left-6 px-4 py-1 text-[8px] uppercase tracking-widest font-bold text-white z-10 ${
                  puppy.status === 'Available' 
                  ? 'bg-brand-gold shadow-lg' 
                  : puppy.status === 'Reserved' ? 'bg-brand-terracotta' : 'bg-brand-dark/60 backdrop-blur-md'
                }`}>
                  {puppy.status}
                </div>
                <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="mt-8 text-center px-4">
                <h3 className="text-2xl font-serif text-brand-dark group-hover:text-brand-gold transition-colors duration-300">
                  {puppy.name}
                </h3>
                <p className="text-gray-400 text-[9px] uppercase tracking-[0.4em] mt-2 mb-6">
                  {puppy.gender} • {puppy.breed} • {puppy.age}
                </p>
                <div className="flex flex-col items-center gap-5">
                  <span className="text-brand-dark font-serif text-xl tracking-tight">
                    ${puppy.price}
                  </span>
                  <button className="w-full max-w-[220px] py-4 border border-brand-dark/20 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-500 hover:border-brand-dark">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Puppies;