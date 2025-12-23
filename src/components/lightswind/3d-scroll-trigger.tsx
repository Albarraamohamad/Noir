"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { cn } from "../../lib/utils";
// Ensure GSAP is installed: npm install gsap
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollGalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ThreeDScrollTriggerRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  images?: ScrollGalleryImage[];
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ThreeDScrollTriggerContext =
  React.createContext<MotionValue<number> | null>(null);

export function ThreeDScrollTriggerContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  const titleRef = useRef<HTMLHeadingElement>(null);

  // --- GSAP TEXT FILL ANIMATION ---
  useEffect(() => {
    if (titleRef.current) {
      // Initial state: Dim with a transparent gradient mask
      gsap.set(titleRef.current, {
        opacity: 0.2,
        backgroundImage: 'linear-gradient(to right, #c0ff0d 50%, transparent 50%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '100% 0',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      });

      // Fill animation on scroll
      gsap.to(titleRef.current, {
        opacity: 1,
        backgroundPosition: '0% 0',
        ease: 'none',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <ThreeDScrollTriggerContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full bg-black py-20", className)} {...props}>
        {/* Animated Title */}
        <div className="container mx-auto px-6 mb-12">
           <h1 
            ref={titleRef} 
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase"
          >
            Gallery
          </h1>
          <p className="text-gray-500 mt-4 max-w-md">
            Moving perspectives and curated visual stories through continuous motion.
          </p>
        </div>

        {children}
      </div>
    </ThreeDScrollTriggerContext.Provider>
  );
}

export function ThreeDScrollTriggerRow(props: ThreeDScrollTriggerRowProps) {
  const sharedVelocityFactor = useContext(ThreeDScrollTriggerContext);
  if (sharedVelocityFactor) {
    return (
      <ThreeDScrollTriggerRowImpl
        {...props}
        velocityFactor={sharedVelocityFactor}
      />
    );
  }
  return <ThreeDScrollTriggerRowLocal {...props} />;
}

interface ThreeDScrollTriggerRowImplProps extends ThreeDScrollTriggerRowProps {
  velocityFactor: MotionValue<number>;
}

function ThreeDScrollTriggerRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  images = [],
  ...props
}: ThreeDScrollTriggerRowImplProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numCopies, setNumCopies] = useState(1);
  const x = useMotionValue(0);

  const prevTimeRef = useRef(0);
  const unitWidthRef = useRef(0);
  const baseXRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      const block = container.querySelector(
        ".threed-scroll-trigger-block"
      ) as HTMLDivElement;
      if (!block) return;

      const blockWidth = block.scrollWidth;
      unitWidthRef.current = blockWidth;

      if (blockWidth > 0) {
        const nextCopies = Math.max(
          3,
          Math.ceil(containerWidth / blockWidth) + 2
        );
        setNumCopies(nextCopies);
      }
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((time) => {
    const dt = (time - prevTimeRef.current) / 1000;
    prevTimeRef.current = time;

    const unitWidth = unitWidthRef.current;
    if (unitWidth <= 0) return;

    const velocity = velocityFactor.get();
    const speedMultiplier = Math.min(5, Math.abs(velocity));
    const scrollDirection = velocity >= 0 ? 1 : -1;
    const currentDirection = direction * scrollDirection;

    const pixelsPerSecond = (unitWidth * baseVelocity) / 100;
    const moveBy =
      currentDirection * pixelsPerSecond * (1 + speedMultiplier) * dt;

    const newX = baseXRef.current + moveBy;
    baseXRef.current = wrap(0, unitWidth, newX);
    x.set(baseXRef.current);
  });

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap py-4", className)}
      {...props}
    >
      <motion.div
        className="inline-flex will-change-transform transform-gpu gap-5 px-4"
        style={{ x: useTransform(x, (v) => `${-v}px`) }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            className={cn("inline-flex shrink-0 gap-5", i === 0 && "threed-scroll-trigger-block")}
            aria-hidden={i !== 0}
          >
            {images.length > 0
              ? images.map((image, idx) => (
                  <GalleryCard key={idx} image={image} />
                ))
              : childrenArray}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function GalleryCard({ image }: { image: ScrollGalleryImage }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative shrink-0 w-fit h-80 overflow-hidden group cursor-pointer "
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      />

      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
      >
        <h3 className="text-[#c0ff0d] text-xl font-bold uppercase tracking-tighter">
          {image.title || image.alt}
        </h3>
        {image.description && (
          <p className="text-xs text-gray-300 line-clamp-2 uppercase">
            {image.description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

function ThreeDScrollTriggerRowLocal(props: ThreeDScrollTriggerRowProps) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });
  return (
    <ThreeDScrollTriggerRowImpl
      {...props}
      velocityFactor={localVelocityFactor}
    />
  );
}