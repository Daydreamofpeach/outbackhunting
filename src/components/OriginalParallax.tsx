import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const OriginalParallax: React.FC = () => {
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scrollDistRef.current) return;

    // Create the parallax timeline exactly as original
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDistRef.current,
        start: '0 0',
        end: '100% 100%',
        scrub: 1
      }
    });

    tl.fromTo('.sky', { y: 0 }, { y: -200 }, 0)
      .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
      .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
      .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
      .fromTo('.mountBg', { y: -10 }, { y: -100 }, 0)
      .fromTo('.mountMg', { y: -30 }, { y: -250 }, 0)
      .fromTo('.mountFg', { y: -50 }, { y: -600 }, 0);

    // Arrow button interactions exactly as original
    const arrowBtn = document.querySelector('#arrow-btn');
    const arrow = document.querySelector('.arrow');

    if (arrowBtn && arrow) {
      const handleMouseEnter = () => {
        gsap.to('.arrow', { 
          y: 10, 
          duration: 0.8, 
          ease: 'back.inOut(3)', 
          overwrite: 'auto' 
        });
      };

      const handleMouseLeave = () => {
        gsap.to('.arrow', { 
          y: 0, 
          duration: 0.5, 
          ease: 'power3.out', 
          overwrite: 'auto' 
        });
      };

      const handleClick = () => {
        gsap.to(window, { 
          scrollTo: window.innerHeight, 
          duration: 1.5, 
          ease: 'power1.inOut' 
        });
      };

      arrowBtn.addEventListener('mouseenter', handleMouseEnter);
      arrowBtn.addEventListener('mouseleave', handleMouseLeave);
      arrowBtn.addEventListener('click', handleClick);

      return () => {
        arrowBtn.removeEventListener('mouseenter', handleMouseEnter);
        arrowBtn.removeEventListener('mouseleave', handleMouseLeave);
        arrowBtn.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return (
    <div className="parallax-container">
      {/* Import Montserrat font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Fixed styles for React */}
      <style>{`
        .parallax-container {
          width: 100%;
          height: 100vh;
          background: #111b29;
          font-family: 'Montserrat', sans-serif;
          font-size: 99px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .scrollDist {
          position: absolute;
          width: 100%;
          height: 200%;
          top: 0;
          left: 0;
        }

        .parallax-main {
          position: fixed;
          background: #fff;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
        }

        /* Responsive logo positioning */
        .logo {
          transition: all 0.3s ease;
        }

        /* Large screens - logo to the left of text */
        @media (min-width: 1024px) {
          .logo {
            x: 100px !important;
            y: 50px !important;
            width: 200px !important;
            height: 200px !important;
          }
        }

        /* Medium screens - center logo */
        @media (max-width: 1023px) and (min-width: 768px) {
          .logo {
            x: 500px !important;
            y: 500px !important;
            width: 150px !important;
            height: 150px !important;
          }
        }

        /* Small screens - center logo in bottom quarter */
        @media (max-width: 767px) {
          .logo {
            x: 500px !important;
            y: 550px !important;
            width: 120px !important;
            height: 120px !important;
          }
        }
      `}</style>

      {/* Scroll distance element */}
      <div ref={scrollDistRef} className="scrollDist" />

      {/* Main parallax scene */}
      <main ref={mainRef} className="parallax-main">
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <mask id="m">
            <g className="cloud1">
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image 
                href="https://assets.codepen.io/721952/cloud1Mask.jpg" 
                width="1200" 
                height="800"
              />
            </g>
          </mask>
          
          <image 
            className="sky" 
            href="https://assets.codepen.io/721952/sky.jpg"  
            width="1200" 
            height="590" 
          />
          <image 
            className="mountBg" 
            href="https://assets.codepen.io/721952/mountBg.png" 
            width="1200" 
            height="800"
          />    
          <image 
            className="mountMg" 
            href="https://assets.codepen.io/721952/mountMg.png" 
            width="1200" 
            height="800"
          />    
          <image 
            className="cloud2" 
            href="https://assets.codepen.io/721952/cloud2.png" 
            width="1200" 
            height="800"
          />    
          <image 
            className="mountFg" 
            href="https://assets.codepen.io/721952/mountFg.png" 
            width="1200" 
            height="800"
          />
          <image 
            className="cloud1" 
            href="https://assets.codepen.io/721952/cloud1.png" 
            width="1200" 
            height="800"
          />
          <image 
            className="cloud3" 
            href="https://assets.codepen.io/721952/cloud3.png" 
            width="1200" 
            height="800"
          />
                      {/* Logo - responsive positioning */}
            <image 
              href="/assets/img/gareth/GarethLogoC.png" 
              x="100" 
              y="50" 
              width="200" 
              height="200"
              className="logo"
            />
            
            <text fill="#fff" x="350" y="200">EXPLORE</text>
            <text fill="#fff" x="350" y="280">NEW ZEALAND </text>
          <polyline 
            className="arrow" 
            fill="#fff" 
            points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250" 
          />
          
                      <g mask="url(#m)">
              <rect fill="#fff" width="100%" height="100%" />      
              {/* Logo in masked section */}
              <image 
                href="/assets/img/gareth/GarethLogoC.png" 
                x="100" 
                y="50" 
                width="200" 
                height="200"
                className="logo"
              />
              <text x="350" y="200" fill="#162a43">OUTBACK</text>
              <text x="350" y="280" fill="#162a43">HUNTING</text>
            </g>
          
          <rect 
            id="arrow-btn" 
            width="100" 
            height="100" 
            opacity="0" 
            x="550" 
            y="220" 
            style={{ cursor: 'pointer' }}
          />
        </svg>
      </main>
    </div>
  );
};

export default OriginalParallax;
