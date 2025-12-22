import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from "../components/Hero";
import Work from "../components/Work";
import Footer from "../components/Footer";
import StudioSection from "../components/Studio";
import CTAHeroSection from "../components/Cta";
import '../App.css'
import ParallexGallery from "../components/Slide";
import { ScrollTimeline } from "../components/lightswind/scroll-timeline"
import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';

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

  const events = [
    {
      year: "2023",
      title: "Major Achievement",
      subtitle: "Organization Name",
      description: "Description of the achievement.",
      image: p1, // Added image
    },
    {
      year: "2022",
      title: "Important Milestone",
      subtitle: "Organization Name",
      description: "Details about the milestone.",
      image: p2, // Added image
    },
     {
      year: "2022",
      title: "Important Milestone",
      subtitle: "Organization Name",
      description: "Details about the milestone.",
      image: p2, // Added image
    },
     {
      year: "2022",
      title: "Important Milestone",
      subtitle: "Organization Name",
      description: "Details about the milestone.",
      image: p2, // Added image
    },
     {
      year: "2022",
      title: "Important Milestone",
      subtitle: "Organization Name",
      description: "Details about the milestone.",
      image: p2, // Added image
    },
     {
      year: "2022",
      title: "Important Milestone",
      subtitle: "Organization Name",
      description: "Details about the milestone.",
      image: p2, // Added image
    },
  ];

  return (
    <>
      <Hero />
      <Work />
      <ParallexGallery />
      <StudioSection />
      <CTAHeroSection />
      <ScrollTimeline 
        events={events}
        title="My Journey"
        subtitle="Scroll to explore the timeline"
        progressIndicator={true}
        cardAlignment="alternating"
        revealAnimation="fade"
      />
      <Footer />
    </>
  );
};

export default Home;