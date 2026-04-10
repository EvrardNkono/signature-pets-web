import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Importation des composants
import Header from './components/Header'; 
import Footer from './components/Footer'; // Import du nouveau footer avec WhatsApp

// 2. Importation des pages
import Home from './pages/Home';
import Puppies from './pages/Puppies'; 
import Breed from './pages/Breed'; 
import OurStory from './pages/OurStory'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white selection:bg-brand-gold selection:text-white flex flex-col">
        
        {/* Header global */}
        <Header /> 

        {/* Contenu principal : le flex-grow assure que le footer reste en bas */}
        <main className="flex-grow">
          <Routes>
            {/* Route pour la page d'accueil */}
            <Route path="/" element={<Home />} />
            
            {/* Route pour la liste des chiots */}
            <Route path="/puppies" element={<Puppies />} />

            {/* Route pour la page de la race */}
            <Route path="/breed" element={<Breed />} />

            {/* Route pour l'histoire de l'élevage */}
            <Route path="/our-story" element={<OurStory />} />
          </Routes>
        </main>

        {/* Le nouveau Footer avec design Premium et redirection WhatsApp */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;