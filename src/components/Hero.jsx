import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "/src/assets/nbg.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isVisible }) => {
  const heroWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const logoRef = useRef(null);
  const menuButtonRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    { name: "Work", section: "work-section" },
    { name: "Studio", section: "studio-section" },
    { name: "About", section: "about-section" },
    { name: "Contact", section: "contact-section" },
  ];

  useEffect(() => {
    // Only run when the Intro component signals completion
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // Select the spans created in the JSX
      const textElements = titleRef.current.querySelectorAll('.text-element');

      // 1. Initial State Setup
      gsap.set([logoRef.current, menuButtonRef.current, descRef.current, scrollIndicatorRef.current], { 
        opacity: 0, 
        y: 30 
      });
      gsap.set(buttonsRef.current?.children, { opacity: 0, y: 20 });
      
      // Text Animation Initial State (Gradient setup)
      gsap.set(textElements, {
        y: 60,
        opacity: 0,
        backgroundImage: 'linear-gradient(to right, #c0ff0d 50%, #333 50%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '100% 0', // Starts on the dark side (#333)
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      });

      // 2. Entrance Sequence (The reveal)
      tl.to([logoRef.current, menuButtonRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.3
      })
      .to(textElements, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      }, "-=0.7")
      
      // 3. AUTO-TEXT ANIMATION (The automatic lime fill)
      .to(textElements, {
        backgroundPosition: '0% 0', // Moves the lime color into view
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut"
      }, "-=0.5")

      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.8")
      .to(buttonsRef.current?.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, "-=0.2");

      // 4. SCROLL-TRIGGER TEXT ANIMATION (Interactive fill logic)
      textElements.forEach((text) => {
        gsap.to(text, {
          backgroundPosition: '0% 0',
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'center 85%', // Matches center 80% logic from your screenshot
            end: 'center 20%',   // Matches center 20% logic from your screenshot
            scrub: true,
          },
        });
      });

      // Subtle float for the bottom arrow
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroWrapperRef); // Scope everything to the wrapper

    return () => ctx.revert();
  }, [isVisible]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroWrapperRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef} 
          autoPlay muted loop playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={bg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center p-8">
        <div ref={logoRef} className="text-2xl font-black tracking-tighter text-[#c0ff0d]">
          NOIR
        </div>
        
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#c0ff0d] transition-all duration-300 group"
        >
          <div className="flex flex-col gap-1">
            <span className={`h-0.5 w-5 bg-white group-hover:bg-black transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`h-0.5 w-5 bg-white group-hover:bg-black transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-white group-hover:bg-black transition-all ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[75vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* TEXT ANIMATION TARGETS (Each span is a .text-element) */}
            <h1 ref={titleRef} className="h1 text-[10vw] lg:text-[6vw] font-black leading-[0.82] uppercase italic select-none">
              <span className="text-element inline-block">We</span><br />
              <span className="text-element inline-block">Shape</span><br />
              <span className="text-element inline-block">Digital</span><br />
              <span className="text-element inline-block">Poetry</span>
            </h1>
          </div>

          <div className="flex flex-col items-start lg:pl-12">
            <p ref={descRef} className="text-xl md:text-2xl text-white/50 max-w-md mb-10 leading-tight">
              An award-winning boutique studio specializing in high-end digital experiences and visionary design.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-5">
              <button 
                onClick={() => scrollToSection("work-section")} 
                className="px-10 py-5 bg-[#c0ff0d] text-black font-black text-sm rounded-full hover:scale-105 transition-transform uppercase tracking-widest"
              >
                View Work
              </button>
              <button className="px-10 py-5 border border-white/20 text-white font-black text-sm rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                Our Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Discover / Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => scrollToSection("work-section")}
      >
        <span className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase">Discover</span>
        <div className="w-[1.5px] h-14 bg-gradient-to-b from-[#c0ff0d] to-transparent" />
      </div>

      {/* Fullscreen Overlay Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-black z-[100] transition-all duration-700 ease-[expo.inOut] flex items-center justify-center ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-10 right-10 text-[#c0ff0d] text-xs font-black tracking-widest"
        >
          CLOSE [X]
        </button>
        <div className="flex flex-col gap-4 text-center">
          {menuItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => scrollToSection(item.section)}
              className="text-6xl md:text-8xl font-black text-white hover:text-[#c0ff0d] transition-colors uppercase italic"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;