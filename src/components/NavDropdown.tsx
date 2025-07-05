import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  path: string;
}

interface NavDropdownProps {
  title: string;
  links: NavLink[];
  darkMode: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ title, links, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center space-x-1 py-2 font-medium transition-colors ${
          darkMode 
            ? 'text-gray-300 hover:text-white' 
            : 'text-gray-900 hover:text-emerald-700'
        }`}
      >
        <span>{title}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 mt-1 w-48 rounded-md shadow-lg py-1 z-50 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`block px-4 py-2 text-sm transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;