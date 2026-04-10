import React from 'react';

const FeaturedPuppies = () => {
  const puppies = [
    { id: 1, name: 'Cooper', breed: 'Cavapoo', price: '$3,200', gender: 'Male', age: '8 wks', img: 'https://images.unsplash.com/photo-1591768793355-74d7af236c1f?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Luna', breed: 'Cavapoo', price: '$3,500', gender: 'Female', age: '9 wks', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Charlie', breed: 'Cavapoo', price: '$2,900', gender: 'Male', age: '10 wks', img: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=1000&auto=format&fit=crop' },
  ];

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto bg-white">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-serif text-brand-dark mb-4 italic text-brand-terracotta">Spotlight Puppies</h2>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-semibold">Exquisite selections for your home</p>
        </div>
        <button className="text-brand-dark font-bold text-xs border-b-2 border-brand-gold pb-1 tracking-widest hover:text-brand-terracotta transition-colors">
          VIEW ALL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {puppies.map((puppy) => (
          <div key={puppy.id} className="group">
            <div className="relative overflow-hidden aspect-[3/4] mb-6 shadow-xl">
              <img src={puppy.img} alt={puppy.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-sm text-brand-gold px-3 py-1 text-[9px] font-bold uppercase tracking-widest">Available</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif text-brand-dark">{puppy.name}</h3>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">{puppy.breed} • {puppy.gender}</p>
              </div>
              <span className="text-brand-terracotta font-bold text-lg">{puppy.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPuppies;