import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NoirIntro = ({ onFinish }) => {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    // Split text into letters for advanced animation
    const text = "NOIR";
    const letters = text.split("");
    
    // Set initial states
    gsap.set(contentWrapperRef.current, { scale: 1 });
    gsap.set(lettersRef.current, { 
      opacity: 0, 
      y: 100,
      rotationX: -90,
      scale: 0.5,
    });

    // Animation sequence
    tl
    // Animate each letter with stagger
    .to(lettersRef.current, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "back.out(1.7)",
    })
    
    // Pulse effect on all letters
    .to(lettersRef.current, {
      scale: 1.1,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      stagger: 0.05,
    }, "+=0.3")
    
    // Wave effect
    .to(lettersRef.current, {
      y: -20,
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
      stagger: 0.1,
    }, "+=0.2")
    
    // Rotate letters individually
    .to(lettersRef.current, {
      rotation: 360,
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.1,
    }, "+=0.2")
    
    // Hold
    .to({}, { duration: 0.5 })
    
    // ZOOM OUT - Scale up the entire content
    .to(contentWrapperRef.current, {
      scale: 3,
      opacity: 0,
      duration: 1.2,
      ease: "power2.in",
    })
    
    // Fade container
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.5");

  }, [onFinish]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#c0ff0d' }}
    >
      {/* Content wrapper for zoom out effect */}
      <div 
        ref={contentWrapperRef}
        className="relative"
        style={{ perspective: '2000px' }}
      >
        {/* Main text with individual letters */}
        <h1
          ref={textRef}
          className="text-[120px] md:text-[180px] lg:text-[250px] font-black tracking-wider flex"
          style={{
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: '900',
          }}
        >
          {['N', 'O', 'I', 'R'].map((letter, i) => (
            <span
              key={i}
              ref={el => lettersRef.current[i] = el}
              className="inline-block"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default NoirIntro;