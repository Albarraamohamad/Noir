"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";
import { Calendar } from "lucide-react";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string; // Added image property
  icon?: React.ReactNode;
  color?: string;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
  connectorStyle?: "dots" | "line" | "dashed";
  perspective?: boolean;
  darkMode?: boolean;
  smoothScroll?: boolean;
}

// Sample events with images - replace these with your actual images
const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "2023",
    title: "Product Launch",
    subtitle: "Innovation Division",
    description: "Launching our flagship product with cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2022",
    title: "Global Expansion",
    subtitle: "International Markets",
    description: "Expanded our operations to 5 new countries across Europe and Asia.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2021",
    title: "Award Recognition",
    subtitle: "Industry Excellence",
    description: "Received the Innovation Award for breakthrough technology.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2020",
    title: "Team Growth",
    subtitle: "Company Culture",
    description: "Expanded our team by 50% and established new departments.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2019",
    title: "New Headquarters",
    subtitle: "Infrastructure",
    description: "Moved into our new sustainable headquarters building.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "2018",
    title: "First Major Client",
    subtitle: "Business Milestone",
    description: "Secured our first Fortune 500 client partnership.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
];

export const ScrollTimeline = ({
  events = DEFAULT_EVENTS,
  title = "Our Journey",
  subtitle = "Scroll to explore our milestones",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-primary/30",
  activeColor = "bg-primary",
  progressIndicator = true,
  cardVariant = "elevated",
  cardEffect = "glow",
  parallaxIntensity = 0.2,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
  perspective = false,
  darkMode = true,
  smoothScroll = true,
}: ScrollTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index: number) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
        ? index * 0.2
        : index * 0.3;

    const initialStates = {
      fade: { opacity: 0, y: 20 },
      slide: {
        x:
          cardAlignment === "left"
            ? -100
            : cardAlignment === "right"
            ? 100
            : index % 2 === 0
            ? -100
            : 100,
        opacity: 0,
      },
      scale: { scale: 0.8, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
        },
      },
      viewport: { once: false, margin: "-100px" },
    };
  };

  const getConnectorClasses = () => {
    const baseClasses = cn(
      "absolute left-1/2 transform -translate-x-1/2",
      lineColor
    );
    const widthStyle = `w-[${progressLineWidth}px]`;
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          `[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]`
        );
      case "line":
      default:
        return cn(baseClasses, widthStyle);
    }
  };

  const getCardClasses = (index: number) => {
    const baseClasses = "relative z-30 rounded-lg transition-all duration-300 overflow-hidden";
    const variantClasses = {
      default: "bg-card border shadow-sm",
      elevated: "bg-gray-900/80 border border-gray-700 shadow-xl",
      outlined: "bg-card/50 backdrop-blur border-2 border-primary/20",
      filled: "bg-primary/10 border border-primary/30",
    };
    const effectClasses = {
      none: "",
      glow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:border-primary/50",
      shadow: "hover:shadow-2xl hover:-translate-y-2",
      bounce: "hover:scale-[1.02] hover:shadow-xl",
    };
    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+20px)]"
          : "lg:ml-[calc(50%+20px)]"
        : cardAlignment === "left"
        ? "lg:mr-auto lg:ml-0"
        : "lg:ml-auto lg:mr-0";
    const perspectiveClass = perspective
      ? "transform transition-transform hover:rotate-y-1 hover:rotate-x-1"
      : "";

    return cn(
      baseClasses,
      variantClasses[cardVariant],
      effectClasses[cardEffect],
      alignmentClassesDesktop,
      perspectiveClass,
      "w-full lg:w-[calc(50%-40px)]"
    );
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-black",
        darkMode ? "text-white" : "",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black pointer-events-none" />
      
      <div className="relative text-center py-16 px-4 z-10">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-24 z-10">
        <div className="relative mx-auto">
          <div
            className={cn(getConnectorClasses(), "h-full absolute top-0 z-10")}
          ></div>

          {progressIndicator && (
            <>
              <motion.div
                className="absolute top-0 z-10"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius:
                    progressLineCap === "round" ? "9999px" : "0px",
                  background: `linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)`,
                  
                }}
              />
              <motion.div
                className="absolute z-20"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.9) 0%, rgba(99,102,241,0.6) 40%, rgba(34,211,238,0) 70%)",
                    boxShadow: `
                      0 0 20px 6px rgba(168, 85, 247, 0.7),
                      0 0 35px 12px rgba(99, 102, 241, 0.5),
                      0 0 50px 20px rgba(34, 211, 238, 0.3)
                    `,
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          <div className="relative z-20">
            {events.map((event, index) => {
              const yOffset = useTransform(
                smoothProgress,
                [0, 1],
                [parallaxIntensity * 100, -parallaxIntensity * 100]
              );
              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative flex items-center mb-20 py-4",
                    "flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? index % 2 === 0
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1/2 transform -translate-y-1/2 z-30",
                      "left-1/2 -translate-x-1/2"
                    )}
                  >
                    <motion.div
                      className={cn(
                        "w-8 h-8 rounded-full border-4 flex items-center justify-center backdrop-blur-sm",
                        index <= activeIndex
                          ? "border-primary bg-black/80"
                          : "border-gray-600 bg-black/60"
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.5, 1],
                              boxShadow: [
                                "0 0 0px rgba(99,102,241,0)",
                                "0 0 20px rgba(99,102,241,0.8)",
                                "0 0 0px rgba(99,102,241,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    >
                      {index <= activeIndex && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-primary"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className={cn(
                      getCardClasses(index),
                      "mt-12 lg:mt-0"
                    )}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: false, margin: "-100px" }}
                    style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm overflow-hidden">
                      {/* Image Section */}
                      {event.image && (
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          
                          {/* Year badge on image */}
                          <div className="absolute top-4 left-4">
                            <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
                              <span className="text-sm font-bold text-white flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {event.year}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        {dateFormat === "badge" && !event.image && (
                          <div className="flex items-center mb-2">
                            {event.icon || (
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                            )}
                            <span
                              className={cn(
                                "text-sm font-bold",
                                event.color
                                  ? `text-${event.color}`
                                  : "text-primary"
                              )}
                            >
                              {event.year}
                            </span>
                          </div>
                        )}
                        
                        {!event.image && dateFormat === "text" && (
                          <p className="text-lg font-bold text-primary mb-2">
                            {event.year}
                          </p>
                        )}
                        
                        <h3 className="text-xl font-bold mb-1 text-white">
                          {event.title}
                        </h3>
                        {event.subtitle && (
                          <p className="text-primary/80 font-medium mb-2 text-sm">
                            {event.subtitle}
                          </p>
                        )}
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};