import { useEffect, useRef, useState } from "react";
import Lenis from 'lenis';
import gsap from "gsap";
import bg from "/src/assets/nbg.mp4";

const Hero = () => {
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const logoRef = useRef(null);
  const menuButtonRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // GSAP Animations
    const runHeroAnimations = () => {
      // Check if we're at the top of the page
      const isAtTop = window.scrollY === 0;
      
      // Set initial states
      gsap.set([titleRef.current, descRef.current], {
        opacity: 0,
        y: 30
      });
      
      gsap.set(buttonsRef.current?.children, {
        opacity: 0,
        y: 20
      });
      
      gsap.set(logoRef.current, {
        opacity: 0,
        x: -20
      });
      
      gsap.set(menuButtonRef.current, {
        opacity: 0,
        x: 20
      });
      
      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 10
      });

      // Video animation
      gsap.from(videoRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "power2.out"
      });

      if (isAtTop) {
        // Run immediately if at top
        const tl = gsap.timeline({ delay: 0.3 });
        
        tl.to(logoRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(menuButtonRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.4")
        .to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .to(buttonsRef.current?.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.2");

        // Add continuous animation to scroll indicator
        gsap.to(scrollIndicatorRef.current, {
          y: -5,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1
        });
      } else {
        // Setup scroll triggers if not at top
        gsap.to(logoRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.to(menuButtonRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: menuButtonRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.to(buttonsRef.current?.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollIndicatorRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    };

    // Run animations
    runHeroAnimations();

    // Enhanced Button hover effects with GSAP
    const buttons = document.querySelectorAll(".hero-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          y: -4,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Menu button hover effect
    if (menuButtonRef.current) {
      menuButtonRef.current.addEventListener('mouseenter', () => {
        gsap.to(menuButtonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      menuButtonRef.current.addEventListener('mouseleave', () => {
        gsap.to(menuButtonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        const menuButton = document.querySelector('[data-menu-button]');
        if (menuButton && !menuButton.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Toggle body scroll
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      // Clean up GSAP animations
      gsap.killTweensOf("*");
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    
    setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(`#${sectionId}`, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300);
  };

  const menuItems = [
    { name: "Work", section: "work-section", description: "Our portfolio" },
    { name: "Studio", section: "studio-section", description: "Our process" },
    { name: "About", section: "about-section", description: "Our story" },
    { name: "CTA", section: "cta-section", description: "What we do" },
    { name: "Contact", section: "contact-section", description: "Get in touch" },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bg} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black" />

      {/* Logo - Added ref */}
      <div ref={logoRef} className="absolute top-6 left-6 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl font-serif h1 text-white">NOIR</span>
        </div>
      </div>

      {/* Menu Button - Added ref */}
      <button
        ref={menuButtonRef}
        data-menu-button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-6 right-6 z-50 flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 hover:bg-white/20 ${
          isMenuOpen ? 'bg-white/20' : ''
        }`}
      >
        <span className="text-xs text-white/80 font-medium">MENU</span>
        <div className="flex flex-col gap-1">
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Menu Overlay - This covers the whole screen */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Menu Panel - Now with proper scrolling */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-black/95 backdrop-blur-xl z-50 transform transition-transform duration-700 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } border-l border-white/10 flex flex-col`}
        style={{ boxShadow: isMenuOpen ? '-20px 0 60px rgba(0,0,0,0.8)' : 'none' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Menu Header - Fixed */}
        <div className="p-8 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-serif italic text-white">Navigation</h2>
          </div>
          <p className="text-white/60 text-sm">Select a section to navigate</p>
        </div>

        {/* Menu Items - Scrollable area */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="p-6 space-y-1">
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className="group menu-item"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => scrollToSection(item.section)}
                  className="w-full text-left p-6 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-between group-hover:translate-x-2"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-2xl text-white/40 font-serif group-hover:text-white transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white group-hover:text-white/90 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/60 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-white/40 group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
                
                {index < menuItems.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-8 border-t border-white/10 flex-shrink-0 bg-black/95">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/60">© 2024 NOIR Studio</p>
              <p className="text-xs text-white/40 mt-1">All rights reserved</p>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-2.5 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 text-sm"
            >
              Close Menu
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 h-64 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-8 right-8 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute bottom-32 right-12 w-16 h-16 border border-white/5 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full grid md:grid-cols-2 items-center gap-12">
        <h1
          ref={titleRef}
          className="text-2xl md:text-5xl lg:text-5xl h1"
        >
          We build experiences that endure
        </h1>

        <div className="space-y-6 text-left md:text-right">
          <p ref={descRef} className="text-base md:text-lg text-white/90 max-w-md md:ml-auto">
            A creative studio crafting timeless design for brands that matter. We work at the intersection of strategy and beauty.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <button 
              onClick={() => scrollToSection("work-section")}
              className="hero-btn px-6 py-2.5 bg-white text-black font-bold rounded hover:shadow-lg hover:shadow-white/30 transition-all duration-300"
            >
              Explore Work
            </button>
            <button 
              onClick={() => scrollToSection("about-section")}
              className="hero-btn px-6 py-2.5 border border-white text-white font-bold rounded hover:bg-white/10 transition-all duration-300"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Added ref */}
      <div 
        ref={scrollIndicatorRef}
        onClick={() => scrollToSection("work-section")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce text-2xl cursor-pointer hover:text-white transition-colors duration-300"
      >
        ↓
      </div>
    </section>
  );
};

export default Hero;