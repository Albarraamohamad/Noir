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

  const images = [p1, p2, p3, p4, p5];

  const titleWords = ["NIGHT", "PERFORMANCE"];
  const firstWordLetters = titleWords[0].split('');
  const secondWordLetters = titleWords[1].split('');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
        document.head.appendChild(scrollTriggerScript);
        scrollTriggerScript.onload = () => {
          const { gsap, ScrollTrigger } = window;
          gsap.registerPlugin(ScrollTrigger);
          
          const allLetters = lettersRef.current.filter(Boolean);

          if (allLetters.length > 0) {
            // --- NEW: GRADIENT FILL ANIMATION ---
            // 1. Initial State: Dim and transparent gradient
            gsap.set(allLetters, {
              opacity: 0.2,
              backgroundImage: 'linear-gradient(to right, #c0ff0d 50%, transparent 50%)',
              backgroundSize: '200% 100%',
              backgroundPosition: '100% 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            });

            // 2. Scroll Animation: Fill letters with green as you scroll
            gsap.to(allLetters, {
              opacity: 1,
              backgroundPosition: '0% 0',
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: titleContainerRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
              }
            });

            // 3. Keep your Hover interactions
            allLetters.forEach((letter) => {
              letter.addEventListener('mouseenter', () => {
                gsap.to(letter, {
                  scale: 1.2,
                  y: -5,
                  duration: 0.3,
                  ease: "back.out(1.7)",
                });
              });

              letter.addEventListener('mouseleave', () => {
                gsap.to(letter, {
                  scale: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power2.out",
                });
              });
            });
          }

          // Desktop horizontal scroll logic
          if (!isMobile) {
            const container = sectionRef.current;
            const slideContainer = slideContainerRef.current;
            const slides = slidesRef.current.filter(Boolean);

            if (container && slideContainer && slides.length > 0) {
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
                      gsap.set(progressBarRef.current, { width: `${self.progress * 100}%` });
                    }
                    const newSlide = Math.min(Math.floor(self.progress * slides.length), slides.length - 1);
                    if (newSlide !== currentSlideRef.current && newSlide >= 0) {
                      currentSlideRef.current = newSlide;
                      setActiveSlide(newSlide);
                    }
                  },
                },
              });
            }
          }
        };
      };
      document.head.appendChild(gsapScript);
    };

    loadGSAP();
  }, [isMobile]);

  const slides = [
    { id: 1, title: "Brand Identity", description: "Crafting memorable visual systems that communicate brand essence.", tag: "Strategy" },
    { id: 2, title: "Digital Experience", description: "Building immersive digital platforms that engage audiences.", tag: "Web & Mobile" },
    { id: 3, title: "Motion Design", description: "Bringing brands to life through fluid animation.", tag: "Animation" },
    { id: 4, title: "Campaign Strategy", description: "Developing marketing campaigns that drive results.", tag: "Marketing" },
    { id: 5, title: "Content Creation", description: "Producing visual content that tells compelling stories.", tag: "Production" },
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
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 tracking-tighter">
          <div ref={titleContainerRef} className="leading-none">
            <div className="flex flex-wrap gap-x-4 sm:gap-x-8">
              <span className="inline-block whitespace-nowrap">
                {firstWordLetters.map((letter, index) => (
                  <span
                    key={`night-${index}`}
                    ref={el => lettersRef.current[index] = el}
                    className="inline-block"
                  >
                    {letter}
                  </span>
                ))}
              </span>
              
              <span className="inline-block whitespace-nowrap">
                {secondWordLetters.map((letter, index) => (
                  <span
                    key={`performance-${index}`}
                    ref={el => lettersRef.current[firstWordLetters.length + index] = el}
                    className="inline-block"
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </h1>
        
        <p className="description text-gray-500 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed mt-8">
          Explore our comprehensive suite of design and development services.
        </p>
      </div>

      {/* Desktop / Mobile Content Toggle */}
      {!isMobile ? (
        <section ref={sectionRef} className="relative h-screen">
          <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">
                <span>{activeSlide + 1}</span> / {totalSlides}
              </div>
              <div className="text-sm text-gray-400 font-bold uppercase tracking-tighter">Scroll to explore →</div>
            </div>
            <div className="h-[2px] bg-gray-800 rounded-full overflow-hidden">
              <div ref={progressBarRef} className="h-full bg-[#c0ff0d] w-0"></div>
            </div>
          </div>

          <div ref={slideContainerRef} className="absolute top-0 left-0 h-full flex items-center gap-20 pl-6">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                ref={el => slidesRef.current[index] = el}
                className="flex-shrink-0 w-[85vw] max-w-6xl h-full flex items-center"
              >
                <div className="w-full h-[75vh]  overflow-hidden relative group">
                  <div className="slide-image absolute inset-0">
                    <img src={images[index]} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  </div>
                  <div className="slide-content relative h-full p-12 flex flex-col justify-end z-10">
                    <span className="inline-block px-4 py-1 bg-[#c0ff0d] text-black rounded-full text-xs font-bold uppercase mb-4 w-fit">
                      {slide.tag}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter leading-none">{slide.title}</h2>
                    <p className="text-lg text-gray-400 max-w-xl mb-8">{slide.description}</p>
                    <button className="flex items-center gap-4 text-[#c0ff0d] font-bold uppercase tracking-widest text-sm group/btn">
                      Learn more <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="px-4 py-8 space-y-6">
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full h-[500px] rounded-3xl overflow-hidden relative border border-white/10">
              <img src={images[index]} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative h-full p-8 flex flex-col justify-end">
                <h2 className="text-3xl font-black uppercase mb-2">{slide.title}</h2>
                <p className="text-sm text-gray-400 mb-4">{slide.description}</p>
                <button className="text-[#c0ff0d] font-bold text-sm uppercase">Learn more →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Content */}
      <div className="container mx-auto px-4 sm:px-6 py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {['Our Process', 'Collaboration', 'Innovation'].map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-black uppercase mb-4 text-[#c0ff0d]">{item}</h3>
              <p className="text-gray-500 leading-relaxed">
                {i === 0 && "We follow a meticulous process that ensures every project delivers results."}
                {i === 1 && "Working closely with clients to translate vision into impactful solutions."}
                {i === 2 && "Constantly exploring new technologies to push the boundaries of design."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Studio;