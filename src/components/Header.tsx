import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import NavDropdown from './NavDropdown';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (path: string) => {
    const [page, section] = path.split('#');
    
    if (section) {
      // If we're already on the correct page, just scroll to the section
      if (location.pathname === page) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // Navigate to the page first, then scroll to section
        navigate(path);
        // The scroll will happen after the page loads
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    } else {
      // Regular navigation for pages without sections
      navigate(path);
    }
    
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scrolling to sections when page loads with hash
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elementId = hash.substring(1); // Remove the # symbol
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);

  const navItems = [
    { 
      title: 'Hunting',
      links: [
        { name: 'Pricing', path: '/pricing' },
        { name: 'Hunting Packages', path: '/pricing#packages' },
        { name: 'Day Rates', path: '/pricing#day-rates' },
        { name: 'What\'s Included', path: '/pricing#included' },
        { name: 'Customize Package', path: '/customize' },
        { name: 'Animals', path: '/animals' },
        { name: 'Photo Galleries', path: '/animals#galleries' },
        { name: 'Hunting Info', path: '/animals#information' },
      ]
    },
    { 
      title: 'About Us',
      links: [
        { name: 'Our Story', path: '/about' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'Our Locations', path: '/about#locations' },
        { name: 'Our Services', path: '/about#services' },
      ]
    },
    { 
      title: 'Contact',
      links: [
        { name: 'Get in Touch', path: '/contact#booking' },
        { name: 'Book a Trip', path: '/contact' },
      ]
    },
  ];

  return (
    <header 
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled 
          ? (darkMode ? 'bg-gray-900/95 backdrop-blur shadow-lg' : 'bg-white/95 backdrop-blur shadow-md') 
          : (darkMode ? 'bg-gray-900/80 backdrop-blur' : 'bg-white/90 backdrop-blur shadow-sm')
      }`}
    >
      <div className="container mx-auto px-4 py-4 md:py-3">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <img 
              src="/assets/img/gareth/GarethLogoC.png" 
              alt="Outback Hunting New Zealand Logo" 
              className="h-16 w-auto"
            />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight hidden sm:block`}>
              Outback Hunting New Zealand
            </span>
          </Link>

          {/* Mobile Site Title */}
          <div className="md:hidden flex-1 text-center">
            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              Outback Hunting
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <NavDropdown 
                key={index} 
                title={item.title} 
                links={item.links} 
                darkMode={darkMode}
                onLinkClick={handleSectionClick}
              />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 rounded-lg hover:bg-opacity-10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? 
              <X size={28} className={`${darkMode ? 'text-white' : 'text-gray-900'}`} /> : 
              <Menu size={28} className={`${darkMode ? 'text-white' : 'text-gray-900'}`} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`px-4 pt-2 pb-6 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Dark Mode Toggle for Mobile */}
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Dark Mode
            </span>
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                darkMode 
                  ? 'bg-gray-700 text-amber-400 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <Sun size={20} /> : 
                <Moon size={20} />
              }
            </button>
          </div>
          
          {navItems.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className={`font-semibold ${darkMode ? 'text-amber-400' : 'text-emerald-700'}`}>
                {item.title}
              </h3>
              <ul className="space-y-2 pl-2 border-l-2 border-gray-700">
                {item.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button 
                      onClick={() => handleSectionClick(link.path)}
                      className={`block w-full text-left transition hover:translate-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;