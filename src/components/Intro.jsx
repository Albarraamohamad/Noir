import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NoirIntro = ({ onFinish }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const linesRef = useRef([]);
  const dotsRef = useRef([]);
  const glowRef = useRef(null);
  const loadingBarRef = useRef(null);
  const loadingTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    // Initial setup
    gsap.set(linesRef.current, { scaleX: 0 });
    gsap.set(dotsRef.current, { scale: 0, rotation: 180 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.5 });
    gsap.set(loadingBarRef.current, { width: "0%" });
    gsap.set(loadingTextRef.current, { opacity: 0 });

    // Animate background overlay
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.in",
    })
    
    // Animate decorative lines
    .to(linesRef.current, {
      scaleX: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
    }, "-=0.1")
    
    // Animate dots
    .to(dotsRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }, "-=0.4")
    
    // Animate glow effect
    .to(glowRef.current, {
      opacity: 0.6,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    }, "-=0.6")
    
    // Main text animation
    .fromTo(
      textRef.current,
      {
        opacity: 0,
        scale: 0.7,
        letterSpacing: "0.6em",
        rotateX: -90,
        y: 100,
      },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.15em",
        rotateX: 0,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
      },
      "-=0.5"
    )
    
    // Pulse glow effect
    .to(glowRef.current, {
      opacity: 0.8,
      scale: 1.2,
      duration: 0.8,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    }, "-=0.8")
    
    // Show loading text
    .to(loadingTextRef.current, {
      opacity: 1,
      y: -10,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3")
    
    // Animate loading bar
    .to(loadingBarRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    }, "-=0.3")
    
    // Hold for a moment
    .to({}, { duration: 0.3 })
    
    // Fade out everything together
    .to(textRef.current, {
      opacity: 0,
      scale: 1.1,
      letterSpacing: "0.3em",
      duration: 0.8,
      ease: "power2.in",
    })
    .to([glowRef.current, linesRef.current, dotsRef.current, loadingTextRef.current, loadingBarRef.current], {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    }, "-=0.8")
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, "-=0.5")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }, "-=0.2");

  }, [onFinish]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Animated background overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: 'radial-gradient(circle at center, #c0ff0d 0%, #8bc905 40%, #000000 100%)',
        }}
      />
      
      {/* Decorative animated lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          ref={el => linesRef.current[0] = el}
          className="absolute w-1/2 h-1 bg-gradient-to-r from-transparent via-[#c0ff0d] to-transparent top-1/3"
        />
        <div 
          ref={el => linesRef.current[1] = el}
          className="absolute w-1/2 h-1 bg-gradient-to-r from-transparent via-[#c0ff0d] to-transparent bottom-1/3"
        />
        <div 
          ref={el => linesRef.current[2] = el}
          className="absolute w-1 h-1/2 bg-gradient-to-b from-transparent via-[#c0ff0d] to-transparent left-1/4"
        />
        <div 
          ref={el => linesRef.current[3] = el}
          className="absolute w-1 h-1/2 bg-gradient-to-b from-transparent via-[#c0ff0d] to-transparent right-1/4"
        />
      </div>
      
      {/* Corner dots */}
      <div 
        ref={el => dotsRef.current[0] = el}
        className="absolute top-8 left-8 w-4 h-4 bg-[#c0ff0d] rounded-full shadow-lg shadow-[#c0ff0d]/50"
      />
      <div 
        ref={el => dotsRef.current[1] = el}
        className="absolute top-8 right-8 w-4 h-4 bg-[#c0ff0d] rounded-full shadow-lg shadow-[#c0ff0d]/50"
      />
      <div 
        ref={el => dotsRef.current[2] = el}
        className="absolute bottom-8 left-8 w-4 h-4 bg-[#c0ff0d] rounded-full shadow-lg shadow-[#c0ff0d]/50"
      />
      <div 
        ref={el => dotsRef.current[3] = el}
        className="absolute bottom-8 right-8 w-4 h-4 bg-[#c0ff0d] rounded-full shadow-lg shadow-[#c0ff0d]/50"
      />
      
      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center" style={{ perspective: '1000px' }}>
        {/* Glow effect behind text */}
        <div 
          ref={glowRef}
          className="absolute inset-0 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #c0ff0d 0%, transparent 70%)',
            width: '150%',
            height: '150%',
            left: '-25%',
            top: '-25%',
          }}
        />
        
        {/* Main text */}
        <h1
          ref={textRef}
          className="text-black text-7xl md:text-9xl font-extrabold tracking-widest relative z-10"
          style={{
            textShadow: '0 0 30px rgba(192, 255, 13, 0.5), 0 0 60px rgba(192, 255, 13, 0.3)',
          }}
        >
          NOIR
        </h1>
        
        {/* Loading section */}
        <div className="mt-16 w-64 md:w-96">
          <p 
            ref={loadingTextRef}
            className="text-black text-sm font-semibold text-center mb-3 tracking-wider"
          >
            LOADING EXPERIENCE
          </p>
          <div className="relative h-1 bg-black/20 rounded-full overflow-hidden">
            <div 
              ref={loadingBarRef}
              className="absolute left-0 top-0 h-full bg-[#c0ff0d] rounded-full shadow-lg shadow-[#c0ff0d]/50"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#c0ff0d] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NoirIntro;