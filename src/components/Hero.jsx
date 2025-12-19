import { useEffect, useRef, useState } from "react";
import bg from "/src/assets/nbg.mp4";

const Hero = () => {
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Button hover effects only
    const buttons = document.querySelectorAll(".hero-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-4px)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0)";
      });
    });
  }, []);

  const handleDropdownHover = (menu, isEnter) => {
    const dropdown = document.querySelector(`[data-dropdown="${menu}"]`);
    if (!dropdown) return;

    if (isEnter) {
      dropdown.style.opacity = "1";
      dropdown.style.visibility = "visible";
      dropdown.style.transform = "translateY(0)";
    } else {
      dropdown.style.opacity = "0";
      dropdown.style.visibility = "hidden";
      dropdown.style.transform = "translateY(-10px)";
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Navbar - Absolute Position Over Video */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 w-full z-50 border-b border-white/10 transition-all duration-300  backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex justify-between items-center h-20">
          {/* Logo */}
          <div className="text-2xl font-serif italic text-white hover:opacity-80 transition cursor-pointer">
            NOIR
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-14 items-center h-full">
            {[
              { name: "Work", dropdown: false },
              { name: "About", dropdown: false },
              { name: "Contact", dropdown: false },
              { name: "Studio", dropdown: true },
            ].map((item) => (
              <div
                key={item.name}
                className="relative h-full flex items-center group nav-item"
                onMouseEnter={() => item.dropdown && handleDropdownHover(item.name, true)}
                onMouseLeave={() => item.dropdown && handleDropdownHover(item.name, false)}
              >
                <a
                  href="#"
                  className="relative text-sm font-medium text-white hover:text-gray-300 transition flex items-center gap-2"
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  )}
                </a>

                {/* Animated Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div
                    data-dropdown={item.name}
                    className="absolute left-1/2 transform -translate-x-1/2 w-40 bg-black border border-white/20 rounded-lg shadow-2xl opacity-0 invisible transition-all duration-200"
                    style={{ top: "100%", marginTop: "8px" }}
                  >
                    {["Design", "Development", "Strategy"].map((subitem, idx) => (
                      <a
                        key={subitem}
                        href="#"
                        className="block px-6 py-3 text-sm text-white hover:bg-white/10 transition duration-200"
                        style={{
                          borderRadius:
                            idx === 0 ? "0.5rem 0.5rem 0 0" : idx === 2 ? "0 0 0.5rem 0.5rem" : "0",
                          borderBottom: idx !== 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                        }}
                      >
                        {subitem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Inquire Button */}
          <div className="hidden lg:block">
            <button className="group relative px-6 py-2.5 bg-white text-black font-semibold rounded-full text-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20">
              <span className="relative z-10">Inquire</span>
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-6 h-6 relative z-50"
          >
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black border-t border-white/10 p-6 space-y-4">
            {["Work", "About", "Contact", "Studio"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-sm font-medium text-white hover:text-gray-300 transition py-3 border-b border-white/10"
              >
                {item}
              </a>
            ))}
            <button className="w-full mt-4 px-6 py-3 bg-white text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300">
              Inquire
            </button>
          </div>
        )}
      </nav>

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bg} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full grid md:grid-cols-2 items-center gap-12 pt-20">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          We build experiences that endure
        </h1>

        <div className="space-y-6 text-left md:text-right">
          <p ref={descRef} className="text-base md:text-lg text-white/90 max-w-md md:ml-auto">
            A creative studio crafting timeless design for brands that matter. We work at the intersection of strategy and beauty.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <button className="hero-btn px-6 py-2.5 bg-white text-black font-bold rounded hover:shadow-lg hover:shadow-white/30 transition-all duration-300">
              Explore
            </button>
            <button className="hero-btn px-6 py-2.5 border border-white text-white font-bold rounded hover:bg-white/10 transition-all duration-300">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce text-2xl">
        ↓
      </div>
    </section>
  );
};

export default Hero;