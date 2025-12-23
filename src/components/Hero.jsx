import { useEffect, useRef, useState } from "react";
import bg from "/src/assets/nbg1.png";

const Hero = ({ isVisible }) => {
  const heroWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const logoRef = useRef(null);
  const menuButtonRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const menuItems = [
    { name: "Work", section: "work-section" },
    { name: "Studio", section: "studio-section" },
    { name: "About", section: "about-section" },
    { name: "Contact", section: "contact-section" },
  ];

  useEffect(() => {
    if (!isVisible) return;

    // Trigger animations
    requestAnimationFrame(() => {
      setShowContent(true);
    });

    // Scroll indicator float animation
    const floatAnimation = () => {
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.animation = 'float 1.5s ease-in-out infinite';
      }
    };
    
    const timer = setTimeout(floatAnimation, 2000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroWrapperRef} 
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
          opacity: showContent ? 1 : 0.5
        }}
      />

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center p-8">
        <div 
          ref={logoRef} 
          className="text-2xl font-black tracking-tighter text-[#c0ff0d] transition-all duration-1000 ease-out"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '300ms'
          }}
        >
          NOIR
        </div>
        
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col items-center justify-center gap-1.5 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#c0ff0d] transition-all duration-300 group"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '400ms'
          }}
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
            <h1 ref={titleRef} className="text-[10vw] lg:text-[6vw] font-black leading-[0.82] uppercase italic select-none">
              {["We", "Shape", "Digital", "Poetry"].map((word, idx) => (
                <span key={idx}>
                  <span 
                    className="inline-block will-change-transform"
                    style={{
                      opacity: showContent ? 1 : 0,
                      transform: showContent ? 'translateY(0)' : 'translateY(60px)',
                      transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${500 + idx * 150}ms`,
                      background: 'linear-gradient(to right, #c0ff0d 50%, #333 50%)',
                      backgroundSize: '200% 100%',
                      backgroundPosition: showContent ? '0% 0' : '100% 0',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {word}
                  </span>
                  {idx < 3 && <br />}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex flex-col items-start lg:pl-12">
            <p 
              ref={descRef} 
              className="text-xl md:text-2xl text-white/50 max-w-md mb-10 leading-tight transition-all duration-800 ease-out"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '1100ms'
              }}
            >
              An award-winning boutique studio specializing in high-end digital experiences and visionary design.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-5">
              {["View Work", "Our Story"].map((text, idx) => (
                <button 
                  key={idx}
                  onClick={() => idx === 0 ? scrollToSection("work-section") : null}
                  className={`px-10 py-5 font-black text-sm rounded-full transition-all uppercase tracking-widest ${
                    idx === 0 
                      ? "bg-[#c0ff0d] text-black hover:scale-105" 
                      : "border border-white/20 text-white hover:bg-white hover:text-black"
                  }`}
                  style={{
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${1300 + idx * 100}ms`
                  }}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discover / Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer transition-all duration-500 ease-out"
        onClick={() => scrollToSection("work-section")}
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(30px)',
          transitionDelay: '1500ms'
        }}
      >
        <span className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase">Discover</span>
        <div className="w-[1.5px] h-14 bg-gradient-to-b from-[#c0ff0d] to-transparent" />
      </div>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 bg-black z-[100] transition-all duration-700 flex items-center justify-center ${
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        
        /* Optional: Add a subtle parallax effect */
        section {
          animation: subtleZoom 20s ease-in-out infinite alternate;
        }
        
        @keyframes subtleZoom {
          0% { background-size: 100% auto; }
          100% { background-size: 110% auto; }
        }
      `}</style>
    </section>
  );
};

export default Hero;