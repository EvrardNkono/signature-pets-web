import React, { useState, useMemo } from 'react';
import { reviews, avatarColors } from './reviewsData';

const ReviewsPage = () => {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  // Filtrage intelligent corrigé pour l'exclusivité des étoiles
  const filteredReviews = useMemo(() => {
    if (filter === 'all') return reviews;
    
    // Filtrage par étoiles (strict)
    if (filter === '5' || filter === '4') {
      return reviews.filter(r => r.stars === Number(filter));
    }
    
    // Filtrage par race
    return reviews.filter(r => r.breed === filter);
  }, [filter]);

  const initials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Jost']">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Image de fond : Remplacement par un lien plus robuste via Source Unsplash */}
        <img 
          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop" 
          alt="Luxury Canine Hero"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        
        {/* Overlay progressif pour fondre l'image dans le noir du site */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]"></div>
        
        {/* Contenu du Hero */}
        <header className="relative z-10 text-center px-6 mt-16">
          <div className="inline-block px-4 py-1 border border-[#C9A84C]/30 mb-6 backdrop-blur-sm">
             <span className="text-[#C9A84C] text-[10px] tracking-[0.6em] uppercase font-bold opacity-90">
              Verified Excellence
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-6xl md:text-8xl font-light leading-tight tracking-tighter text-white">
            Our Happy <span className="text-[#B5522A] italic font-extralight">Families</span>
          </h1>
          <div className="w-24 h-[1px] bg-[#C9A84C]/40 mx-auto mt-8 mb-8"></div>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto tracking-wide font-light italic leading-loose">
            "We don't just breed dogs; we build lifelong bonds. <br/> 
            Explore 50+ stories of love and companionship across the United States."
          </p>
        </header>
      </div>


      {/* MAIN CONTENT */}
      <div className="py-20 px-6 md:px-10">
        
        {/* STATS SUMMARY BOX */}
        <div className="max-w-5xl mx-auto bg-white/[0.02] border border-white/10 backdrop-blur-xl p-8 md:p-12 mb-20 flex flex-wrap justify-around items-center gap-8 shadow-2xl relative z-20 -mt-24 rounded-sm">
          <div className="text-center">
            <div className="font-['Cormorant_Garamond'] text-8xl text-[#C9A84C] leading-none mb-2">4.9</div>
            <div className="flex justify-center text-[#C9A84C] text-xl mb-3 tracking-[0.2em]">★★★★★</div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Client Satisfaction</div>
          </div>

          {/* Progress Bars */}
          <div className="flex flex-col gap-3 w-full md:w-64">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <span className="w-8">{star} ★</span>
                <div className="flex-1 h-[1px] bg-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-[#C9A84C] transition-all duration-1000" 
                    style={{ width: star === 5 ? '90%' : star === 4 ? '10%' : '0%' }}
                  ></div>
                </div>
                <span className="w-6 opacity-40">{star === 5 ? '45' : star === 4 ? '5' : '0'}</span>
              </div>
            ))}
          </div>

          <div className="text-center md:text-right border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
            <div className="text-[10px] text-[#C9A84C] tracking-[0.4em] uppercase mb-3 font-black">Available Reviews</div>
            <div className="font-['Cormorant_Garamond'] text-2xl leading-relaxed text-white/80 italic">
              Golden Retriever · Cavapoo <br /> Frenchie · Goldendoodle
            </div>
          </div>
        </div>

        {/* FILTERS SECTION */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-5xl mx-auto">
          {['all', 'Golden Retriever', 'Cavapoo', 'French Bulldog', 'Goldendoodle', '5', '4'].map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setVisibleCount(12); }}
              className={`px-8 py-3 text-[10px] uppercase tracking-[0.2em] border transition-all duration-500 font-bold rounded-sm ${
                filter === f 
                ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A]' 
                : 'border-white/10 text-gray-500 hover:border-[#C9A84C] hover:text-[#C9A84C]'
              }`}
            >
              {f === 'all' ? 'All Stories' : f === '5' || f === '4' ? `${f} Stars Only` : f}
            </button>
          ))}
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredReviews.length > 0 ? (
            filteredReviews.slice(0, visibleCount).map((review, index) => {
              const color = avatarColors[index % avatarColors.length];
              return (
                <div 
                  key={review.id} 
                  className="group bg-[#111111]/40 border border-white/5 p-10 hover:border-[#C9A84C]/40 transition-all duration-700 flex flex-col relative overflow-hidden"
                >
                  {/* Subtle hover effect background */}
                  <div className="absolute inset-0 bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center font-['Cormorant_Garamond'] text-xl font-bold"
                          style={{ backgroundColor: color.bg, color: color.color }}
                        >
                          {initials(review.name)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold tracking-wide text-white/90 group-hover:text-white transition-colors">{review.name}</h3>
                          <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1">{review.loc}</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-gray-600 uppercase tracking-widest">{review.date}</span>
                    </div>

                    <div className="flex gap-1 mb-6 text-[12px]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.stars ? "text-[#C9A84C]" : "text-gray-800"}>★</span>
                      ))}
                    </div>

                    <div className="inline-block border-l-2 border-[#C9A84C] pl-4 mb-6">
                       <span className="text-[#C9A84C] text-[9px] uppercase tracking-[0.3em] font-bold">
                        {review.breed}
                       </span>
                    </div>

                    <p className="font-['Cormorant_Garamond'] italic text-gray-400 leading-[1.8] text-lg mb-10 min-h-[100px]">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
                      <span className="text-[9px] text-green-500/80 uppercase tracking-[0.4em] font-black">Verified US Placement</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 opacity-40 italic">
              No reviews found for this selection.
            </div>
          )}
        </div>

        {/* LOAD MORE BUTTON */}
        {visibleCount < filteredReviews.length && (
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="mt-24 mx-auto block px-16 py-6 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] uppercase tracking-[0.5em] font-black hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-700 shadow-2xl"
          >
            Load More Stories
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;