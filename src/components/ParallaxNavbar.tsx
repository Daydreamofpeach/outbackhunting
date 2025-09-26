import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Home, Target, Users, Phone, Package, Settings, MapPin, Calendar, Award } from 'lucide-react';
import { gsap } from 'gsap';
import NavDropdown from './NavDropdown';

interface ParallaxNavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ParallaxNavbar: React.FC<ParallaxNavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Refs for GSAP animations
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { 
      title: 'Hunting',
      icon: <Target size={20} />,
      links: [
        { name: 'Pricing', path: '/packages', icon: <Package size={18} /> },
        { name: 'Customize Package', path: '/customize', icon: <Settings size={18} /> },
        { name: 'Animals', path: '/animals', icon: <Award size={18} /> },
      ]
    },
    { 
      title: 'About Us',
      icon: <Users size={20} />,
      links: [
        { name: 'Our Story', path: '/about', icon: <Users size={18} /> },
        { name: 'Our Team', path: '/about#team', icon: <Users size={18} /> },
        { name: 'Our Locations', path: '/about#locations', icon: <MapPin size={18} /> },
      ]
    },
    { 
      title: 'Contact',
      icon: <Phone size={20} />,
      links: [
        { name: 'Get in Touch', path: '/contact', icon: <Phone size={18} /> },
        { name: 'Book a Trip', path: '/contact#booking', icon: <Calendar size={18} /> },
      ]
    },
  ];


  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // GSAP animations for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      // Animate menu items in
      gsap.fromTo(menuItemsRef.current, 
        { 
          opacity: 0, 
          y: 20, 
          scale: 0.95 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
      
      // Animate hamburger rotation
      if (hamburgerRef.current) {
        gsap.to(hamburgerRef.current, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut"
        });
      }
    } else if (!isOpen && mobileMenuRef.current) {
      // Animate menu items out
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.inOut"
      });
      
      // Reset hamburger rotation
      if (hamburgerRef.current) {
        gsap.to(hamburgerRef.current, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut"
        });
      }
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-0 m-0 p-0">
      {/* Backdrop filter to inherit background */}
      <div 
        className="absolute inset-0 w-full h-full backdrop-blur-sm"
        style={{
          background: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 1
        }}
      />
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        {/* Full Width Glassmorphic Container */}
        <div className={`backdrop-blur-md rounded-2xl px-8 py-4 w-full ${darkMode ? 'bg-black/25 border-white/30' : 'bg-white/40 border-white/50'} border shadow-xl`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-4 transition-transform hover:scale-105 bg-transparent border-none cursor-pointer"
            >
              <img 
                src="/assets/img/gareth/profile/GarethLogo-02.svg" 
                alt="Outback Hunting New Zealand Logo" 
                className={`h-16 w-auto ${darkMode ? 'invert' : ''}`}
              />
              <div className="hidden md:block">
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight drop-shadow-lg leading-tight`}>
                  Outback Hunting
                </div>
                <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} tracking-wide drop-shadow-lg`}>
                  New Zealand
                </div>
              </div>
            </button>

            {/* Mobile Site Title */}
            <div className="md:hidden flex-1 text-center">
              <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight drop-shadow-lg leading-tight`}>
                Outback Hunting
              </div>
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} tracking-wide drop-shadow-lg`}>
                New Zealand
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <NavDropdown 
                  key={index} 
                  title={item.title} 
                  links={item.links} 
                  darkMode={darkMode}
                />
              ))}
            </nav>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode} 
                className={`p-3 rounded-full transition-all hover:scale-110 shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800/95 backdrop-blur-sm text-amber-400 hover:bg-gray-700/95 border border-gray-600' 
                    : 'bg-white/95 backdrop-blur-sm text-indigo-600 hover:bg-gray-100/95 border border-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? 
                  <Sun size={24} /> : 
                  <Moon size={24} />
                }
              </button>

              {/* Mobile menu button */}
              <button 
                ref={hamburgerRef}
                onClick={toggleMenu} 
                className={`md:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 border border-gray-600' 
                    : 'bg-white/80 backdrop-blur-sm hover:bg-gray-100/80 border border-gray-200'
                } shadow-lg`}
                aria-label="Toggle menu"
              >
                {isOpen ? 
                  <X size={24} className={`${darkMode ? 'text-white' : 'text-gray-800'} drop-shadow-lg`} /> : 
                  <Menu size={24} className={`${darkMode ? 'text-white' : 'text-gray-800'} drop-shadow-lg`} />
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden transition-all duration-300 overflow-hidden relative z-50 pointer-events-auto ${isOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`px-4 pt-3 pb-6 space-y-3 relative z-50 overflow-y-auto max-h-[90vh] ${darkMode ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'} shadow-2xl`}>
          {/* Home Link and Dark Mode Toggle - Side by Side */}
          <div 
            ref={el => { if (el) menuItemsRef.current[0] = el; }}
            className="flex items-center justify-between gap-3"
          >
            <button 
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 relative z-50 border-none cursor-pointer ${
                darkMode 
                  ? 'bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-600' 
                  : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-800 border border-gray-200'
              } shadow-lg flex-1 justify-center`}
            >
              <Home size={20} />
              <span className="font-semibold text-base">Home</span>
            </button>
            
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-xl transition-all hover:scale-110 shadow-lg ${
                darkMode 
                  ? 'bg-gray-800/95 backdrop-blur-sm text-amber-400 hover:bg-gray-700/95 border border-gray-600' 
                  : 'bg-white/95 backdrop-blur-sm text-indigo-600 hover:bg-gray-100/95 border border-gray-200'
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
            <div 
              key={idx} 
              ref={el => { if (el) menuItemsRef.current[idx + 1] = el; }}
              className="space-y-2"
            >
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
              }`}>
                <div className={`p-1.5 rounded-md ${
                  darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-600'
                }`}>
                  {item.icon}
                </div>
                <h3 className={`font-bold text-base ${darkMode ? 'text-amber-400' : 'text-emerald-700'}`}>
                  {item.title}
                </h3>
              </div>
              <ul className="space-y-1 pl-3">
                {item.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.path} 
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:translate-x-1 relative z-50 ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                      } group`}
                    >
                      <div className={`p-1 rounded-md transition-colors ${
                        darkMode 
                          ? 'group-hover:bg-gray-700/50' 
                          : 'group-hover:bg-gray-200/50'
                      }`}>
                        {link.icon}
                      </div>
                      <span className="font-medium text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ParallaxNavbar;
