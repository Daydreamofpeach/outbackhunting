import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Moon, Sun } from 'lucide-react';
import NavDropdown from './NavDropdown';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

  const navItems = [
    { 
      title: 'Hunting',
      links: [
        { name: 'Pricing', path: '/packages' },
        { name: 'Customize Package', path: '/customize' },
        { name: 'Animals', path: '/animals' },
      ]
    },
    { 
      title: 'About Us',
      links: [
        { name: 'Our Story', path: '/about' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'Our Locations', path: '/about#locations' },
      ]
    },
    { 
      title: 'Contact',
      links: [
        { name: 'Get in Touch', path: '/contact' },
        { name: 'Book a Trip', path: '/contact#booking' },
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
              src={darkMode ? '/assets/img/logo.png' : '/assets/img/colorlogo.png'} 
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
                    <Link 
                      to={link.path} 
                      className={`block transition hover:translate-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {link.name}
                    </Link>
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