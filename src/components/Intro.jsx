import { useEffect, useRef, useState } from "react";

const NoirIntro = ({ onFinish }) => {
  const containerRef = useRef(null);
  const [showLetters, setShowLetters] = useState(false);

  useEffect(() => {
    // Trigger letter animation immediately
    requestAnimationFrame(() => {
      setShowLetters(true);
    });

    // Slide up animation
    const slideTimer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = "translateY(-100%)";
      }
    }, 1500);

    // Finish callback
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center will-change-transform"
      style={{
        transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div className="text-[#c0ff0d] text-6xl md:text-8xl font-bold tracking-[0.3em] flex gap-2 md:gap-4">
        {["N", "O", "I", "R"].map((letter, i) => (
          <span
            key={i}
            className="inline-block will-change-transform"
            style={{
              opacity: showLetters ? 1 : 0,
              transform: showLetters ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease-out ${i * 0.08}s, transform 0.5s ease-out ${i * 0.08}s`,
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