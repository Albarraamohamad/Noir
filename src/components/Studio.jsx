import React, { useEffect, useRef, useState } from 'react';
import p1 from '/src/assets/p1.png';
import p2 from '/src/assets/p2.png';
import p3 from '/src/assets/p3.png';
import p4 from '/src/assets/p4.png';
import p5 from '/src/assets/p5.png';

const Studio = () => {
  const sectionRef = useRef(null);
  const slideContainerRef = useRef(null);
  const slidesRef = useRef([]);
  const progressBarRef = useRef(null);
  const titleContainerRef = useRef(null);
  const lettersRef = useRef([]);
  const currentSlideRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = 5;

  const images = [
    p1,
    p2,
    p3,
    p4,
    p5
  ];

  const titleWords = ["NIGHT", "PERFORMANCE"];
  const firstWordLetters = titleWords[0].split('');
  const secondWordLetters = titleWords[1].split('');

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadGSAP = () => {
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.async = true;
      
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.async = true;
      
      gsapScript.onload = () => {
        scrollTriggerScript.onload = () => {
          const { gsap } = window;
          
          if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(window.ScrollTrigger);
            
            // Title animation
            const animateTitle = () => {
              const allLetters = lettersRef.current.filter(Boolean);
              
              if (allLetters.length > 0) {
                gsap.set(allLetters, {
                  opacity: 0,
                  y: 40,
                  rotationX: -30,
                  scale: 0.8
                });

                const titleTl = gsap.timeline({
                  delay: 0.5,
                  onComplete: () => {
                    gsap.to(allLetters, {
                      y: -3,
                      duration: 2,
                      repeat: -1,
                      yoyo: true,
                      ease: "sine.inOut",
                      stagger: {
                        amount: 0.8,
                        from: "random"
                      }
                    });
                  }
                });

                titleTl.to(allLetters.slice(0, firstWordLetters.length), {
                  opacity: 1,
                  y: 0,
                  rotationX: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                  stagger: 0.08
                });

                titleTl.to(allLetters.slice(firstWordLetters.length), {
                  opacity: 1,
                  y: 0,
                  rotationX: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                  stagger: 0.06,
                  color: "#c0ff0d"
                }, "-=0.5");

                allLetters.forEach((letter, index) => {
                  if (letter) {
                    letter.addEventListener('mouseenter', () => {
                      gsap.to(letter, {
                        scale: 1.3,
                        y: -8,
                        duration: 0.3,
                        ease: "back.out(1.7)",
                        color: '#c0ff0d'
                      });
                    });

                    letter.addEventListener('mouseleave', () => {
                      gsap.to(letter, {
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out",
                        color: index < firstWordLetters.length ? '#c0ff0d' : '#c0ff0d'
                      });
                    });
                  }
                });
              }
            };

            const timer = setTimeout(() => {
              animateTitle();
            }, 100);

            // Desktop horizontal scroll
            if (!isMobile) {
              const container = sectionRef.current;
              const slideContainer = slideContainerRef.current;
              const slides = slidesRef.current.filter(Boolean);

              if (container && slideContainer && slides.length > 0) {
                gsap.from('.about-text', {
                  opacity: 0,
                  y: 30,
                  duration: 1,
                  ease: "power3.out",
                  delay: 0.2
                });

                gsap.from('.description', {
                  opacity: 0,
                  y: 40,
                  duration: 1.2,
                  ease: "power3.out",
                  delay: 1.2
                });

                const getScrollAmount = () => {
                  const slideWidth = slides[0]?.offsetWidth || window.innerWidth * 0.8;
                  const gap = 80;
                  return -(slideWidth + gap) * (slides.length - 1);
                };

                const horizontalScroll = gsap.to(slideContainer, {
                  x: getScrollAmount,
                  ease: "none",
                  scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount()) + window.innerWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                      if (progressBarRef.current) {
                        gsap.to(progressBarRef.current, {
                          width: `${self.progress * 100}%`,
                          duration: 0.1
                        });
                      }

                      const newSlide = Math.min(
                        Math.floor(self.progress * slides.length),
                        slides.length - 1
                      );
                      
                      if (newSlide !== currentSlideRef.current && newSlide >= 0) {
                        currentSlideRef.current = newSlide;
                        setActiveSlide(newSlide);
                      }
                    },
                  },
                });

                slides.forEach((slide) => {
                  const image = slide.querySelector('.slide-image img');
                  const content = slide.querySelector('.slide-content');

                  if (image && content) {
                    const tl = gsap.timeline({
                      scrollTrigger: {
                        trigger: slide,
                        containerAnimation: horizontalScroll,
                        start: "left center",
                        end: "right center",
                        scrub: 1,
                      }
                    });

                    tl.to(image, {
                      opacity: 1,
                      scale: 1,
                      duration: 1,
                      ease: "power2.out"
                    });
                  }

                  slide.addEventListener('mouseenter', () => {
                    if (image) {
                      gsap.to(image, {
                        scale: 1.05,
                        duration: 0.6,
                        ease: "power2.out"
                      });
                    }
                  });

                  slide.addEventListener('mouseleave', () => {
                    if (image) {
                      gsap.to(image, {
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out"
                      });
                    }
                  });
                });
              }
            }

            return () => {
              clearTimeout(timer);
            };
          }
        };
        
        document.head.appendChild(scrollTriggerScript);
      };
      
      document.head.appendChild(gsapScript);
    };

    loadGSAP();
  }, [isMobile]);

  const slides = [
    {
      id: 1,
      title: "Brand Identity",
      description: "Crafting memorable visual systems that communicate brand essence and values.",
      tag: "Strategy",
    },
    {
      id: 2,
      title: "Digital Experience",
      description: "Building immersive digital platforms that engage and convert audiences.",
      tag: "Web & Mobile",
    },
    {
      id: 3,
      title: "Motion Design",
      description: "Bringing brands to life through fluid animation and cinematic storytelling.",
      tag: "Animation",
    },
    {
      id: 4,
      title: "Campaign Strategy",
      description: "Developing comprehensive marketing campaigns that drive measurable results.",
      tag: "Marketing",
    },
    {
      id: 5,
      title: "Content Creation",
      description: "Producing high-quality visual content that tells compelling brand stories.",
      tag: "Production",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-6 sm:pb-10">
        <div className="mb-4">
          <span className="about-text text-xs sm:text-sm text-gray-400 uppercase tracking-widest inline-block">
            About Us
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
          <div ref={titleContainerRef} className="leading-tight">
            <span className="inline-block mr-2 sm:mr-4">
              {firstWordLetters.map((letter, index) => (
                <span
                  key={`night-${index}`}
                  ref={el => lettersRef.current[index] = el}
                  className="letter inline-block relative cursor-pointer"
                  style={{
                    opacity: 0,
                    transformOrigin: 'center center',
                    perspective: '1000px'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
            
            <span className="inline-block text-gray-400">
              {secondWordLetters.map((letter, index) => (
                <span
                  key={`performance-${index}`}
                  ref={el => lettersRef.current[firstWordLetters.length + index] = el}
                  className="letter inline-block relative cursor-pointer"
                  style={{
                    opacity: 0,
                    transformOrigin: 'center center',
                    perspective: '1000px'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </h1>
        
        <p className="description text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
          Explore our comprehensive suite of design and development services.
        </p>
      </div>

      {/* Desktop: Horizontal Scroll | Mobile: Vertical Stack */}
      {!isMobile ? (
        <section ref={sectionRef} className="relative h-screen">
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">
                <span className="current-slide">{activeSlide + 1}</span> / {totalSlides}
              </div>
              <div className="text-sm text-gray-400">Scroll to explore →</div>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div ref={progressBarRef} className="h-full bg-white w-0"></div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="fixed left-6 bottom-6 z-50 flex flex-col gap-3">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide ? 'bg-white scale-150' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>

          {/* Slides Container */}
          <div 
            ref={slideContainerRef}
            className="absolute top-0 left-0 h-full flex items-center gap-20 pl-6"
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                ref={el => slidesRef.current[index] = el}
                className="flex-shrink-0 w-[80vw] max-w-6xl h-full flex items-center"
              >
                <div className="w-full h-[70vh] rounded-3xl overflow-hidden relative group border border-white/10">
                  <div className="slide-image absolute inset-0">
                    <img 
                      src={images[index]} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  </div>

                  <div className="slide-content relative h-full p-12 flex flex-col justify-end z-10">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {slide.tag}
                      </span>
                    </div>
                    
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                      {slide.title}
                    </h2>
                    
                    <p className="text-xl text-gray-200 max-w-2xl mb-12">
                      {slide.description}
                    </p>

                    <button className="inline-flex items-center gap-2 text-lg hover:gap-4 transition-all duration-300 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30">
                      <span>Learn more</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Mobile: Vertical Stack */
        <div className="px-4 sm:px-6 py-8 space-y-6">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="w-full h-[500px] rounded-2xl overflow-hidden relative border border-white/10"
            >
              <div className="absolute inset-0">
                <img 
                  src={images[index]} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>

              <div className="relative h-full p-6 flex flex-col justify-end z-10">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    {slide.tag}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold mb-3">
                  {slide.title}
                </h2>
                
                <p className="text-sm text-gray-200 mb-6">
                  {slide.description}
                </p>

                <button className="inline-flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 w-fit">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Process</h3>
            <p className="text-sm sm:text-base text-gray-400">
              We follow a meticulous process that ensures every project delivers exceptional results.
            </p>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Collaboration</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Working closely with clients to understand their vision and translate it into impactful solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Innovation</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Constantly exploring new technologies to push the boundaries of what's possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;