import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Importation des composants
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import ScrollToTop from './components/ScrollToTop'; 

// 2. Importation des pages
import Home from './pages/Home';
import Puppies from './pages/Puppies'; 
import BreedDetail from './pages/BreedDetail'; 
import AboutUs from './pages/AboutUs'; 
import OurStory from './pages/OurStory'; 
import Contact from './pages/Contact';
import HealthWellness from './pages/HealthWellness'; 
import AKCBenefits from './pages/AKCBenefits';

// --- AJOUT DE LA PAGE DASHBOARD ---
import Dashboard from './pages/Dashboard'; // Assure-toi que le fichier est bien dans /pages

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen bg-white selection:bg-brand-terracotta selection:text-white flex flex-col">
        
        <Header /> 

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/puppies" element={<Puppies />} />

            {/* Route dynamique pour les races */}
            <Route path="/breed/:breedName" element={<BreedDetail />} />

            {/* Section Héritage */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/our-story" element={<OurStory />} />

            {/* Nouvelles routes Santé & AKC */}
            <Route path="/health" element={<HealthWellness />} />
            <Route path="/akc-benefits" element={<AKCBenefits />} />

            <Route path="/contact" element={<Contact />} />

            {/* --- NOUVELLE ROUTE DASHBOARD --- */}
            <Route path="/dashboard" element={<Dashboard />} />
            
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;