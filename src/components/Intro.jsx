import { useEffect, useRef } from "react";

const NoirIntro = ({ onFinish }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Simple timeout-based animation - no GSAP overhead
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = "translateY(-100%)";
      }
    }, 1800);

    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center transition-transform duration-1000 ease-in-out"
    >
      <div className="h1 text-[#c0ff0d] text-6xl md:text-8xl font-bold tracking-[0.3em] flex gap-4 animate-fadeInUp">
        {["N", "O", "I", "R"].map((letter, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              animation: `fadeInUp 0.6s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NoirIntro; 