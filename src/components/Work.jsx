import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import w1 from '/src/assets/w1.png';
import w2 from '/src/assets/w2.png';
import w3 from '/src/assets/w3.png';

gsap.registerPlugin(ScrollTrigger);

const AdvancedWorkSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const linkRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- NEW: GREEN FILL ANIMATION FOR THE HEADER ---
      const headerTitle = headerRef.current.querySelector('h1');
      
      // Initial Setup: Opacity and Gradient Mask
      gsap.set(headerTitle, {
        opacity: 0.2,
        backgroundImage: 'linear-gradient(to right, #c0ff0d 50%, transparent 50%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '100% 0',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      });

      // Scroll Animation
      gsap.to(headerTitle, {
        opacity: 1,
        backgroundPosition: '0% 0',
        ease: 'none',
        scrollTrigger: {
          trigger: headerTitle,
          start: 'top 85%',
          end: 'top 35%',
          scrub: true,
        },
      });

      // Sub-elements animation (Work label and description)
      const subElements = headerRef.current.querySelectorAll('.animate-element:not(h1)');
      gsap.from(subElements, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // --- EXISTING CARD ANIMATIONS (STYLE UNCHANGED) ---
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const image = card.querySelector('.project-image');
        const imageInner = card.querySelector('.project-image-inner');
        const title = card.querySelector('.project-title');
        const description = card.querySelector('.project-description');
        const tags = card.querySelectorAll('.project-tag');
        const link = card.querySelector('.project-link');
        const dots = card.querySelectorAll('.project-dot');

        gsap.set(card, { opacity: 0, y: 100, rotateY: -15 });
        gsap.set(image, { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(imageInner, { scale: 1.3, rotation: 5 });
        gsap.set([title, description], { opacity: 0, y: 30 });
        gsap.set(tags, { opacity: 0, scale: 0, rotation: 180 });
        gsap.set(link, { opacity: 0, x: -20 });
        gsap.set(dots, { scale: 0, rotation: 360 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          }
        });

        tl.to(card, { opacity: 1, y: 0, rotateY: 0, duration: 0.8 })
          .to(image, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 }, '-=0.6')
          .to(imageInner, { scale: 1, rotation: 0, duration: 0.6 }, '-=0.5')
          .to(title, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
          .to(description, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
          .to(tags, { opacity: 1, scale: 1, rotation: 0, stagger: 0.1 }, '-=0.3')
          .to(link, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
          .to(dots, { scale: 1, rotation: 0, stagger: 0.1 }, '-=0.4');

        // Hover animations
        card.addEventListener('mouseenter', () => {
          gsap.to(imageInner, { scale: 1.1, rotation: 3, duration: 0.6 });
          gsap.to(dots, { scale: 1.2, duration: 0.3 });
          gsap.to(title, { x: 5, duration: 0.3 });
          gsap.to(tags, { y: -3, duration: 0.3, stagger: 0.05 });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(imageInner, { scale: 1, rotation: 0, duration: 0.6 });
          gsap.to(dots, { scale: 1, duration: 0.3 });
          gsap.to(title, { x: 0, duration: 0.3 });
          gsap.to(tags, { y: 0, duration: 0.3, stagger: 0.05 });
        });
      });

      // Footer link animation
      gsap.to(linkRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: linkRef.current,
          start: 'top 90%',
          once: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    { id: 1, title: 'Meridian brand identity', description: 'Complete visual system for a luxury hospitality group.', tags: ['Branding', 'Identity', 'Systems'], image: w1 },
    { id: 2, title: 'Catalyst digital platform', description: 'Web experience redesign for a fintech startup scaling globally.', tags: ['Web design', 'Interface', 'Strategy'], image: w2 },
    { id: 3, title: 'Vesper campaign', description: 'Integrated campaign for a sustainable fashion collective.', tags: ['Campaign', 'Creative', 'Direction'], image: w3 },
  ];

  return (
    <div ref={sectionRef} className="w-full h1 bg-black text-white py-24 px-6 sm:px-8 overflow-hidden" id='work-section'>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16" style={{ perspective: '1000px' }}>
          <h1 className="animate-element text-3xl sm:text-6xl md:text-7xl font-black text-[#c0ff0d] mb-6">
          <p className=" text-sm mb-4 ">Work</p>
            Selected projects
          </h1>
          <p className="animate-element text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of work we're proud to show.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group flex flex-col cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div className="project-image relative w-full aspect-video rounded-xl overflow-hidden mb-6 border-4 border-transparent group-hover:border-purple-500 transition-all duration-500">
                <div className="project-image-inner w-full h-full">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="project-dot absolute top-4 right-4 w-5 h-5 bg-purple-500 rounded-full"></div>
                <div className="project-dot absolute bottom-4 left-4 w-5 h-5 bg-purple-500 rounded-full"></div>
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="project-title text-2xl font-black mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="project-description text-gray-600 text-base mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag text-xs font-semibold bg-gray-100 text-black px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#" className="project-link text-white font-semibold text-sm flex items-center gap-2 group/link hover:text-purple-600 transition-colors duration-300">
                  View <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* All Projects Link */}
        <div ref={linkRef} className="text-center pt-8 border-t border-gray-200">
          <a href="#" className="text-black font-semibold hover:text-purple-600 transition-colors duration-300 inline-flex items-center gap-2 text-lg">
            All projects <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdvancedWorkSection;