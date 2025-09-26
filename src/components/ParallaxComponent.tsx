import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ParallaxConfig {
  id: string;
  text: {
    initial: {
      line1: string;
      line2: string;
      x: number;
      y1: number;
      y2: number;
      fill1: string;
      fill2: string;
    };
    masked: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
      line5: string;
      x: number;
      y1: number;
      y2: number;
      y3: number;
      y4: number;
      y5: number;
      fill: string;
    };
  };
  logo: {
    href: string;
    x: number | string;
    y: number;
    width: number | string;
    height: number | string;
  };
  images: {
    sky: string;
    mountBg: string;
    mountMg: string;
    cloud2: string;
    mountFg: string;
    cloud1: string;
    cloud3: string;
    cloud1Mask: string;
  };
}

interface ParallaxComponentProps {
  config: ParallaxConfig;
}

const ParallaxComponent: React.FC<ParallaxComponentProps> = ({ config }) => {
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scrollDistRef.current) return;

    // Get responsive animation values based on screen size
    const getAnimationValues = () => {
      const width = window.innerWidth;
      
      // Different animation values for hunt parallax (parallax2)
      if (config.id === 'parallax2') {
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
      }
      
      // Original animation values for first parallax
      if (width <= 480) {
        return {
          sky: -600,
          cloud1: -2400,
          cloud2: -1500,
          cloud3: -1950,
          mountBg: -300,
          mountMg: -750,
          mountFg: -1800
        };
      } else if (width <= 767) {
        return {
          sky: -500,
          cloud1: -2000,
          cloud2: -1250,
          cloud3: -1625,
          mountBg: -250,
          mountMg: -625,
          mountFg: -1500
        };
      } else if (width <= 1023) {
        return {
          sky: -450,
          cloud1: -1800,
          cloud2: -1125,
          cloud3: -1462,
          mountBg: -225,
          mountMg: -562,
          mountFg: -1350
        };
      } else {
        return {
          sky: -400,
          cloud1: -1600,
          cloud2: -1000,
          cloud3: -1300,
          mountBg: -200,
          mountMg: -500,
          mountFg: -1200
        };
      }
    };

    const animationValues = getAnimationValues();

    // Create the parallax timeline exactly as original
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDistRef.current,
        start: '0 0',
        end: '100% 100%',
        scrub: 1
      }
    });

    tl.fromTo(`.sky-${config.id}`, { y: 0 }, { y: animationValues.sky }, 0)
      .fromTo(`.mountBg-${config.id}`, { y: -10 }, { y: animationValues.mountBg }, 0)
      .fromTo(`.mountMg-${config.id}`, { y: -30 }, { y: animationValues.mountMg }, 0)
      .fromTo(`.mountFg-${config.id}`, { y: -50 }, { y: animationValues.mountFg }, 0);

    // Add cloud animations only for parallax1
    if (config.id !== 'parallax2') {
      tl.fromTo(`.cloud1-${config.id}`, { y: 100 }, { y: animationValues.cloud1 }, 0)
        .fromTo(`.cloud2-${config.id}`, { y: -150 }, { y: animationValues.cloud2 }, 0)
        .fromTo(`.cloud3-${config.id}`, { y: -50 }, { y: animationValues.cloud3 }, 0);
    }

    // Add hunt layer animations for parallax2 using config image classes
    if (config.id === 'parallax2') {
      tl.fromTo(`.sky-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.sky, opacity: 1 }, 0.1)
        .fromTo(`.mountBg-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.mountBg, opacity: 1 }, 0.2)
        .fromTo(`.mountMg-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.mountMg, opacity: 1 }, 0.3)
        .fromTo(`.cloud2-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.cloud2, opacity: 1 }, 0.4)
        .fromTo(`.cloud1-${config.id}`, { y: 0, opacity: 1 }, { y: animationValues.cloud1, opacity: 1 }, 0.5);
    }



  }, [config.id]);

  return (
    <div className={`parallax-container ${config.id === 'parallax2' ? 'hunt-parallax' : ''}`}>
      {/* Import Montserrat font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Fixed styles for React */}
      <style>{`
        .parallax-container {
          width: 100vw;
          height: 100vh;
          background: #5C90EB;
          font-family: 'Montserrat', sans-serif;
          font-size: 99px;
          text-align: center;
          position: relative;
          overflow: hidden;
          max-width: none;
        }

        .scrollDist {
          position: absolute;
          width: 100%;
          height: 500vh;
          top: 0;
          left: 0;
        }

        /* Hunt parallax (parallax2) - longer scroll distance */
        .parallax-container.hunt-parallax .scrollDist {
          height: 900vh;
        }

        /* Responsive scroll distances for smaller screens */
        @media (max-width: 1023px) {
          .scrollDist {
            height: 600vh;
          }
          .parallax-container.hunt-parallax .scrollDist {
            height: 1000vh;
          }
        }

        @media (max-width: 767px) {
          .scrollDist {
            height: 700vh;
          }
          .parallax-container.hunt-parallax .scrollDist {
            height: 1100vh;
          }
        }

        @media (max-width: 480px) {
          .scrollDist {
            height: 800vh;
          }
          .parallax-container.hunt-parallax .scrollDist {
            height: 1200vh;
          }
        }

        .parallax-main {
          position: relative;
          background: #fff;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          max-width: none;
        }

        /* Hunt parallax (parallax2) - no white background */
        .parallax-container.hunt-parallax .parallax-main {
          background: transparent;
        }
        
        /* Hunt parallax (parallax2) - blue background */
        .parallax-container.hunt-parallax {
          background: #5C90EB;
        }

        /* Hunt images visible without blend mode */
        .parallax-container.hunt-parallax .parallax-main svg image {
          opacity: 1;
        }

        /* Hunt layer positioning and visibility */
        .parallax-container.hunt-parallax .hunt-lm-${config.id},
        .parallax-container.hunt-parallax .hunt-mm-${config.id},
        .parallax-container.hunt-parallax .hunt-rm-${config.id} {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          mix-blend-mode: screen;
        }

                 /* TC (Top Cloud) positioned at the very top */
         .parallax-container.hunt-parallax .hunt-tc-${config.id} {
           position: absolute;
           top: -40%;
           left: 0;
           z-index: 15;
           mix-blend-mode: screen;
           width: 100%;
           height: 140%;
         }

        /* Ensure SVG uses full viewport on all screen sizes */
        .parallax-main svg {
          width: 100vw;
          height: 100vh;
          max-width: none;
        }

        /* Responsive text sizing and centering */
        .parallax-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          transition: all 0.3s ease;
          text-anchor: middle;
        }

        /* Large screens - text sizing */
        @media (min-width: 1024px) {
          .parallax-text {
            font-size: 85px;
          }
        }

        /* Medium screens - text sizing */
        @media (max-width: 1023px) and (min-width: 768px) {
          .parallax-text {
            font-size: 70px;
          }
        }

        /* Small screens - text sizing */
        @media (max-width: 767px) and (min-width: 481px) {
          .parallax-text {
            font-size: 55px;
          }
        }

        /* Extra small screens - text sizing */
        @media (max-width: 480px) {
          .parallax-text {
            font-size: 40px;
          }
        }

        /* Hero images responsive styles */
        .hero-img-1-parallax1,
        .hero-img-2-parallax1 {
          transition: all 0.3s ease;
        }

        /* Large screens - full viewport */
        @media (min-width: 1024px) {
          .hero-img-1-parallax1,
          .hero-img-2-parallax1 {
            height: 100vh;
          }
        }

        /* Medium screens - full viewport */
        @media (max-width: 1023px) and (min-width: 768px) {
          .hero-img-1-parallax1,
          .hero-img-2-parallax1 {
            height: 100vh;
          }
        }

        /* Small screens - full viewport */
        @media (max-width: 767px) and (min-width: 481px) {
          .hero-img-1-parallax1,
          .hero-img-2-parallax1 {
            height: 100vh;
          }
        }

        /* Extra small screens - full viewport */
        @media (max-width: 480px) {
          .hero-img-1-parallax1,
          .hero-img-2-parallax1 {
            height: 100vh;
          }
        }

        /* Logo centered positioning for all screen sizes */
        .logo {
          transition: all 0.3s ease;
          transform: scale(0.7);
        }

        /* Responsive logo positioning and sizing */
        @media (min-width: 1440px) {
          .logo {
            transform: scale(0.7) translateY(-20%);
          }
        }

        @media (min-width: 1920px) {
          .logo {
            transform: scale(0.7) translateY(-20%);
          }
        }

        @media (max-width: 1023px) {
          .logo {
            transform: scale(0.6) translateX(-20px);
          }
        }

        @media (max-width: 767px) {
          .logo {
            transform: scale(0.6) translateX(-10px);
          }
        }

        @media (max-width: 480px) {
          .logo {
            transform: scale(0.6) translateX(-5px);
          }
        }

        /* Line1 text specific styling - smaller size */
        .parallax-text:first-of-type {
          font-size: 2.5rem;
        }

        /* Responsive sizing for line1 text */
        @media (min-width: 1024px) {
          .parallax-text:first-of-type {
            font-size: 60px;
          }
        }

        @media (max-width: 1023px) and (min-width: 768px) {
          .parallax-text:first-of-type {
            font-size: 50px;
          }
        }

        @media (max-width: 767px) and (min-width: 481px) {
          .parallax-text:first-of-type {
            font-size: 40px;
          }
        }

        @media (max-width: 480px) {
          .parallax-text:first-of-type {
            font-size: 30px;
          }
        }

        /* Responsive positioning for masked text (New Zealand) */
        @media (min-width: 1920px) {
          .masked-text {
            transform: translateY(480px);
          }
        }

        @media (min-width: 1440px) and (max-width: 1919px) {
          .masked-text {
            transform: translateY(380px);
          }
        }

        @media (min-width: 1024px) and (max-width: 1439px) {
          .masked-text {
            transform: translateY(200px);
          }
        }

        @media (max-width: 1023px) and (min-width: 768px) {
          .masked-text {
            transform: translateY(180px);
          }
        }

        @media (max-width: 767px) {
          .masked-text {
            transform: translateY(160px);
          }
        }

        @media (max-width: 480px) {
          .masked-text {
            transform: translateY(180px);
          }
        }

        /* Call to Action styling */
        .cta-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 2.5rem;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .cta-subtext {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        /* Responsive CTA sizing */
        @media (min-width: 1024px) {
          .cta-text {
            font-size: 60px;
          }
          .cta-subtext {
            font-size: 36px;
          }
        }

        @media (max-width: 1023px) and (min-width: 768px) {
          .cta-text {
            font-size: 50px;
          }
          .cta-subtext {
            font-size: 30px;
          }
        }

        @media (max-width: 767px) and (min-width: 481px) {
          .cta-text {
            font-size: 40px;
          }
          .cta-subtext {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .cta-text {
            font-size: 30px;
          }
          .cta-subtext {
            font-size: 18px;
          }
        }

        /* Responsive text positioning - move text on larger screens */
        @media (min-width: 1440px) {
          .parallax-text {
            transform: translateY(100px);
          }
        }

        @media (min-width: 1920px) {
          .parallax-text {
            transform: translateY(120px);
          }
        }
      `}</style>

      {/* Scroll distance element */}
      <div ref={scrollDistRef} className="scrollDist" />

      {/* Main parallax scene */}
      <main ref={mainRef} className="parallax-main">
        
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100vw', height: '100vh' }}>
          
          <mask id={`m-${config.id}`}>
            <g className={`cloud1-${config.id}`}>
              <rect fill="#fff" width="100%" height="1200" y="0" />
              <image 
                href={config.images.cloud1Mask} 
                width="1200" 
                height="800"
              />
            </g>
          </mask>
          
          <image 
            className={`sky-${config.id}`}
            href={config.images.sky}  
            width="1200" 
            height="590" 
          />
          <image 
            className={`mountBg-${config.id}`}
            href={config.images.mountBg} 
            width="1200" 
            height="800"
          />    
          <image 
            className={`mountMg-${config.id}`}
            href={config.images.mountMg} 
            width="1200" 
            height="800"
          />    
          <image 
            className={`cloud2-${config.id}`}
            href={config.images.cloud2} 
            width="1200" 
            height="800"
          />    
          <image 
            className={`mountFg-${config.id}`}
            href={config.images.mountFg} 
            width="1200" 
            height="800"
          />
          
          
          
          {/* Clouds disabled for hunt parallax */}
          {config.id !== 'parallax2' && (
            <>
              <image 
                className={`cloud1-${config.id}`}
                href={config.images.cloud1} 
                width="1200" 
                height="800"
              />
              <image 
                className={`cloud3-${config.id}`}
                href={config.images.cloud3} 
                width="1200" 
                height="800"
              />
            </>
          )}
          
          {/* Logo - responsive positioning */}
          <image 
            href={config.logo.href} 
            x={config.logo.x} 
            y={config.logo.y} 
            width={config.logo.width} 
            height={config.logo.height}
            className="logo"
            style={{ transformOrigin: 'center' }}
          />
          
          
          {/* Initial text */}
          <text fill={config.text.initial.fill1} x={config.text.initial.x} y={config.text.initial.y1} className="parallax-text">
            {config.text.initial.line1}
          </text>
          <text fill={config.text.initial.fill2} x={config.text.initial.x} y={config.text.initial.y2} className="parallax-text">
            {config.text.initial.line2}
          </text>
          
          {/* Masked text effect */}
          <g mask={`url(#m-${config.id})`}>
            <rect fill="#fff" width="100%" height="100%" />      
            {/* Logo in masked section */}
            <image 
              href={config.logo.href} 
              x={config.logo.x} 
              y={config.logo.y} 
              width={config.logo.width} 
              height={config.logo.height}
              className="logo"
              style={{ transformOrigin: 'center' }}
            />
            {/* Masked text */}
            <text x={config.text.masked.x} y={config.text.masked.y1} fill={config.text.masked.fill} className="parallax-text masked-text">
              {config.text.masked.line1}
            </text>
            <text x={config.text.masked.x} y={config.text.masked.y2} fill={config.text.masked.fill} className="parallax-text">
              {config.text.masked.line2}
            </text>
            <text x={config.text.masked.x} y={config.text.masked.y3} fill={config.text.masked.fill} className="parallax-text">
              {config.text.masked.line3}
            </text>
            <text x={config.text.masked.x} y={config.text.masked.y4} fill={config.text.masked.fill} className="parallax-text">
              {config.text.masked.line4}
            </text>
            <text x={config.text.masked.x} y={config.text.masked.y5} fill={config.text.masked.fill} className="parallax-text">
              {config.text.masked.line5}
            </text>
          </g>

          {/* Debug text for hunt parallax */}
          {config.id === 'parallax2' && (
            <>
              <text fill="#ff0000" x="600" y="600" className="parallax-text" fontSize="24">
                HUNT PARALLAX ACTIVE - SCROLL DOWN
              </text>
              <text fill="#00ff00" x="600" y="650" className="parallax-text" fontSize="20">
                SKY: Sky | LM: Left Mountain | MM: Main Mountain | RM: Right Mountain | TC: Top Clouds
              </text>
            </>
          )}


        </svg>
      </main>
      

    </div>
  );
};

export default ParallaxComponent;
