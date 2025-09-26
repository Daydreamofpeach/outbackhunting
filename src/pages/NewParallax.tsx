import React, { useEffect } from 'react';
import NewParallaxComponent from '../components/NewParallaxComponent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface NewParallaxProps {
  darkMode?: boolean;
}

const NewParallax: React.FC<NewParallaxProps> = ({ darkMode = false }) => {
  useEffect(() => {
    // Hide the header and footer for full-screen experience
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (main) {
      main.style.padding = '0';
      main.style.margin = '0';
    }
    
    // Ensure body and html take full viewport but allow scrolling
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.height = '100%';
    
    return () => {
      // Restore original styles when component unmounts
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (main) {
        main.style.padding = '';
        main.style.margin = '';
      }
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.height = '';
    };
  }, []);

  // Configuration for the new parallax
  const newParallaxConfig = {
    id: "newParallax",
    images: {
      sky: "/assets/img/gareth/profile/Sky.svg",
      mountain: "/assets/img/gareth/profile/Mountain.svg", 
      front: "/assets/img/gareth/profile/Front.svg"
    },
    text: {
      line1: "ADVENTURE",
      line2: "AWAITS",
      x: 600,
      y1: 500,
      y2: 600,
      fill1: "#F4EEE2",
      fill2: "#CC142B"
    }
  };

  return (
    <div className="w-full m-0 p-0">
      {/* New Parallax with Sky, Mountain, Front layers */}
      <NewParallaxComponent config={newParallaxConfig} />
      
      {/* Content after parallax */}
      <div className="h-screen bg-white flex items-center justify-center">
        <h1 className="text-6xl text-gray-800 font-bold">NEW PARALLAX ENDED - CONTENT BEGINS!</h1>
      </div>
    </div>
  );
};

export default NewParallax;
