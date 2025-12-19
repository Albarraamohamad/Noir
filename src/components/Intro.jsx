import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NoirIntro = ({ onFinish }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    tl.fromTo(
      textRef.current,
      {
        opacity: 0,
        scale: 0.7,
        letterSpacing: "0.6em",
      },
      {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.15em",
        duration: 1.8,
        ease: "power4.out",
      }
    )
      .to(textRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.2, // total ≈ 4s
        ease: "power2.inOut",
      });
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <h1
        ref={textRef}
        className="text-white text-7xl md:text-9xl font-extrabold tracking-widest"
        style={{ fontFamily: "Georgia, serif" }}
      >
        NOIR
      </h1>
    </div>
  );
};

export default NoirIntro;
