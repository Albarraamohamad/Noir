import Hero from "../components/Hero";
import Work from "../components/Work";
import Footer from "../components/Footer";
import StudioSection from "../components/Studio";
import CTAHeroSection from "../components/Cta";
import '../App.css'
import ParallaxGallery from "../components/Slide";

const Home = () => {
  return (
    <>
     
      <Hero />
      <Work />
      <ParallaxGallery/>
      <StudioSection/>
      <CTAHeroSection/>
      <Footer />
    </>
  );
};

export default Home;
