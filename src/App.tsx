import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import PackageCustomization from './pages/PackageCustomization';
import Animals from './pages/Animals';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <HelmetProvider>
      <SEO 
        title="Outback Hunting New Zealand"
        description="Professional hunting guides offering guided hunting tours and packages in New Zealand's South Island wilderness areas. Specializing in Red Deer, Himalayan Tahr, Chamois, Whitetail, Fallow Deer, and Arapawa Ram hunting."
        keywords="New Zealand hunting, guided hunting tours, Red Deer hunting, Himalayan Tahr hunting, Chamois hunting, Whitetail hunting, Fallow Deer hunting, Arapawa Ram hunting, South Island hunting, wilderness hunting, hunting packages, hunting guides, New Zealand hunting trips"
        url="/"
      />
      <Router>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} />} />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route path="/contact" element={<Contact darkMode={darkMode} />} />
              <Route path="/packages" element={<Pricing darkMode={darkMode} />} />
              <Route path="/customize" element={<PackageCustomization darkMode={darkMode} />} />
              <Route path="/animals" element={<Animals darkMode={darkMode} />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;