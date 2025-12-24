import { useEffect, useRef, useState } from "react";

const NoirIntro = ({ onFinish }) => {
  const containerRef = useRef(null);
  const [showLetters, setShowLetters] = useState(false);

  useEffect(() => {
    // Trigger letter animation immediately
    setShowLetters(true);

    // Slide up animation
    const slideTimer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = "translateY(-100%)";
      }
    }, 1200);

    // Finish callback
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2000);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
      style={{
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'transform',
      }}
    >
      <div className="text-[#c0ff0d] text-6xl md:text-8xl font-bold tracking-[0.3em] flex gap-2 md:gap-4">
        {["N", "O", "I", "R"].map((letter, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: showLetters ? 1 : 0,
              transform: showLetters ? 'translateY(0)' : 'translateY(15px)',
              transition: `opacity 0.4s ease-out ${i * 0.06}s, transform 0.4s ease-out ${i * 0.06}s`,
              willChange: 'opacity, transform',
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NoirIntro;