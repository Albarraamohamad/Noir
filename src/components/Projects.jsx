import React, { useEffect, useRef, useState } from 'react';
import fn from '/src/assets/fn.mp4';

const ProjectsGrid = () => {
  const itemsRef = useRef([]);
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);

  const projects = [
    { id: 1, video: fn },
  ];

  useEffect(() => {
    // Title animation observer
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    // Items animation observer
    const itemsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setItemsVisible(true);
          itemsObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (itemsRef.current[0]) {
      itemsObserver.observe(itemsRef.current[0]);
    }

    return () => {
      titleObserver.disconnect();
      itemsObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 
            ref={titleRef} 
            className="text-6xl md:text-9xl font-black mb-4 tracking-tighter transition-all duration-1000 ease-out"
            style={{
              opacity: titleVisible ? 1 : 0.3,
              background: 'linear-gradient(to right, #c0ff0d 50%, #333 50%)',
              backgroundSize: '200% 100%',
              backgroundPosition: titleVisible ? '0% 0' : '100% 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
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
              className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ease-out"
              style={{
                opacity: itemsVisible ? 1 : 0,
                transform: itemsVisible ? 'scale(1)' : 'scale(0.95)',
                transitionDelay: `${index * 50}ms`
              }}
            >
              <video
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src={project.video} type="video/mp4" />
              </video>
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
            <button className="px-10 py-4 bg-[#c0ff0d] text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3 group">
              <span>VIEW ALL PROJECTS</span>
              <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;