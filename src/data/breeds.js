// Liste de noms premium pour Signature Pets
const names = [
  "Alpha", "Luna", "Rocky", "Bella", "Max", "Daisy", "Charlie", "Lola", 
  "Buddy", "Sophie", "Jack", "Ruby", "Oliver", "Zoe", "Leo", "Milo", 
  "Chloe", "Bear", "Mia", "Bentley", "Duke", "Penny", "Zeus", "Nala"
];

// Fonction pour générer 15 chiots avec images uniques et persistantes
const generatePuppies = (breedName, startId) => {
  return Array.from({ length: 15 }, (_, i) => {
    const id = startId + i;
    // On utilise un mot-clé spécifique pour l'API d'image afin d'améliorer la pertinence
    const searchKeyword = breedName.split('-').join(''); 
    
    return {
      id: id,
      name: names[id % names.length],
      price: (3200 + (Math.floor(Math.random() * 800))).toLocaleString(), // Prix entre 3200 et 4000
      gender: i % 2 === 0 ? 'Male' : 'Female',
      age: `${8 + (i % 4)} wks`, // Âge réaliste entre 8 et 12 semaines
      status: i === 0 ? 'Reserved' : (Math.random() > 0.85 ? 'Reserved' : 'Available'),
      // L'API loremflickr avec lock assure que le chien ID 105 sera toujours le même
      img: `https://loremflickr.com/800/1000/dog,${searchKeyword}/all?lock=${id}`,
      features: ["AKC Registered", "Vaccinated", "Health Guarantee", "Microchipped"]
    };
  });
};

export const breedData = {
  "golden-retriever": {
    title: "Golden Retriever",
    origin: "Scotland",
    temperament: "Intelligent, Kind, Trustworthy",
    description: "The quintessential family companion, known for its golden coat and heart of gold. Our Goldens are bred for temperament and grace.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000",
    puppies: generatePuppies("golden-retriever", 100)
  },
  "german-shepherd": {
    title: "German Shepherd",
    origin: "Germany",
    temperament: "Vigilant, Obedient, Brave",
    description: "A noble breed, combining physical strength with mental agility. The ultimate protector and loyal partner.",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=1000",
    puppies: generatePuppies("german-shepherd", 200)
  },
  "french-bulldog": {
    title: "French Bulldog",
    origin: "France",
    temperament: "Playful, Affectionate, Sociable",
    description: "The height of urban chic. A small companion with a massive personality, perfect for luxury city living.",
    image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=1000",
    puppies: generatePuppies("french-bulldog", 300)
  },
  "siberian-husky": {
    title: "Siberian Husky",
    origin: "Siberia",
    temperament: "Friendly, Energetic, Independent",
    description: "Wild beauty and piercing eyes. An elegant, free-spirited athlete for active families seeking adventure.",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=1000",
    puppies: generatePuppies("siberian-husky", 400)
  },
  "samoyed": {
    title: "Samoyed",
    origin: "Russia",
    temperament: "Gentle, Alert, Social",
    description: "The 'smiling dog'. A pure white masterpiece of nature, known for its stunning coat and gentle spirit.",
    image: "https://images.unsplash.com/photo-1529429617329-c469a04f7247?q=80&w=1000",
    puppies: generatePuppies("samoyed", 500)
  },
  "dachshund": {
    title: "Dachshund",
    origin: "Germany",
    temperament: "Brave, Lively, Clever",
    description: "An icon of character. Tiny size, but an immense heart. Brave explorers with a loving nature.",
    image: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?q=80&w=1000",
    puppies: generatePuppies("dachshund", 600)
  },
  "shiba-inu": {
    title: "Shiba Inu",
    origin: "Japan",
    temperament: "Faithful, Independent, Keen",
    description: "The treasure of Japan. Proud, clean, and effortlessly elegant, mimicking the minimal luxury lifestyle.",
    image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1000",
    puppies: generatePuppies("shiba-inu", 700)
  }
};