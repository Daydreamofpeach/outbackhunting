import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Packages from './pages/Packages';
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
      <Router>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Header darkMode={darkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/about" element={<About darkMode={darkMode} />} />
            <Route path="/contact" element={<Contact darkMode={darkMode} />} />
            <Route path="/packages" element={<Packages darkMode={darkMode} />} />
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