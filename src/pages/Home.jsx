import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Hero from "../components/Hero";
import Work from "../components/Work";
import Footer from "../components/Footer";
import StudioSection from "../components/Studio";
import CTAHeroSection from "../components/Cta";
import ParallexGallery from "../components/Slide";
import { ThreeDMarquee } from "../components/lightswind/3d-marquee";
import { 
    ThreeDScrollTriggerContainer, 
    ThreeDScrollTriggerRow 
} from '../components/lightswind/3d-scroll-trigger';
import ProjectsGrid from '../components/Projects';
import '../App.css';

// Import images
import p1 from '/src/assets/p1.png';
import p2 from '/src/assets/p2.png';
import p3 from '/src/assets/p3.png';
import p4 from '/src/assets/p4.png';
import p5 from '/src/assets/p5.png';
import d1 from '/src/assets/d1.png';
import d2 from '/src/assets/d2.png';
import d3 from '/src/assets/d3.png';
import d4 from '/src/assets/d4.png';
import d5 from '/src/assets/d5.png';
import d6 from '/src/assets/d6.png';
import d7 from '/src/assets/d7.png';
import d8 from '/src/assets/d8.png';
import d9 from '/src/assets/d9.png';

const Home = () => {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  
  useEffect(() => {
    // Preload hero in background while intro plays
    const timer = setTimeout(() => {
      setShowHero(true);
    }, 2000); // Start loading hero 2 seconds into intro

    return () => clearTimeout(timer);
  }, []);

  const images = [
    {
      src: p4, 
      alt: "Project 4",
      title: "Digital Excellence",
      description: "Premium quality work"
    },
    {
      src: d1, 
      alt: "Project 5",
      title: "Modern Design",
      description: "Cutting-edge UI/UX design"
    },
    {
      src: d2, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d3, 
      alt: "Design 3",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d4, 
      alt: "Design 4",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d5, 
      alt: "Design 5",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d6, 
      alt: "Design 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d7, 
      alt: "Design 7",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d8, 
      alt: "Design 8",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d9, 
      alt: "Design 9",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
  ];

  const images2 = [
    {
      src: p1, 
      alt: "Project 1",
      title: "Digital Excellence",
      description: "Premium quality work"
    },
    {
      src: p2, 
      alt: "Project 2",
      title: "Modern Design",
      description: "Cutting-edge UI/UX design"
    },
    {
      src: p3, 
      alt: "Project 3",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: p4, 
      alt: "Project 4",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: p5, 
      alt: "Project 5",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    {
      src: d5, 
      alt: "Design Showcase",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
  ];

  return (
    <>
      <Hero />
      <Work />
      <ParallexGallery />
      
      {/* 3 Row Scroll Gallery - REVERSED WHEN SCROLLING */}
      <section className="w-full py-10 bg-black">
        <div className="mb-12">
          <p className="text-gray-400 mt-4 px-5">
            Hover over images to see details
          </p>
        </div>

        <ThreeDScrollTriggerContainer>
          {/* Row 1: Moves LEFT when scrolling DOWN (معاكس للتمرير) */}
          <ThreeDScrollTriggerRow 
            baseVelocity={3} 
            direction={-1}  // يتحرك لليسار عندما نمرر لأسفل
            images={images}
            className="py-2"
          />

          {/* Row 2: Moves RIGHT when scrolling DOWN (معاكس للتمرير) */}
          <ThreeDScrollTriggerRow 
            baseVelocity={3} 
            direction={1}  // يتحرك لليمين عندما نمرر لأسفل
            images={images}
            className="py-2"
          />

          {/* Row 3: Moves LEFT when scrolling DOWN (معاكس للتمرير) */}
          <ThreeDScrollTriggerRow 
            baseVelocity={3} 
            direction={-1}  // يتحرك لليسار عندما نمرر لأسفل
            images={images}
            className="py-2"
          />
        </ThreeDScrollTriggerContainer>
      </section>

      <StudioSection />
      <ThreeDMarquee images={images2} />
      <CTAHeroSection />
      <ProjectsGrid />
      <Footer />
    </>
  );
};

export default Home;