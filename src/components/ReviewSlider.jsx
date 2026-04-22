import React from 'react';

const reviews = [
  {
    id: 1,
    name: "Helena Dubois",
    role: "Cavapoo Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "An exceptional experience. Our little companion is in perfect health and so well socialized. Thank you Signature Pets!",
    stars: 5
  },
  {
    id: 2,
    name: "Mark Anthony",
    role: "Happy Client",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "The quality standard is truly there. You can feel the love and professionalism in every detail of the adoption process.",
    stars: 5
  },
  {
    id: 3,
    name: "Sophia Laurent",
    role: "Family Member",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The post-adoption support is incredible. We never feel alone. I highly recommend them to anyone seeking excellence.",
    stars: 5
  }
];

// Internal component for the Star SVG (No install needed)
const StarIcon = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    className="fill-brand-gold text-brand-gold"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 1.7L14.75 8.75H22.25L16.25 13.2L18.75 20.25L12 15.75L5.25 20.25L7.75 13.2L1.75 8.75H9.25L12 1.7Z" />
  </svg>
);

const ReviewSlider = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {reviews.map((review) => (
        <div key={review.id} className="flex flex-col items-center text-center group">
          
          {/* Profile Photo with Gold border on hover */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-gold transition-all duration-500">
              <img 
                src={review.image} 
                alt={review.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex space-x-1 mb-4">
            {[...Array(review.stars)].map((_, i) => (
              <div key={i} className="transition-transform group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }}>
                <StarIcon />
              </div>
            ))}
          </div>

          {/* Review Text */}
          <p className="text-gray-500 text-sm italic leading-relaxed mb-6 font-sans px-2">
            "{review.text}"
          </p>

          {/* Name and Role */}
          <div>
            <h4 className="text-brand-dark font-bold text-xs uppercase tracking-widest mb-1">
              {review.name}
            </h4>
            <span className="text-brand-terracotta text-[10px] font-medium uppercase tracking-tighter">
              {review.role}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSlider;