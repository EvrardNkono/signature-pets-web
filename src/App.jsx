import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import Dashboard from './pages/Dashboard';
import ReviewsPage from './pages/ReviewsPage'; // <-- Import de ta nouvelle page

// Composant interne pour gérer l'affichage conditionnel
function LayoutWrapper({ children }) {
  const location = useLocation();
  
  // On définit si on est sur le dashboard
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-white selection:bg-brand-terracotta selection:text-white flex flex-col">
      {/* On n'affiche le Header que si ce n'est PAS le dashboard */}
      {!isDashboard && <Header />} 

      <main className="flex-grow">
        {children}
      </main>

      {/* On n'affiche le Footer que si ce n'est PAS le dashboard */}
      {!isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/puppies" element={<Puppies />} />

          {/* Route dynamique pour les races */}
          <Route path="/breed/:breedName" element={<BreedDetail />} />

          {/* Route pour les témoignages clients */}
          <Route path="/reviews" element={<ReviewsPage />} />

          {/* Section Héritage */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/our-story" element={<OurStory />} />

          {/* Nouvelles routes Santé & AKC */}
          <Route path="/health" element={<HealthWellness />} />
          <Route path="/akc-benefits" element={<AKCBenefits />} />

          <Route path="/contact" element={<Contact />} />

          {/* Route Dashboard (sans Header/Footer) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;