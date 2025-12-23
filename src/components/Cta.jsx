import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img from '/src/assets/panner.png';

gsap.registerPlugin(ScrollTrigger);

const CTAHeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- NEW: OPACITY TO GREEN FILL ANIMATION FOR HEADING ---
      const headingLines = headingRef.current.querySelectorAll('.fill-line');
      
      headingLines.forEach((line) => {
        // Initial setup for the fill effect
        gsap.set(line, {
          opacity: 0.2,
          backgroundImage: 'linear-gradient(to right, #c0ff0d 50%, transparent 50%)',
          backgroundSize: '200% 100%',
          backgroundPosition: '100% 0',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        });

        // Scroll animation to "fill" the text
        gsap.to(line, {
          opacity: 1,
          backgroundPosition: '0% 0',
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        });
      });

      // --- EXISTING ANIMATIONS FOR OTHER ELEMENTS ---
      gsap.set([textRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30,
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        y: 60,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
      .to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="bg-black text-white py-10 md:py-24 px-5 md:px-10 lg:px-10 min-h-screen flex items-center h1"
      id='cta-section'
    >
      <div className=" w-full">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          
          {/* Heading with Fill Classes */}
          <h1 ref={headingRef} className="text-xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight">
            <span className="fill-line block">Ready to begin</span>
            <span className="fill-line block text-gray-400">something great</span>
          </h1>

          {/* Description */}
          <p 
            ref={textRef}
            className=" md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Let's talk about your next project and what it could become with the right creative partnership.
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex gap-4 md:gap-6">
            <button className="px-5 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-sm">
              Start a Project
            </button>
            
            <button className="px-5 py-2 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-sm">
              Contact Us
            </button>
          </div>

          {/* Image */}
          <div 
            ref={imageRef}
            className="w-full max-w-6xl mt-8 md:mt-16 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src={img}
              alt="Woman with tablet"
              className="w-full h-auto object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CTAHeroSection;