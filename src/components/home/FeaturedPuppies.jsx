import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedPuppies = () => {
  const puppies = [
    { id: 5, name: 'Milo', breed: 'Cavapoo', price: '3,100', gender: 'Male', age: '12 wks', status: 'Coming Soon', img: 'images/milo.jpg' },
    { id: 6, name: 'Daisy', breed: 'English Springer', price: '3,600', gender: 'Female', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800' },
    { id: 7, name: 'Teddy', breed: 'German Shepherd', price: '3,000', gender: 'Male', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800' },
    { id: 8, name: 'Coco', breed: 'Beagle Mix', price: '3,300', gender: 'Female', age: '10 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800' },
   
    { id: 12, name: 'Rosie', breed: 'Mixed Breed', price: '3,500', gender: 'Female', age: '9 wks', status: 'Available', img: 'images/rosie.jpg' },
    { id: 13, name: 'Archie', breed: 'French Bulldog', price: '3,150', gender: 'Male', age: '8 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=800' },
    { id: 14, name: 'Lola', breed: 'Golden Retriever Mix', price: '3,450', gender: 'Female', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800' },
    { id: 15, name: 'Bear', breed: 'Border Collie', price: '3,300', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800' },
 
    { id: 19, name: 'Murphy', breed: 'Basset Hound', price: '3,100', gender: 'Male', age: '11 wks', status: 'Available', img: 'images/murphy.jpg' },
    { id: 20, name: 'Willow', breed: 'White Terrier', price: '3,600', gender: 'Female', age: '9 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800' },
    // 10 CHIOTS SUPPLÉMENTAIRES
    { id: 21, name: 'Duke', breed: 'Boxer', price: '2,700', gender: 'Male', age: '10 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?auto=format&fit=crop&q=80&w=800' },
    { id: 22, name: 'Zoe', breed: 'Dachshund', price: '3,400', gender: 'Female', age: '8 wks', status: 'Available', img: 'images/zoe.jpg' },
    { id: 23, name: 'Rex', breed: 'Doberman', price: '2,950', gender: 'Male', age: '9 wks', status: 'Reserved', img: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800' },
    { id: 24, name: 'Nala', breed: 'Siberian Husky', price: '3,200', gender: 'Female', age: '12 wks', status: 'Available', img: 'images/nala.jpg' },
    { id: 25, name: 'Buster', breed: 'Pointer', price: '3,100', gender: 'Male', age: '8 wks', status: 'Available', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800' },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {puppies.map((puppy) => (
          <div key={puppy.id} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[4/5] mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-gray-100">
              <img 
                src={puppy.img} 
                alt={puppy.name} 
                loading="lazy"
                className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
              />
              
              <div className={`absolute top-6 left-6 px-4 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] backdrop-blur-md shadow-lg z-20
                ${puppy.status === 'Available' ? 'bg-brand-dark/90 text-brand-gold' : 
                  puppy.status === 'Reserved' ? 'bg-brand-terracotta text-white' : 
                  'bg-gray-500/90 text-white'}`}>
                {puppy.status}
              </div>

              <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-3xl font-serif text-brand-dark group-hover:text-brand-terracotta transition-colors duration-500">
                  {puppy.name}
                </h3>
                <span className="text-brand-terracotta font-serif italic text-xl">{puppy.price}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-bold">
                  {puppy.breed}
                </p>
                <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
                <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-bold">
                  {puppy.gender} • {puppy.age}
                </p>
              </div>

              <div className="pt-4">
                <button className="w-full py-4 border border-gray-100 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all duration-500">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPuppies;