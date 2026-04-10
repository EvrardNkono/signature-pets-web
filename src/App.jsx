import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Importation des composants
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import ScrollToTop from './components/ScrollToTop'; // Ajout du composant ScrollToTop

// 2. Importation des pages
import Home from './pages/Home';
import Puppies from './pages/Puppies'; 
import Breed from './pages/Breed'; 
import OurStory from './pages/OurStory'; 
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* Le composant ScrollToTop doit être à l'intérieur du Router 
          mais à l'extérieur des Routes pour surveiller chaque changement d'URL.
      */}
      <ScrollToTop />

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

             {/* Route pour le contact */}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Le nouveau Footer avec design Premium et redirection WhatsApp */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;