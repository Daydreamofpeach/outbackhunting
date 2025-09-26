import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ParallaxSceneProps {}

const ParallaxScene: React.FC<ParallaxSceneProps> = () => {
  const mainRef = useRef<HTMLElement>(null);
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGPolylineElement>(null);
  const arrowBtnRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!mainRef.current || !scrollDistRef.current) return;

    // Create the parallax timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDistRef.current,
        start: '0 0',
        end: '100% 100%',
        scrub: 1
      }
    });

                    // Animate different layers at different speeds (original timeline)
                tl.fromTo('.sky', { y: 0 }, { y: -200 }, 0)
                  .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
                  .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
                  .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
                  .fromTo('.mountBg', { y: -10 }, { y: -100 }, 0)
                  .fromTo('.mountMg', { y: -30 }, { y: -250 }, 0)
                  .fromTo('.mountFg', { y: -50 }, { y: -600 }, 0)
                  .fromTo('.logo', { y: 0 }, { y: -400 }, 0);



    // Arrow button interactions
    const arrowBtn = arrowBtnRef.current;
    const arrow = arrowRef.current;
    const logo = document.querySelector('.logo');

    if (arrowBtn && arrow) {
      const handleMouseEnter = () => {
        gsap.to(arrow, { 
          y: 10, 
          duration: 0.8, 
          ease: 'back.inOut(3)', 
          overwrite: 'auto' 
        });
      };

      const handleMouseLeave = () => {
        gsap.to(arrow, { 
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

    // Logo hover animation - 3D tilt
    if (logo) {
      const handleLogoMouseEnter = () => {
        gsap.to(logo, { 
          rotationX: 15,
          rotationY: 15,
          duration: 0.3, 
          ease: 'power2.out', 
          overwrite: 'auto' 
        });
      };

      const handleLogoMouseLeave = () => {
        gsap.to(logo, { 
          rotationX: 0,
          rotationY: 0,
          duration: 0.3, 
          ease: 'power2.out', 
          overwrite: 'auto' 
        });
      };

      logo.addEventListener('mouseenter', handleLogoMouseEnter);
      logo.addEventListener('mouseleave', handleLogoMouseLeave);

      return () => {
        if (logo) {
          logo.removeEventListener('mouseenter', handleLogoMouseEnter);
          logo.removeEventListener('mouseleave', handleLogoMouseLeave);
        }
      };
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Responsive styles for logo and text */}
      <style>{`
    
        
        .text-responsive {
          font-size: 2.5rem;
        }
        
        @media (max-width: 768px) {
          .logo {
            width: 200px !important;
            height: 200px !important;
            x: 500px !important;
            y: 200px !important;
          }
          .text-responsive {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .logo {
            width: 150px !important;
            height: 150px !important;
            x: 525px !important;
            y: 225px !important;
          }
          .text-responsive {
            font-size: 1.5rem;
          }
        }
      `}</style>
      
      {/* Scroll distance element */}
      <div ref={scrollDistRef} className="absolute w-full h-[300vh]" />
      
      {/* Extended scroll content to ensure mask effect completes */}
      <div className="absolute top-[100vh] w-full h-[200vh] bg-transparent">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-600 mb-4">Continue Scrolling</h2>
            <p className="text-xl text-gray-500">The parallax effect continues...</p>
          </div>
        </div>
      </div>
      
      {/* Main parallax scene */}
      <main 
        ref={mainRef}
        className="relative bg-white w-full h-screen"
      >
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                                {/* Mask for the "Outback Hunting" text effect */}
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
          
          {/* Background layers */}
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
          
          {/* Logo */}
          <image 
            href="/assets/img/gareth/GarethLogoC.png" 
            x="450" 
            y="150" 
            width="300" 
            height="300"
            className="logo"
            style={{ cursor: 'pointer' }}
          />
          
          {/* Text and arrow */}
          <text 
            fill="#fff" 
            x="600" 
            y="120" 
            textAnchor="middle"
            className="text-responsive font-black"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            NEW ZEALAND
          </text>
          <polyline 
            ref={arrowRef}
            className="arrow" 
            fill="#000" 
            points="599,600 599,639 590,629 590,632 600,642 610,632 610,629 601,639 601,600" 
          />
          
                                {/* Masked text effect */}
                      <g mask="url(#m)">
                        <rect fill="#fff" width="100%" height="100%" />      
                        <text 
                          x="600" 
                          y="120" 
                          textAnchor="middle"
                          fill="#162a43" 
                          className="text-responsive font-black"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          Outback Hunting 
                        </text>
                      </g>
          
          {/* Invisible clickable area for arrow */}
          <rect 
            ref={arrowBtnRef}
            id="arrow-btn" 
            width="100" 
            height="100" 
            opacity="0" 
            x="550" 
            y="570" 
            style={{ cursor: 'pointer' }}
          />
        </svg>
      </main>
    </div>
  );
};

export default ParallaxScene;
