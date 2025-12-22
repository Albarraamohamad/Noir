import React, { useEffect, useRef } from 'react';
import fn from '/src/assets/fn.mp4'

const ProjectsGrid = () => {
  const itemsRef = useRef([]);

  const projects = [
    { id: 1, video: fn,   },
   
    
   
  ];

  useEffect(() => {
    const loadGSAP = async () => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.async = true;
      
      script.onload = () => {
        const { gsap } = window;
        
        // Initial animation
        gsap.from(itemsRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out'
        });

        // Hover animations
        itemsRef.current.forEach((item) => {
          if (!item) return;
          
          const video = item.querySelector('video');
          
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Play video on hover
            if (video) {
              video.play();
            }
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Pause video on mouse leave
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          });
        });
      };
      
      document.head.appendChild(script);
    };

    loadGSAP();
  }, []);

  return (
    <div className="min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-[#c0ff0d] mb-4 tracking-tight">
            ART
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
            A curated collection of creative works, experiments, and design explorations.
          </p>
        </div>
        
        {/* Grid container - Single column full width */}
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 group shadow-lg hover:shadow-2xl"
            >
              {/* Full width video */}
              <video
                className="w-full h-auto object-cover"
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={project.video} type="video/mp4" />
              </video>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xl font-bold tracking-wider">
                  VIEW PROJECT
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-white text-xl font-semibold mb-2">Explore More</h3>
              <p className="text-gray-400 text-sm">
                15 projects across various disciplines and mediums
              </p>
            </div>
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 group/btn">
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