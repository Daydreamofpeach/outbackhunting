import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ParallaxNavbar from './components/ParallaxNavbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import PackageCustomization from './pages/PackageCustomization';
import Animals from './pages/Animals';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Parallax from './pages/Parallax';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <HelmetProvider>
      <SEO 
        title="Outback Hunting New Zealand"
        description="Professional hunting guides offering guided hunting tours and packages in New Zealand's South Island wilderness areas. Specializing in Red Deer, Himalayan Tahr, and Chamois hunting."
        keywords="New Zealand hunting, guided hunting tours, Red Deer hunting, Himalayan Tahr hunting, Chamois hunting, South Island hunting, wilderness hunting, hunting packages, hunting guides, New Zealand hunting trips"
        url="/"
      />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : 'bg-gray-50'}`} style={darkMode ? { backgroundColor: '#0f172a' } : {}}>
          <ParallaxNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Parallax darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
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