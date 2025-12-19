import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);

const AdvancedCTAHeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading into characters
      const headingChars = headingRef.current.querySelectorAll('.char');
      const textChars = textRef.current.querySelectorAll('.text-char');
      const buttons = buttonsRef.current.querySelectorAll('button');
      
      // Advanced initial states
      gsap.set(headingChars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        scale: 0.5,
        transformOrigin: 'center bottom',
      });

      gsap.set(textChars, {
        opacity: 0,
        y: 50,
        x: (i) => (i % 2 === 0 ? -20 : 20),
      });

      gsap.set(buttons, {
        opacity: 0,
        scale: 0,
        rotation: 180,
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.7,
        rotateY: -25,
        rotateX: 15,
      });

      gsap.set(glowRef.current, {
        opacity: 0,
        scale: 0.5,
      });

      // Main entrance timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });

      // Character cascade with 3D effect
      mainTl.to(headingChars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        stagger: {
          each: 0.03,
          from: 'start',
        },
        ease: 'back.out(1.5)',
      })
      
      // Text characters wave effect
      .to(textChars, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.8,
        stagger: {
          each: 0.02,
          from: 'center',
        },
        ease: 'power3.out',
      }, '-=0.5')
      
      // Buttons with elastic pop
      .to(buttons, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.6)',
      }, '-=0.4')

      // Glow effect
      .to(glowRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
      }, '-=1')
      
      // Image 3D entrance
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 1.5,
        ease: 'power4.out',
      }, '-=1');

      // Continuous floating animations
      gsap.to(imageRef.current, {
        y: -20,
        rotation: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax on scroll
      gsap.to(headingRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.to(textRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.to(imageRef.current, {
        y: 50,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Button hover animations
      buttons.forEach((button, index) => {
        const isWhiteButton = index === 0;
        
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            y: -5,
            duration: 0.4,
            ease: 'back.out(1.7)',
          });

          if (isWhiteButton) {
            gsap.to(button, {
              boxShadow: '0 10px 40px rgba(255, 255, 255, 0.3)',
              duration: 0.4,
            });
          } else {
            gsap.to(button, {
              boxShadow: '0 10px 40px rgba(255, 255, 255, 0.2)',
              duration: 0.4,
            });
          }
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      });

      // Image hover effect
      const imageInner = imageRef.current.querySelector('img');
      
      imageRef.current.addEventListener('mouseenter', () => {
        gsap.to(imageInner, {
          scale: 1.1,
          rotation: 2,
          duration: 0.8,
          ease: 'power2.out',
        });
        
        gsap.to(imageRef.current, {
          boxShadow: '0 30px 80px rgba(255, 255, 255, 0.2)',
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      imageRef.current.addEventListener('mouseleave', () => {
        gsap.to(imageInner, {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
        
        gsap.to(imageRef.current, {
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          duration: 0.8,
          ease: 'power2.out',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split text into characters
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const splitTextChars = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="text-char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div 
      ref={sectionRef} 
      className="relative min-h-screen bg-black text-white py-20 px-6 md:px-12 lg:px-20 flex items-center overflow-hidden"
    >
      {/* Animated background glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none"
      ></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Heading */}
          <div ref={headingRef} className="space-y-4" style={{ perspective: '1000px' }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <div className="overflow-hidden">
                {splitText('Ready to begin')}
              </div>
              <br />
              <div className="block overflow-hidden mt-2">
                {splitText('something great')}
              </div>
            </h1>
          </div>

          {/* Description */}
          <p 
            ref={textRef}
            className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed"
          >
            {splitTextChars("Let's talk about your next project and what it could become with the right creative partnership.")}
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4 justify-center">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full transition-all duration-300">
              Start
            </button>
            
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300">
              Contact
            </button>
          </div>

          {/* Image */}
          <div 
            ref={imageRef}
            className="relative w-full max-w-4xl mt-16 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
            style={{ 
              transformStyle: 'preserve-3d',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop"
              alt="Woman with tablet at New York Coffee shop"
              className="w-full h-full object-cover transition-transform duration-800"
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full opacity-70"></div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-70"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-white rounded-full opacity-70"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full opacity-70"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdvancedCTAHeroSection;