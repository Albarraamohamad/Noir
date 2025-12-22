import React, { useEffect, useRef } from 'react';

const ProjectsGrid = () => {
  const gridRef = useRef(null);
  const itemsRef = useRef([]);

  const projects = [
    { id: 1, title: 'FLUID DYNAMICS', type: 'wave', size: 'small' },
    { id: 2, title: 'GLOW', type: 'glow', size: 'medium' },
    { id: 3, title: 'EIN QUADRAT IST', type: 'text', size: 'small' },
    { id: 4, title: 'PORTRAIT', type: 'portrait', size: 'medium' },
    { id: 5, title: 'THE WAFFLE GANG', type: 'brand', size: 'small' },
    { id: 6, title: 'OPTA', type: 'logo', size: 'small' },
    { id: 7, title: 'ROCHELLE SCHOOL', type: 'event', size: 'small' },
    { id: 8, title: 'NIKE', type: 'brand', size: 'small' },
    { id: 9, title: 'ABSTRACT', type: 'abstract', size: 'medium' },
    { id: 10, title: 'PORTRAIT BLUE', type: 'portrait', size: 'small' },
    { id: 11, title: 'NEBULA', type: 'space', size: 'small' },
    { id: 12, title: 'SILHOUETTE', type: 'silhouette', size: 'small' },
    { id: 13, title: 'MOTION', type: 'motion', size: 'medium' },
    { id: 14, title: 'FIGURE', type: 'figure', size: 'small' },
    { id: 15, title: 'DEVICE', type: 'tech', size: 'small' }
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
          
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            // Enhanced hover effects
            gsap.to(item.querySelector('.overlay'), {
              opacity: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              duration: 0.3
            });
            
            gsap.to(item.querySelector('.title'), {
              y: -5,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            gsap.to(item.querySelector('.overlay'), {
              opacity: 0,
              backgroundColor: 'rgba(255, 255, 255, 0)',
              duration: 0.3
            });
            
            gsap.to(item.querySelector('.title'), {
              y: 10,
              opacity: 0.9,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      };
      
      document.head.appendChild(script);
    };

    loadGSAP();
  }, []);

  const getGradient = (type) => {
    const gradients = {
      wave: 'from-blue-400 via-blue-300 to-cyan-300',
      glow: 'from-blue-500 via-blue-300 to-cyan-200',
      text: 'from-blue-300 to-blue-400',
      portrait: 'from-blue-500 via-blue-400 to-blue-300',
      brand: 'from-blue-400 to-blue-500',
      logo: 'from-blue-300 to-blue-400',
      event: 'from-blue-400 to-blue-500',
      abstract: 'from-blue-400 via-blue-300 to-blue-200',
      space: 'from-blue-600 via-blue-400 to-blue-300',
      silhouette: 'from-blue-400 to-blue-500',
      motion: 'from-blue-300 to-blue-400',
      figure: 'from-blue-500 to-cyan-400',
      tech: 'from-blue-600 to-blue-400'
    };
    return gradients[type] || 'from-blue-400 to-blue-500';
  };

  const getTextColor = (type) => {
    if (['text', 'event', 'logo'].includes(type)) {
      return 'text-white font-bold';
    }
    return 'text-white font-bold';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with animation */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            PROJECTS
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
            A curated collection of creative works, experiments, and design explorations.
          </p>
        </div>
        
        {/* Grid container */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 auto-rows-fr"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`
                relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer
                transition-all duration-300 group
                ${project.size === 'medium' ? 'md:col-span-1 md:row-span-2' : ''}
                ${project.size === 'small' ? 'aspect-square' : 'h-48 md:h-64'}
                shadow-lg hover:shadow-2xl
              `}
            >
              {/* Background gradient */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${getGradient(project.type)}
                flex items-center justify-center p-4 md:p-6
                group-hover:brightness-110 transition-all duration-300
              `}>
                {/* Content based on type */}
                {project.type === 'text' && (
                  <div className="text-white text-xs md:text-sm leading-relaxed transform -rotate-12 font-mono opacity-90">
                    EIN QUADRAT IST<br/>
                    EIN QUADRAT<br/>
                    IST EIN
                  </div>
                )}
                {project.type === 'brand' && project.title === 'NIKE' && (
                  <div className="text-white text-4xl md:text-6xl font-bold tracking-wider">
                    NIKE
                  </div>
                )}
                {project.type === 'brand' && project.title === 'THE WAFFLE GANG' && (
                  <div className="text-white text-2xl md:text-4xl font-bold text-center leading-tight">
                    THE<br/>WAFFLE<br/>GANG
                  </div>
                )}
                {project.type === 'logo' && (
                  <div className="text-white text-3xl md:text-5xl font-bold tracking-wider">
                    opta
                  </div>
                )}
                {project.type === 'event' && (
                  <div className="text-white text-xs md:text-sm text-center font-mono opacity-90">
                    A Self Titled<br/>
                    ROCHELLE SCHOOL<br/>
                    LONDON £2 FES
                  </div>
                )}
                {(project.type === 'portrait' || project.type === 'silhouette' || project.type === 'figure') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-24 md:w-20 md:h-32 bg-gradient-to-b from-white/30 via-white/20 to-transparent rounded-full" />
                  </div>
                )}
                {project.type === 'wave' && (
                  <div className="absolute inset-0 opacity-40">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <path
                        d="M0,100 Q50,70 100,100 T200,100 L200,200 L0,200 Z"
                        fill="white"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                )}
                {(project.type === 'glow' || project.type === 'space') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full blur-2xl opacity-50" />
                    <div className="absolute w-8 h-8 md:w-12 md:h-12 bg-white rounded-full blur-md" />
                  </div>
                )}
                {project.type === 'abstract' && (
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                    <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/40 rounded-full" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white/40 rotate-45" />
                  </div>
                )}
                {project.type === 'motion' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 border-t-4 border-white/60 border-r-4 border-transparent rounded-full animate-spin" />
                  </div>
                )}
                {project.type === 'tech' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-20 md:w-16 md:h-24 bg-gradient-to-t from-white/40 via-white/20 to-transparent rounded-lg" />
                  </div>
                )}
              </div>
              
              {/* Overlay with title */}
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 flex flex-col items-center justify-end p-4">
                <span className="title text-white text-sm md:text-base font-semibold tracking-wider mb-2 opacity-90 translate-y-4">
                  {project.title}
                </span>
                <span className="text-white/70 text-xs md:text-sm font-medium tracking-widest">
                  VIEW PROJECT
                </span>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-white/60 rounded-full group-hover:scale-150 transition-transform duration-300" />
              <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/60 rounded-full group-hover:scale-150 transition-transform duration-300" />
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