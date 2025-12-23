import React, { useEffect, useRef } from 'react';
import fn from '/src/assets/fn.mp4';

const ProjectsGrid = () => {
  const itemsRef = useRef([]);
  const titleRef = useRef(null);

  const projects = [
    { id: 1, video: fn },
  ];

  useEffect(() => {
    const loadGSAP = async () => {
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.async = true;
      
      const stScript = document.createElement('script');
      stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      stScript.async = true;

      gsapScript.onload = () => {
        document.head.appendChild(stScript);
        stScript.onload = () => {
          const { gsap, ScrollTrigger } = window;
          gsap.registerPlugin(ScrollTrigger);

          if (titleRef.current) {
            gsap.set(titleRef.current, {
              opacity: 1, // Set to 1 to remove the dark/faded start
              backgroundImage: 'linear-gradient(to right, #c0ff0d 50%, #333 50%)', // Changed transparent to #333 for better contrast during fill
              backgroundSize: '200% 100%',
              backgroundPosition: '100% 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            });

            gsap.to(titleRef.current, {
              backgroundPosition: '0% 0',
              ease: 'none',
              scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 90%',
                end: 'top 40%',
                scrub: true,
              },
            });
          }

          gsap.from(itemsRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: itemsRef.current[0],
              start: 'top 90%',
            }
          });

          itemsRef.current.forEach((item) => {
            if (!item) return;
            const video = item.querySelector('video');
            
            item.addEventListener('mouseenter', () => {
              gsap.to(item, { scale: 1.01, duration: 0.4, ease: 'power2.out' });
              if (video) video.play();
            });

            item.addEventListener('mouseleave', () => {
              gsap.to(item, { scale: 1, duration: 0.4, ease: 'power2.out' });
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            });
          });
        };
      };
      document.head.appendChild(gsapScript);
    };

    loadGSAP();
  }, []);

  return (
    <div className="min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 
            ref={titleRef} 
            className="text-6xl md:text-9xl font-black mb-4 tracking-tighter text-white"
          >
            ART
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            A curated collection of creative works, experiments, and design explorations.
          </p>
        </div>
        
        {/* Grid container */}
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl"
            >
              <video
                className="w-full h-auto object-cover opacity-100 transition-opacity" // Removed opacity-80
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={project.video} type="video/mp4" />
              </video>
              
              {/* Overlay Button - Simplified to remove dark tint */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="px-8 py-3 bg-[#c0ff0d] rounded-full shadow-lg">
                  <span className="text-black text-sm font-bold tracking-tighter">
                    VIEW PROJECT →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer section */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">Explore More</h3>
              <p className="text-gray-500 text-sm">
                15 projects across various disciplines and mediums
              </p>
            </div>
            <button className="px-10 py-4 bg-[#c0ff0d] text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3 group/btn">
              <span>VIEW ALL PROJECTS</span>
              <span className="text-xl group-hover/btn:translate-x-2 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;