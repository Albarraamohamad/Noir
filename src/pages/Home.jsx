import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from "../components/Hero";
import Work from "../components/Work";
import Footer from "../components/Footer";
import StudioSection from "../components/Studio";
import CTAHeroSection from "../components/Cta";
import '../App.css'
import ParallaxGallery from "../components/Slide";
import WebDevelopmentSection from '../components/Layers';

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

  return (
    <>
      <Hero  />
      <Work />
      <ParallaxGallery/>
      <StudioSection/>
      <CTAHeroSection/>
      <WebDevelopmentSection/>
      <Footer />
    </>
  );
};

export default Home;