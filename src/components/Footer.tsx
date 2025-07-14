import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Moon, Sun } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

const Footer: React.FC<FooterProps> = ({ darkMode, toggleDarkMode }) => {
  const [contact, setContact] = useState<ContactInfo>({ phone: '', email: '', address: '' });

  useEffect(() => {
    fetch('/contact.json')
      .then(res => res.json())
      .then(data => setContact(data));
  }, []);

  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'} pt-8 pb-4`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          {/* Logo and about */}
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <Compass size={24} className={darkMode ? 'text-amber-500' : 'text-emerald-700'} />
            <span className="text-lg font-bold tracking-tight">Outback Hunting New Zealand</span>
          </div>
          {/* Quick Links */}
          <ul className="flex flex-wrap gap-6 text-sm font-medium">
              <li>
              <Link to="/packages" className="hover:text-amber-500 transition-colors">Packages</Link>
              </li>
              <li>
              <Link to="/animals" className="hover:text-amber-500 transition-colors">Animals</Link>
              </li>
              <li>
              <Link to="/about" className="hover:text-amber-500 transition-colors">About</Link>
              </li>
              <li>
              <Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
              </li>
            </ul>
          {/* Contact Info */}
          <ul className="flex flex-col gap-1 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="flex-shrink-0" />
              <span>{contact.phone || 'Loading...'}</span>
              </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="flex-shrink-0" />
              <span>{contact.email || 'Loading...'}</span>
              </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="flex-shrink-0" />
              <span>{contact.address || 'Loading...'}</span>
              </li>
            </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-xs relative">
          <p>&copy; {new Date().getFullYear()} Outback Hunting New Zealand. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-amber-500 transition-colors mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-500 transition-colors">Terms</Link>
          </p>
          <div className="absolute right-0 top-0">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;