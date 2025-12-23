import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NoirIntro = ({ onFinish }) => {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onFinish,
      });

      // Initial state
      gsap.set(lettersRef.current, { y: 100, opacity: 0 });

      tl.to(lettersRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "expo.out",
      })
      .to(contentWrapperRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, "+=0.5")
      // THE SWIPE UP: Reveals the Hero underneath
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
      }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, [onFinish]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div ref={contentWrapperRef}>
        <h1 className="text-[12vw] font-black flex gap-2 text-[#c0ff0d] h1">
          {["N", "O", "I", "R"].map((l, i) => (
            <span key={i} ref={el => lettersRef.current[i] = el}>{l}</span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default NoirIntro;