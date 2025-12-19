import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AdvancedStudioSection = () => {
  const sectionRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const textRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Advanced initial states with 3D transforms
      gsap.set(image1Ref.current, {
        opacity: 0,
        y: 100,
        x: -50,
        rotateY: -25,
        rotateX: 15,
        scale: 0.8,
      });
      
      gsap.set(image2Ref.current, {
        opacity: 0,
        y: 100,
        x: 50,
        rotateY: 25,
        rotateX: 15,
        scale: 0.8,
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.5,
        rotation: -180,
      });

      // Split title into words for advanced animation
      const titleWords = titleRef.current.querySelectorAll('.word');
      gsap.set(titleWords, {
        opacity: 0,
        y: 80,
        rotateX: -90,
        transformOrigin: 'center bottom',
      });

      gsap.set(descRef.current, {
        opacity: 0,
        y: 50,
        clipPath: 'inset(0% 100% 0% 0%)',
      });

      const buttons = buttonsRef.current.querySelectorAll('button');
      gsap.set(buttons, {
        opacity: 0,
        scale: 0,
        rotation: 180,
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

      // Label animation with elastic effect
      mainTl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
      })
      
      // Image 1 complex entrance
      .to(image1Ref.current, {
        opacity: 1,
        y: 0,
        x: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.7')
      
      // Image 2 complex entrance with delay
      .to(image2Ref.current, {
        opacity: 1,
        y: 0,
        x: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.8')
      
      // Title words cascade
      .to(titleWords, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)',
      }, '-=0.8')
      
      // Description wipe effect
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        ease: 'power3.inOut',
      }, '-=0.4')
      
      // Buttons pop in
      .to(buttons, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      }, '-=0.5');

      // Advanced parallax effects
      gsap.to(image1Ref.current, {
        y: -60,
        x: -20,
        rotation: -2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.to(image2Ref.current, {
        y: -80,
        x: 20,
        rotation: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Text parallax
      gsap.to(textRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Continuous floating animations
      gsap.to(image1Ref.current, {
        y: '+=15',
        rotation: '-=1',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to(image2Ref.current, {
        y: '+=20',
        rotation: '+=1',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5,
      });

      // Hover animations for images
      const img1Inner = image1Ref.current.querySelector('img');
      const img2Inner = image2Ref.current.querySelector('img');

      image1Ref.current.addEventListener('mouseenter', () => {
        gsap.to(image1Ref.current, {
          scale: 1.05,
          rotation: -3,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(img1Inner, {
          scale: 1.15,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      image1Ref.current.addEventListener('mouseleave', () => {
        gsap.to(image1Ref.current, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(img1Inner, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      image2Ref.current.addEventListener('mouseenter', () => {
        gsap.to(image2Ref.current, {
          scale: 1.05,
          rotation: 3,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(img2Inner, {
          scale: 1.15,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      image2Ref.current.addEventListener('mouseleave', () => {
        gsap.to(image2Ref.current, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(img2Inner, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      // Button hover animations
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            y: -3,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Images Section */}
          <div ref={imageContainerRef} className="relative h-[600px] lg:h-[700px]" style={{ perspective: '1200px' }}>
            {/* Background Image */}
            <div 
              ref={image1Ref}
              className="absolute left-0 top-0 w-[70%] h-[75%] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Foreground Image */}
            <div 
              ref={image2Ref}
              className="absolute right-0 bottom-0 w-[70%] h-[65%] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=800&fit=crop"
                alt="Design discussion"
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="space-y-8" style={{ perspective: '1000px' }}>
            <div ref={labelRef} className="inline-block">
              <span className="text-sm font-semibold tracking-wider uppercase text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                Studio
              </span>
            </div>

            <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900" style={{ transformStyle: 'preserve-3d' }}>
              <span className="word inline-block">We</span>{' '}
              <span className="word inline-block">believe</span>{' '}
              <span className="word inline-block">in</span>{' '}
              <span className="word block mt-2">design</span>{' '}
              <span className="word inline-block">that</span>{' '}
              <span className="word inline-block">matters</span>
            </h1>

            <p ref={descRef} className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Our work emerges from a simple conviction: that thoughtful design shapes how people experience the world. We move deliberately, without compromise, building work that resonates long after the first encounter.
            </p>

            <div ref={buttonsRef} className="flex gap-4 pt-4">
              <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Our approach
              </button>
              
              <button className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl">
                Explore
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdvancedStudioSection;