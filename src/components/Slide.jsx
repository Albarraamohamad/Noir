import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import design from '/src/assets/design.png';
import design2 from '/src/assets/image.png';

gsap.registerPlugin(ScrollTrigger);

const NightPerformance = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleWordsRef = useRef([]);
  const projectCardsRef = useRef([]);
  const rightColumnRef = useRef(null);
  const footerRef = useRef(null);
  const metricsRef = useRef(null);
  const progressBarsRef = useRef([]);
  const percentageTextsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Prevent animations from running multiple times
      const elements = {
        header: headerRef.current,
        titleWords: titleWordsRef.current,
        projectCards: projectCardsRef.current,
        rightColumn: rightColumnRef.current,
        footer: footerRef.current,
        metrics: metricsRef.current
      };

      // Header elements stagger animation
      const headerElements = elements.header?.querySelectorAll('.header-element');
      if (headerElements) {
        gsap.fromTo(headerElements,
          {
            opacity: 0,
            y: 30,
            rotateX: -10,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elements.header,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            }
          }
        );
      }

      // Split title animation with individual letters
      const titleText = "NIGHT PERFORMANCE";
      const titleContainer = elements.header?.querySelector('.title-container');
      if (titleContainer) {
        // Clear existing content
        titleContainer.innerHTML = '';
        
        // Create letter spans for each word
        const words = titleText.split(' ');
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = `inline-block mr-4 ${wordIndex === 1 ? 'text-[#c0ff0d]' : ''}`;
          
          word.split('').forEach((letter, letterIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'inline-block letter';
            letterSpan.textContent = letter;
            letterSpan.style.opacity = '0';
            letterSpan.style.transform = 'translateY(20px) rotateX(-30deg)';
            wordSpan.appendChild(letterSpan);
            
            // Animate each letter
            gsap.to(letterSpan, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              delay: wordIndex * 0.3 + letterIndex * 0.05,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: elements.header,
                start: 'top 70%',
                toggleActions: 'play none none none',
                once: true,
              }
            });
          });
          
          titleContainer.appendChild(wordSpan);
          if (wordIndex === 0) {
            const br = document.createElement('br');
            titleContainer.appendChild(br);
          }
        });
      }

      // Project cards animations
      elements.projectCards?.forEach((card, index) => {
        if (!card) return;

        const image = card.querySelector('.project-image');
        const imageInner = card.querySelector('.project-image img');
        const year = card.querySelector('.project-year');
        const category = card.querySelector('.project-category');
        const title = card.querySelector('.project-title');
        const description = card.querySelector('.project-description');

        // Set initial states
        gsap.set(card, {
          opacity: 0,
          y: 100,
          rotateY: -15,
          scale: 0.9,
        });

        gsap.set(image, {
          clipPath: 'inset(100% 0% 0% 0%)',
        });

        gsap.set(imageInner, {
          scale: 1.2,
        });

        gsap.set([year, category], {
          opacity: 0,
          x: -20,
        });

        gsap.set(title, {
          opacity: 0,
          y: 30,
          rotationX: -20,
        });

        gsap.set(description, {
          opacity: 0,
          y: 20,
        });

        // Create animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          }
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.2,
        })
        .to(image, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power4.out',
        }, '-=0.5')
        .to(imageInner, {
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, '-=1')
        .to([year, category], {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.4')
        .to(title, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
        .to(description, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.3');

        // Hover animations
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to(imageInner, {
            scale: 1.05,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(title, {
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out',
          });

          // Create floating particles effect
          for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-white/30 rounded-full';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            image.appendChild(particle);

            gsap.to(particle, {
              y: -20,
              x: (Math.random() - 0.5) * 20,
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
              onComplete: () => particle.remove(),
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });

          gsap.to(imageInner, {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });

          gsap.to(title, {
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      // Right column animations
      if (elements.rightColumn) {
        const rightColumnElements = elements.rightColumn.querySelectorAll('.right-column-element');
        gsap.fromTo(rightColumnElements,
          {
            opacity: 0,
            x: 50,
            rotationY: -20,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elements.rightColumn,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            }
          }
        );
      }

      // PROJECT IMPACT METRICS - Continuous scroll animation
      if (elements.metrics) {
        const targetWidths = [75, 66, 50];
        const targetPercentages = [240, 180, 150];

        // Reset initial state
        progressBarsRef.current.forEach((bar) => {
          if (bar) {
            gsap.set(bar, { width: '0%' });
          }
        });

        percentageTextsRef.current.forEach((text) => {
          if (text) {
            text.textContent = '+0%';
          }
        });

        // Create continuous scroll trigger
        ScrollTrigger.create({
          trigger: elements.metrics,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            progressBarsRef.current.forEach((bar, index) => {
              if (bar) {
                const currentWidth = targetWidths[index] * progress;
                gsap.to(bar, {
                  width: `${currentWidth}%`,
                  duration: 0.1,
                  overwrite: true,
                  ease: 'none'
                });
              }
            });

            percentageTextsRef.current.forEach((text, index) => {
              if (text) {
                const currentPercentage = Math.round(targetPercentages[index] * progress);
                text.textContent = `+${currentPercentage}%`;
              }
            });
          }
        });
      }

      // Footer animations
      if (elements.footer) {
        const footerElements = elements.footer.querySelectorAll('.footer-element');
        gsap.fromTo(footerElements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elements.footer,
              start: 'top 95%',
              toggleActions: 'play none none none',
              once: true,
            }
          }
        );

        // Animate border growth
        const borderTop = elements.footer.querySelector('.border-t');
        if (borderTop) {
          gsap.fromTo(borderTop,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              duration: 1.5,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: elements.footer,
                start: 'top 100%',
                toggleActions: 'play none none none',
                once: true,
              }
            }
          );
        }
      }

      // Background parallax effect
      const bgElements = document.querySelectorAll('.bg-parallax');
      bgElements.forEach(el => {
        gsap.to(el, {
          y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black text-white font-sans overflow-hidden" id='studio-section'>
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-900/10 to-transparent rounded-full blur-3xl bg-parallax"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-900/10 to-transparent rounded-full blur-3xl bg-parallax"></div>
        </div>

        {/* Header Section */}
        <div ref={headerRef} className="mb-16 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="header-element text-sm text-gray-500 tracking-widest uppercase">
              Creative Studio
            </div>
            <div className="header-element text-sm text-gray-500">01/06</div>
          </div>
          
          <div className="title-container text-5xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            {/* Letters will be inserted by GSAP */}
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="header-element text-sm text-gray-500">Design Agency Portfolio</div>
            <div className="header-element text-sm text-gray-500">2014</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          {/* Left Column - Project showcase */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {/* Project showcase grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Project */}
                <div 
                  ref={el => projectCardsRef.current[0] = el}
                  className="group relative"
                >
                  <div className="project-image relative overflow-hidden mb-4 aspect-[4/3] bg-gray-100">
                    <img 
                      src={design} 
                      alt="Brand Identity Design" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="project-year text-sm text-gray-500">2014</div>
                      <div className="project-category text-xs text-gray-400 uppercase tracking-wider">Brand Identity</div>
                    </div>
                    <h3 className="project-title text-2xl font-bold tracking-tight">BATTORIA</h3>
                    <p className="project-description text-sm text-gray-600">
                      Complete brand overhaul for luxury automotive client
                    </p>
                  </div>
                </div>

                {/* Second Project */}
                <div 
                  ref={el => projectCardsRef.current[1] = el}
                  className="group relative"
                >
                  <div className="project-image relative overflow-hidden mb-4 aspect-[4/3] bg-gray-100">
                    <img 
                      src={design2} 
                      alt="Digital Campaign" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="project-year text-sm text-gray-500">2014</div>
                      <div className="project-category text-xs text-gray-400 uppercase tracking-wider">Digital Campaign</div>
                    </div>
                    <h3 className="project-title text-2xl font-bold tracking-tight">PERFORMANCE GALA</h3>
                    <p className="project-description text-sm text-gray-600">
                      Multi-platform digital experience for annual industry event
                    </p>
                  </div>
                </div>
              </div>

              {/* Agency Philosophy */}
              <div className="pt-12 border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                      Our Approach
                    </h4>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-xl text-gray-700 leading-relaxed">
                      Since our founding, we've approached design as a performance art—where every pixel, 
                      every interaction, and every brand experience must work in perfect harmony to create 
                      something truly memorable.
                    </p>
                    <div className="mt-6 flex items-center gap-6">
                      <div className="text-sm text-gray-500">
                        <div className="font-medium">Services</div>
                        <div>Brand Identity</div>
                        <div>Digital Design</div>
                        <div>Motion Graphics</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="font-medium">Clients</div>
                        <div>Automotive</div>
                        <div>Luxury</div>
                        <div>Events</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Agency Details */}
          <div ref={rightColumnRef} className="space-y-12">
            {/* Year Emphasis */}
            <div className="right-column-element p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 mb-2">14</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">Award Year</div>
                <div className="text-xs text-gray-400 mt-1">5 Design Awards</div>
              </div>
            </div>

            {/* Agency Description */}
            <div className="right-column-element space-y-6">
              <h3 className="text-lg font-semibold">About the Studio</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Night Performance is a design agency specializing in creating bold, 
                performance-driven brand experiences. We believe in design that doesn't 
                just look good—it performs.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our 2014 portfolio represents a breakthrough year where we refined our 
                signature aesthetic: minimal, impactful, and technically precise.
              </p>
            </div>

            {/* Project Impact Metrics - Animated with Scroll */}
            <div ref={metricsRef} className="right-column-element space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-lg">
              <h4 className="text-sm uppercase tracking-widest text-black font-semibold">Project Impact</h4>
              <div className="space-y-4">
                {/* Client Growth */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Client Growth</span>
                    <span 
                      ref={el => percentageTextsRef.current[0] = el}
                      className="text-sm font-bold text-black"
                    >
                      +0%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      ref={el => progressBarsRef.current[0] = el}
                      className="h-full bg-black rounded-full"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Engagement */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Engagement</span>
                    <span 
                      ref={el => percentageTextsRef.current[1] = el}
                      className="text-sm font-bold text-black"
                    >
                      +0%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      ref={el => progressBarsRef.current[1] = el}
                      className="h-full bg-black rounded-full"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Brand Recognition */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Brand Recognition</span>
                    <span 
                      ref={el => percentageTextsRef.current[2] = el}
                      className="text-sm font-bold text-black"
                    >
                      +0%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      ref={el => progressBarsRef.current[2] = el}
                      className="h-full bg-black rounded-full"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Animated dots */}
              <div className="flex justify-center space-x-1.5 mt-4">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"
                    style={{ animationDelay: `${dot * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Studio Services */}
            <div className="right-column-element pt-6 border-t border-gray-200">
              <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Core Services</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 border border-gray-200 rounded hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <div className="text-xs font-medium">Brand Strategy</div>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <div className="text-xs font-medium">Visual Identity</div>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <div className="text-xs font-medium">Digital Design</div>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <div className="text-xs font-medium">Motion Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-32 pt-12 border-t border-gray-200 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="footer-element space-y-2">
              <div className="text-sm font-medium">Night Performance Design Agency</div>
              <div className="text-xs text-gray-500">
                Crafting brand experiences since 2010
              </div>
            </div>
            
            <div className="footer-element flex items-center gap-6">
              <button className="text-sm text-gray-600 hover:text-white transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Project
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button className="text-sm text-gray-600 hover:text-white transition-colors flex items-center gap-2">
                Next Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="footer-element mt-12 text-center">
            <div className="text-xs text-gray-400">
              © 2010-2025 Night Performance Design Agency. All work displayed is proprietary.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightPerformance;