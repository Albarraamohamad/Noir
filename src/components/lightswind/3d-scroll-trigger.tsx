"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ScrollGalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ThreeDScrollTriggerRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  images?: ScrollGalleryImage[];
}

interface ThreeDScrollTriggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ThreeDScrollTriggerContainer({
  children,
  className = "",
  ...props
}: ThreeDScrollTriggerContainerProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const titleText = "GALLERY";

  return (
    <div className={`relative w-full bg-black py-20 ${className}`} {...props}>
      {/* Animated Title */}
      <div className="container mx-auto px-6 mb-12">
        <h1 
          ref={titleRef} 
          className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none"
        >
          {titleText.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-700 ease-out"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(30px) rotateX(-30deg)',
                transitionDelay: `${index * 50}ms`,
                background: 'linear-gradient(to right, #c0ff0d 50%, #666 50%)',
                backgroundSize: '200% 100%',
                backgroundPosition: titleVisible ? '0% 0' : '100% 0',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transformStyle: 'preserve-3d',
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <p className="text-gray-500 mt-4 max-w-md">
          Moving perspectives and curated visual stories through continuous motion.
        </p>
      </div>

      {children}
    </div>
  );
}

export function ThreeDScrollTriggerRow({
  children,
  baseVelocity = 3,
  direction = -1,
  className = "",
  images = [],
  ...props
}: ThreeDScrollTriggerRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const lastTimeRef = useRef(Date.now());
  const scrollVelocityRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      
      // Update position based on scroll direction
      setScrollPosition(prev => prev + scrollDelta * direction * 2);
    };

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      // Smooth auto-scroll
      const speed = baseVelocity * direction;
      setScrollPosition(prev => prev + speed * delta * 10);

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [baseVelocity, direction]);

  const childrenArray = React.Children.toArray(children);
  const items = images.length > 0 ? images : childrenArray;

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden whitespace-nowrap py-4 ${className}`}
      {...props}
    >
      <div
        className="inline-flex will-change-transform gap-5 px-4"
        style={{
          transform: `translateX(${-scrollPosition % (items.length * 320)}px)`,
        }}
      >
        {/* Render 3 copies for seamless loop */}
        {[0, 1, 2].map((copyIndex) => (
          <div key={copyIndex} className="inline-flex shrink-0 gap-5">
            {images.length > 0
              ? images.map((image, idx) => (
                  <GalleryCard key={`${copyIndex}-${idx}`} image={image} />
                ))
              : childrenArray}
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryCard({ image }: { image: ScrollGalleryImage }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative shrink-0 w-fit h-80 overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Hover Overlay - NO BLACK BACKGROUND */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-2 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: isHovered ? 'blur(4px)' : 'blur(0px)',
        }}
      >
        <h3 className="text-[#c0ff0d] text-xl font-bold uppercase tracking-tighter">
          {image.title || image.alt}
        </h3>
        {image.description && (
          <p className="text-xs text-white line-clamp-2 uppercase">
            {image.description}
          </p>
        )}
      </div>
    </div>
  );
}