import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import design from '/src/assets/design.png';
import design2 from '/src/assets/image.png';

gsap.registerPlugin(ScrollTrigger);

const NightPerformance = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectCardsRef = useRef([]);
  const rightColumnRef = useRef(null);
  const footerRef = useRef(null);
  const metricsRef = useRef(null);
  const progressBarsRef = useRef([]);
  const percentageTextsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. TITLE ANIMATION (Main Style Restored) ---
      const titleText = "NIGHT PERFORMANCE";
      const titleContainer = headerRef.current?.querySelector('.title-container');
      
      if (titleContainer) {
        titleContainer.innerHTML = '';
        const words = titleText.split(' ');

        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = `inline-block mr-4 word-${wordIndex}`;
          
          word.split('').forEach((letter, letterIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'inline-block letter';
            letterSpan.textContent = letter;
            
            // Entrance
            gsap.fromTo(letterSpan, 
              { opacity: 0, y: 30, rotateX: -30 },
              {
                opacity: 1, y: 0, rotateX: 0,
                duration: 0.8,
                delay: wordIndex * 0.3 + letterIndex * 0.05,
                ease: 'back.out(1.7)',
                scrollTrigger: { trigger: headerRef.current, start: 'top 70%', once: true }
              }
            );

            // Green Fill Effect
            gsap.set(letterSpan, {
              backgroundImage: 'linear-gradient(to right, #c0ff0d 50%, #444 50%)',
              backgroundSize: '200% 100%',
              backgroundPosition: '100% 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            });

            gsap.to(letterSpan, {
              backgroundPosition: '0% 0',
              ease: 'none',
              scrollTrigger: { trigger: titleContainer, start: 'top 60%', end: 'top 20%', scrub: true }
            });
            
            wordSpan.appendChild(letterSpan);
          });
          titleContainer.appendChild(wordSpan);
          if (wordIndex === 0) titleContainer.appendChild(document.createElement('br'));
        });
      }

      // --- 2. PROJECT IMAGES ANIMATION (Advanced Reveal) ---
      projectCardsRef.current.forEach((card) => {
        if (!card) return;
        const imageWrapper = card.querySelector('.project-image');
        const imgElement = card.querySelector('img');

        // The "Advanced" Reveal Logic
        gsap.set(card, { opacity: 0, y: 50 });
        gsap.set(imageWrapper, { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(imgElement, { scale: 1.4 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        });

        tl.to(card, { opacity: 1, y: 0, duration: 0.8 })
          .to(imageWrapper, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: "expo.out" }, "-=0.4")
          .to(imgElement, { scale: 1, duration: 1.2, ease: "power2.out" }, "-=1");
      });

      // --- 3. METRICS ANIMATION ---
      if (metricsRef.current) {
        ScrollTrigger.create({
          trigger: metricsRef.current,
          start: 'top 80%',
          onUpdate: (self) => {
            const targets = [75, 66, 50];
            const vals = [240, 180, 150];
            progressBarsRef.current.forEach((bar, i) => { if (bar) bar.style.width = `${targets[i] * self.progress}%`; });
            percentageTextsRef.current.forEach((text, i) => { if (text) text.textContent = `+${Math.round(vals[i] * self.progress)}%`; });
          }
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-black text-white font-sans overflow-hidden py-20" id='studio-section'>
      <div className="max-w-7xl mx-auto px-4 relative">
        
        {/* Header (Original Style) */}
        <div ref={headerRef} className="mb-16 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-gray-500 tracking-widest uppercase">Creative Studio</div>
            <div className="text-sm text-gray-500">01/06</div>
          </div>
          <div className="title-container text-5xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6"></div>
          <div className="flex items-center justify-between pt-6 border-t border-gray-800">
            <div className="text-sm text-gray-500">Design Agency Portfolio</div>
            <div className="text-sm text-gray-500">2014</div>
          </div>
        </div>

        {/* Content Grid (Original Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div ref={el => projectCardsRef.current[0] = el} className="group">
                <div className="project-image overflow-hidden mb-4 aspect-[4/3] bg-neutral-900 rounded-lg">
                  <img src={design} alt="Battoria" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold uppercase italic">BATTORIA</h3>
                <p className="text-sm text-gray-500 uppercase">Brand Identity</p>
              </div>
              
              {/* Card 2 */}
              <div ref={el => projectCardsRef.current[1] = el} className="group">
                <div className="project-image overflow-hidden mb-4 aspect-[4/3] bg-neutral-900 rounded-lg">
                  <img src={design2} alt="Gala" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold uppercase italic">PERFORMANCE GALA</h3>
                <p className="text-sm text-gray-500 uppercase">Digital Campaign</p>
              </div>
            </div>

            {/* Philosophy */}
            <div className="pt-12 border-t border-gray-800">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h4 className="text-sm uppercase tracking-widest text-gray-500">Our Approach</h4>
                </div>
                <div className="md:w-2/3">
                  <p className="text-xl text-gray-400 leading-relaxed">
                    Since our founding, we've approached design as a performance art—where every pixel must work in perfect harmony.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-12">
            <div className="p-6 bg-neutral-900 rounded-lg text-center">
              <div className="text-6xl font-bold text-white mb-2">14</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">Award Year</div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold uppercase italic">About the Studio</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Night Performance is a design agency specializing in creating bold, performance-driven brand experiences.
              </p>
            </div>

            {/* Metrics */}
            <div ref={metricsRef} className="p-6 bg-neutral-900 rounded-xl border border-white/5 space-y-6">
              <h4 className="text-xs uppercase tracking-widest text-[#c0ff0d] font-bold">Impact</h4>
              {[0, 1, 2].map((i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-400 uppercase">{["Growth", "Engagement", "Recognition"][i]}</span>
                    <span ref={el => percentageTextsRef.current[i] = el} className="text-xs font-bold">+0%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div ref={el => progressBarsRef.current[i] = el} className="h-full bg-[#c0ff0d]" style={{ width: '0%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-32 pt-10 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
          <div>© 2010-2025 Night Performance</div>
          <div className="flex gap-6"><span>Instagram</span><span>Behance</span></div>
        </div>
      </div>
    </div>
  );
};

export default NightPerformance;