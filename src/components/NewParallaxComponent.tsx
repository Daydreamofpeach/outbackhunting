import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface NewParallaxConfig {
  id: string;
  images: {
    sky: string;
    mountain: string;
    front: string;
  };
  text: {
    line1: string;
    line2: string;
    x: number;
    y1: number;
    y2: number;
    fill1: string;
    fill2: string;
  };
}

interface NewParallaxComponentProps {
  config: NewParallaxConfig;
}

const NewParallaxComponent: React.FC<NewParallaxComponentProps> = ({ config }) => {
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scrollDistRef.current) return;

    // Set initial positions for images - all visible for testing
    gsap.set(`.new-sky-${config.id}`, { y: 0, opacity: 1 });
    gsap.set(`.new-mountain-${config.id}`, { y: 0, opacity: 1 });
    gsap.set(`.new-front-${config.id}`, { y: 0, opacity: 1 });

    // Simple parallax animation - different scroll speeds
    const getAnimationValues = () => {
      const width = window.innerWidth;
      
      if (width <= 480) {
        return {
          sky: -30,
          mountain: -60,
          front: -90
        };
      } else if (width <= 767) {
        return {
          sky: -40,
          mountain: -80,
          front: -120
        };
      } else if (width <= 1023) {
        return {
          sky: -50,
          mountain: -100,
          front: -150
        };
      } else {
        return {
          sky: -60,
          mountain: -120,
          front: -180
        };
      }
    };

    const animationValues = getAnimationValues();

    // Create the parallax timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDistRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    // Simple parallax animations
    tl.to(`.new-sky-${config.id}`, 
      { y: animationValues.sky, duration: 1 }, 0)
      .to(`.new-mountain-${config.id}`, 
        { y: animationValues.mountain, duration: 1 }, 0)
      .to(`.new-front-${config.id}`, 
        { y: animationValues.front, duration: 1 }, 0);

    // Debug: Log to console to check if elements exist
    console.log('Sky element:', document.querySelector(`.new-sky-${config.id}`));
    console.log('Mountain element:', document.querySelector(`.new-mountain-${config.id}`));
    console.log('Front element:', document.querySelector(`.new-front-${config.id}`));

  }, [config.id]);

  return (
    <div className="new-parallax-container">
      {/* Import Montserrat font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Fixed styles for New Parallax */}
      <style>{`
        .new-parallax-container {
          width: 100%;
          height: 100vh;
          background: transparent;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
          margin-top: 50vh;
        }

        .new-scroll-dist {
          position: absolute;
          width: 100%;
          height: 1200vh;
          top: 0;
          left: 0;
        }

        /* Responsive scroll distances */
        @media (max-width: 1023px) {
          .new-scroll-dist {
            height: 1000vh;
          }
        }

        @media (max-width: 767px) {
          .new-scroll-dist {
            height: 900vh;
          }
        }

        @media (max-width: 480px) {
          .new-scroll-dist {
            height: 800vh;
          }
        }

        .new-parallax-main {
          position: relative;
          background: transparent;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
        }

        .new-parallax-main svg {
          width: 100%;
          height: 100vh;
        }

        /* Sky layer - background */
        .new-sky-${config.id} {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
          mix-blend-mode: normal;
        }

        /* Mountain layer - middle */
        .new-mountain-${config.id} {
          width: 96%;
          height: 72%;
          object-fit: cover;
          object-position: center center;
          z-index: 2;
          position: absolute;
          top: -50%;
          left: 0;
        }

        /* Front layer - foreground */
        .new-front-${config.id} {
          width: 100%;
          height: 85%;
          object-fit: cover;
          object-position: center bottom;
          z-index: 3;
          position: absolute;
          top: 0;
          left: 0;
        }

        /* Text styling */
        .new-parallax-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 4rem;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        /* Responsive text sizing */
        @media (min-width: 1024px) {
          .new-parallax-text {
            font-size: 85px;
          }
        }

        @media (max-width: 1023px) and (min-width: 768px) {
          .new-parallax-text {
            font-size: 70px;
          }
        }

        @media (max-width: 767px) and (min-width: 481px) {
          .new-parallax-text {
            font-size: 55px;
          }
        }

        @media (max-width: 480px) {
          .new-parallax-text {
            font-size: 40px;
          }
        }

      `}</style>

      {/* Scroll distance element */}
      <div ref={scrollDistRef} className="new-scroll-dist" />

      {/* Main parallax scene */}
      <main ref={mainRef} className="new-parallax-main">
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100vh' }}>
          
          {/* Sky layer - background */}
          <image 
            className={`new-sky-${config.id}`}
            href={config.images.sky}  
            width="1200" 
            height="800" 
            x="0"
            y="0"
          />
          
          {/* Mountain layer - middle */}
          <image 
            className={`new-mountain-${config.id}`}
            href={config.images.mountain} 
            width="1200" 
            height="800"
            x="0"
            y="0"
          />
          
          {/* Front layer - foreground */}
          <image 
            className={`new-front-${config.id}`}
            href={config.images.front} 
            width="1200" 
            height="800"
            x="0"
            y="0"
          />

          {/* Text overlay */}
          <text 
            fill={config.text.fill1} 
            x={config.text.x} 
            y={config.text.y1} 
            className="new-parallax-text"
          >
            {config.text.line1}
          </text>
          <text 
            fill={config.text.fill2} 
            x={config.text.x} 
            y={config.text.y2} 
            className="new-parallax-text"
          >
            {config.text.line2}
          </text>

        </svg>
      </main>
    </div>
  );
};

export default NewParallaxComponent;
