import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import p1 from '/src/assets/p1.png';
import p2 from '/src/assets/p2.png'; // Add more imports
import p3 from '/src/assets/p3.png';
import p4 from '/src/assets/p4.png';
import p5 from '/src/assets/p5.png';

gsap.registerPlugin(ScrollTrigger);

const Studio = () => {
  const sectionRef = useRef(null);
  const slideContainerRef = useRef(null);
  const slidesRef = useRef([]);
  const progressBarRef = useRef(null);
  const currentSlideRef = useRef(0);
  const totalSlides = 5;

  // Import all your images
  const images = [p1, p2, p3, p4, p5];

  useEffect(() => {
    const container = sectionRef.current;
    const slideContainer = slideContainerRef.current;
    const slides = slidesRef.current.filter(Boolean);

    if (!container || !slideContainer || slides.length === 0) return;

    const ctx = gsap.context(() => {
      // Calculate total scroll amount
      const getScrollAmount = () => {
        const slideWidth = slides[0]?.offsetWidth || window.innerWidth * 0.8;
        const gap = 80;
        return -(slideWidth + gap) * (slides.length - 1);
      };

      // Main horizontal scroll animation
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
            // Update progress bar
            if (progressBarRef.current) {
              gsap.to(progressBarRef.current, {
                width: `${self.progress * 100}%`,
                duration: 0.1,
                overwrite: true
              });
            }

            // Calculate current slide
            const newSlide = Math.min(
              Math.floor(self.progress * slides.length),
              slides.length - 1
            );
            
            if (newSlide !== currentSlideRef.current && newSlide >= 0) {
              currentSlideRef.current = newSlide;
              
              // Update slide indicators
              const slideIndicators = document.querySelectorAll('.slide-indicator');
              slideIndicators.forEach((indicator, index) => {
                if (indicator) {
                  if (index === newSlide) {
                    gsap.to(indicator, {
                      scale: 1.5,
                      backgroundColor: '#ffffff',
                      duration: 0.3,
                    });
                  } else {
                    gsap.to(indicator, {
                      scale: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      duration: 0.3,
                    });
                  }
                }
              });

              // Update slide number
              const slideNumber = document.querySelector('.current-slide');
              if (slideNumber) {
                slideNumber.textContent = newSlide + 1;
              }
            }
          },
        },
      });

      // Animate each slide's content as it enters view
      slides.forEach((slide, index) => {
        const image = slide.querySelector('.slide-image img');
        const content = slide.querySelector('.slide-content');
        const title = slide.querySelector('.slide-title');
        const description = slide.querySelector('.slide-description');
        const tag = slide.querySelector('.slide-tag');
        const button = slide.querySelector('.slide-button');
        const decorCircles = slide.querySelectorAll('.decor-circle');

        if (!image || !content) return;

        // Create timeline for each slide
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            containerAnimation: horizontalScroll,
            start: "left center",
            end: "right center",
            scrub: 1,
          }
        });

        // Set initial states
        gsap.set([title, description, tag, button], {
          opacity: 0,
          y: 30
        });

        gsap.set(image, {
          opacity: 0,
          scale: 0.9
        });

        gsap.set(content, {
          opacity: 0,
          y: 50
        });

        gsap.set(decorCircles, {
          scale: 0,
          opacity: 0
        });

        // Animate elements
        tl.to(image, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        })
        .to(content, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.8")
        .to(tag, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.6")
        .to(title, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4")
        .to(description, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3")
        .to(button, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.2")
        .to(decorCircles, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.4");

        // Hover effects
        const handleMouseEnter = () => {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out"
          });
          
          gsap.to(title, {
            x: 10,
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(decorCircles, {
            scale: 1.2,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
          
          gsap.to(title, {
            x: 0,
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(decorCircles, {
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          });
        };

        slide.addEventListener('mouseenter', handleMouseEnter);
        slide.addEventListener('mouseleave', handleMouseLeave);
      });

    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

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
      <div className="container mx-auto px-6 pt-20 pb-10">
        <div className="mb-4">
          <span className="text-sm text-gray-400 uppercase tracking-widest">Our Studio</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Creative
          <br />
          <span className="text-gray-400">Capabilities</span>
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Explore our comprehensive suite of design and development services through this interactive showcase.
        </p>
      </div>

      {/* Horizontal Scroll Section */}
      <section 
        ref={sectionRef}
        className="relative h-screen"
      >
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-400">
              <span className="current-slide">1</span> / {totalSlides}
            </div>
            <div className="text-sm text-gray-400">
              Scroll to explore →
            </div>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="h-full bg-white w-0 transition-all"
            ></div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="fixed left-6 bottom-6 z-50 flex flex-col gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`slide-indicator w-2 h-2 rounded-full transition-all duration-300 ${
                index === 0 ? 'bg-white scale-150' : 'bg-white/30'
              }`}
            ></div>
          ))}
        </div>

        {/* Slides Container */}
        <div 
          ref={slideContainerRef}
          className="absolute top-0 left-0 h-full flex items-center gap-20 pl-6 will-change-transform"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={el => slidesRef.current[index] = el}
              className="flex-shrink-0 w-[80vw] max-w-6xl h-full flex items-center"
            >
              <div className="slide-content w-full h-[70vh] rounded-3xl overflow-hidden relative group border border-white/10">
                {/* Background Image */}
                <div className="slide-image absolute inset-0">
                  <img 
                    src={images[index]} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="slide-content relative h-full p-12 flex flex-col justify-end z-10">
                  <div className="mb-6">
                    <span className="slide-tag inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {slide.tag}
                    </span>
                  </div>
                  
                  <h2 className="slide-title text-5xl md:text-6xl font-bold mb-6">
                    {slide.title}
                  </h2>
                  
                  <p className="slide-description text-xl text-gray-200 max-w-2xl mb-12">
                    {slide.description}
                  </p>

                  <button className="slide-button inline-flex items-center gap-2 text-lg hover:gap-4 transition-all duration-300 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30">
                    <span>Learn more</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="decor-circle absolute top-6 right-6 w-12 h-12 border-2 border-white/50 rounded-full z-20"></div>
                <div className="decor-circle absolute bottom-6 left-6 w-8 h-8 border-2 border-white/50 rounded-full z-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="fixed right-6 bottom-6 z-50 text-gray-400 text-sm animate-pulse">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Scroll to navigate</span>
          </div>
        </div>
      </section>

      {/* Bottom Content */}
      <div className="container mx-auto px-6 py-20 bg-black">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Process</h3>
            <p className="text-gray-400">
              We follow a meticulous process that ensures every project delivers exceptional results while maintaining creative excellence.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Collaboration</h3>
            <p className="text-gray-400">
              Working closely with clients to understand their vision and translate it into impactful design solutions.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Innovation</h3>
            <p className="text-gray-400">
              Constantly exploring new technologies and techniques to push the boundaries of what's possible in design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;