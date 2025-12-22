import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from "../components/Hero";
import Work from "../components/Work";
import Footer from "../components/Footer";
import StudioSection from "../components/Studio";
import CTAHeroSection from "../components/Cta";
import '../App.css'
import ParallexGallery from "../components/Slide";
import { ThreeDMarquee } from "../components/lightswind/3d-marquee";
import { 
    ThreeDScrollTriggerContainer, 
    ThreeDScrollTriggerRow 
} from '../components/lightswind/3d-scroll-trigger';
import ProjectsGrid from '../components/Projects';

const Home = () => {
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

  const images = [
   
    {
      src: "/src/assets/p4.png", 
      alt: "Project 4",
      title: "Digital Excellence",
      description: "Premium quality work"
    },
    {
      src: "/src/assets/d1.png", 
      alt: "Project 5",
      title: "Modern Design",
      description: "Cutting-edge UI/UX design"
    },
    {
      src: "/src/assets/d2.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d3.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d4.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d5.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d6.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d7.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d8.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d9.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     
  ];
const images2 = [
   
    {
      src: "/src/assets/p1.png", 
      alt: "Project 4",
      title: "Digital Excellence",
      description: "Premium quality work"
    },
    {
      src: "/src/assets/p2.png", 
      alt: "Project 5",
      title: "Modern Design",
      description: "Cutting-edge UI/UX design"
    },
    {
      src: "/src/assets/p3.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/p4.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },

     {
      src: "/src/assets/p5.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: "/src/assets/d5.png", 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
    
   
     
  ];
  return (
    <>
      <Hero />
      <Work />
      <ParallexGallery />
      
      {/* 3 Row Scroll Gallery */}
      <section className="w-full py-10 bg-black">
        <div className=" mb-12 ">
          <h2 className="text-4xl  md:text-5xl font-bold text-[#c0ff0d] px-5">
             GALLERY
          </h2>
          <p className="text-gray-400  mt-4 px-5">
            Hover over images to see details
          </p>
        </div>

        <ThreeDScrollTriggerContainer>
          {/* Row 1: Moves RIGHT when scrolling down */}
          <ThreeDScrollTriggerRow 
            baseVelocity={3} 
            direction={1}
            images={images}
            className="py-2"
          />

          {/* Row 2: Moves LEFT when scrolling down (opposite direction) */}
          <ThreeDScrollTriggerRow 
            baseVelocity={3} 
            direction={-1}
            images={images}
            className="py-2"
          />

          {/* Row 3: Moves RIGHT when scrolling down */}
          <ThreeDScrollTriggerRow 
            baseVelocity={3} 
            direction={1}
            images={images}
            className="py-2"
          />
        </ThreeDScrollTriggerContainer>
      </section>

      <StudioSection />
      <ThreeDMarquee images={images2} />
      <CTAHeroSection />
      <ProjectsGrid/>
      <Footer />
    </>
  );
};

export default Home;