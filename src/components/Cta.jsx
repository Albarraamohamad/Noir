import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img from '/src/assets/panner.png'

gsap.registerPlugin(ScrollTrigger);

const CTAHeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headingRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap.set(textRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(buttonsRef.current, {
        opacity: 0,
        y: 30,
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        y: 60,
      });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
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
      className="bg-black h1 text-white py-16 px-5 md:px-10 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Heading */}
          <h1 ref={headingRef} className="text-xl md:text-4xl lg:text-4xl xl:text-5xl ">
            Ready to begin
            <br />
            something great
          </h1>

          {/* Description */}
          <p 
            ref={textRef}
            className="text-base md:text-lg text-gray-300 max-w-2xl"
          >
            Let's talk about your next project and what it could become with the right creative partnership.
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300">
              Start
            </button>
            
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300">
              Contact
            </button>
          </div>

          {/* Image */}
          <div 
            ref={imageRef}
            className="w-full w-4xl mt-8 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={img}
              alt="Woman with tablet at New York Coffee shop"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CTAHeroSection;