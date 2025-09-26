import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HuntParallaxConfig {
  id: string;
  images: {
    sky: string;
    mountBg: string;
    mountMg: string;
    cloud2: string;
    mountFg: string;
    cloud1: string;
  };
}

interface HuntParallaxComponentProps {
  config: HuntParallaxConfig;
}

const HuntParallaxComponent: React.FC<HuntParallaxComponentProps> = ({ config }) => {
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scrollDistRef.current) return;

    // Get responsive animation values for hunt parallax
    const getAnimationValues = () => {
      const width = window.innerWidth;
      
      if (width <= 480) {
        return {
          sky: -50,
          cloud1: -100,
          cloud2: -80,
          cloud3: -90,
          mountBg: -30,
          mountMg: -60,
          mountFg: -40
        };
      } else if (width <= 767) {
        return {
          sky: -60,
          cloud1: -120,
          cloud2: -100,
          cloud3: -110,
          mountBg: -40,
          mountMg: -80,
          mountFg: -50
        };
      } else if (width <= 1023) {
        return {
          sky: -70,
          cloud1: -140,
          cloud2: -120,
          cloud3: -130,
          mountBg: -50,
          mountMg: -100,
          mountFg: -60
        };
      } else {
        return {
          sky: -80,
          cloud1: -160,
          cloud2: -140,
          cloud3: -150,
          mountBg: -60,
          mountMg: -120,
          mountFg: -70
        };
      }
    };

    const animationValues = getAnimationValues();

    // Create the parallax timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDistRef.current,
        start: '0 0',
        end: '100% 100%',
        scrub: 1
      }
    });

    // Hunt layer animations with custom positioning
    tl.fromTo(`.sky-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.sky, opacity: 1 }, 0.1)
      .fromTo(`.mountBg-${config.id}`, { y: -200, opacity: 1 }, { y: animationValues.mountBg, opacity: 1 }, 0.2)
      .fromTo(`.mountMg-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.mountMg, opacity: 1 }, 0.3)
      .fromTo(`.cloud2-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.cloud2, opacity: 1 }, 0.4)
      .fromTo(`.cloud1-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.cloud1, opacity: 1 }, 0.5);

  }, [config.id]);

  return (
    <div className="hunt-parallax-container">
      {/* Import Montserrat font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Fixed styles for Hunt Parallax */}
      <style>{`
        .hunt-parallax-container {
          width: 100%;
          height: 100vh;
          background: transparent;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: visible;
        }

        /* Increase container height on larger screens */
        @media (min-width: 1024px) {
          .hunt-parallax-container {
            height: 120vh;
          }
        }

        @media (min-width: 1440px) {
          .hunt-parallax-container {
            height: 140vh;
          }
        }

        .hunt-scroll-dist {
          position: absolute;
          width: 100%;
          height: 1200vh;
          top: 0;
          left: 0;
        }

        /* Responsive scroll distances for different screen sizes */
        @media (max-width: 1023px) {
          .hunt-scroll-dist {
            height: 1000vh;
          }
        }

        @media (max-width: 767px) {
          .hunt-scroll-dist {
            height: 900vh;
          }
        }

        @media (max-width: 480px) {
          .hunt-scroll-dist {
            height: 800vh;
          }
        }

        .hunt-parallax-main {
          position: relative;
          background: transparent;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
        }

        /* Ensure SVG uses full height and shows complete images */
        .hunt-parallax-main svg {
          width: 100%;
          height: 100vh;
        }

        /* SKY layer - background */
        .hunt-sky-${config.id} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        /* Half image - main subject */
        .hunt-mountFg-${config.id} {
          width: 100%;
          height: 100%;
          z-index: 10;
          position: relative;
          object-fit: cover;
          object-position: center center;
        }

        /* Top Cloud - overlay */
        .hunt-cloud1-${config.id} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          z-index: 5;
          position: relative;
        }

        /* Responsive positioning for half image */
        @media (min-width: 1024px) {
          .hunt-mountFg-${config.id} {
            object-position: center 60%;
          }
        }

        @media (min-width: 1440px) {
          .hunt-mountFg-${config.id} {
            object-position: center 50%;
          }
        }

        @media (min-width: 1920px) {
          .hunt-mountFg-${config.id} {
            object-position: center 40%;
          }
        }

      `}</style>

      {/* Scroll distance element */}
      <div ref={scrollDistRef} className="hunt-scroll-dist" />



       {/* Main hunt parallax scene */}
       <main ref={mainRef} className="hunt-parallax-main">
         <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100vh' }}>
          
          {/* Simplified hunt parallax - Sky, Half image, and Clouds */}
          <image 
            className={`hunt-sky-${config.id}`}
            href={config.images.sky}  
            width="1200" 
            height="800" 
            x="0"
            y="0"
          />
          <image 
            className={`hunt-mountFg-${config.id}`}
            href={config.images.mountFg} 
            width="1200" 
            height="800"
            x="0"
            y="0"
          />
          <image 
            className={`hunt-cloud1-${config.id}`}
            href={config.images.cloud1} 
            width="1200" 
            height="800"
            x="0"
            y="0"
          />

        </svg>
      </main>
    </div>
  );
};

export default HuntParallaxComponent;