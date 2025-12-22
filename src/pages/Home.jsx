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
import p1 from '/src/assets/p1.png'
import p2 from '/src/assets/p2.png'
import p3 from '/src/assets/p3.png'
import p4 from '/src/assets/p4.png'
import p5 from '/src/assets/p5.png'
import d1 from '/src/assets/d1.png'
import d2 from '/src/assets/d2.png'
import d3 from '/src/assets/d3.png'
import d4 from '/src/assets/d4.png'
import d5 from '/src/assets/d5.png'
import d6 from '/src/assets/d6.png'
import d7 from '/src/assets/d7.png'
import d8 from '/src/assets/d8.png'
import d9 from '/src/assets/d9.png'

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
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: d4, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: d5, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: d6, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: d7, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: d8, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: d9, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     
  ];
const images2 = [
   
    {
      src: p1, 
      alt: "Project 4",
      title: "Digital Excellence",
      description: "Premium quality work"
    },
    {
      src: p2, 
      alt: "Project 5",
      title: "Modern Design",
      description: "Cutting-edge UI/UX design"
    },
    {
      src: p3, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: p4, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },

     {
      src: p5, 
      alt: "Project 6",
      title: "Creative Vision",
      description: "Innovative digital solutions"
    },
     {
      src: d5, 
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