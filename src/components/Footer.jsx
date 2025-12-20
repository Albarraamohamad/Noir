  import React, { useEffect, useRef } from 'react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { Link } from 'react-router-dom';
  import logo from '/src/assets/niorlogo.png'

  gsap.registerPlugin(ScrollTrigger);

  const Footer = () => {
    const footerRef = useRef(null);
    const logoRef = useRef(null);
    const columnsRef = useRef([]);
    const socialRef = useRef(null);
    const bottomRef = useRef(null);
    const newsletterRef = useRef(null);
    const contactInfoRef = useRef(null);
    const awardsRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
      const ctx = gsap.context(() => {
        // Footer entrance animation
        gsap.from(footerRef.current, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });

        // Stagger animations for different sections
        const sections = [
          { ref: logoRef, delay: 0.2 },
          { ref: contactInfoRef, delay: 0.3 },
          { ref: newsletterRef, delay: 0.4 },
          { ref: awardsRef, delay: 0.5 }
        ];

        sections.forEach((section, index) => {
          if (section.ref.current) {
            gsap.from(section.ref.current, {
              opacity: 0,
              y: 30,
              duration: 0.8,
              delay: section.delay,
              ease: 'power3.out'
            });
          }
        });

        // Column animations
        columnsRef.current.forEach((col, index) => {
          if (col) {
            gsap.from(col.children, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out',
              delay: 0.4 + (index * 0.1)
            });
          }
        });

        // Social icons animation
        if (socialRef.current) {
          gsap.from(socialRef.current.children, {
            opacity: 0,
            scale: 0,
            rotation: 180,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.8
          });
        }

        // Bottom section animation
        if (bottomRef.current) {
          gsap.from(bottomRef.current.children, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            delay: 1,
            ease: 'power3.out'
          });
        }

        // Create floating particles
        createParticles();

      }, footerRef);

      return () => ctx.revert();
    }, []);

    const createParticles = () => {
      particlesRef.current.forEach(particle => {
        if (particle) {
          gsap.to(particle, {
            y: gsap.utils.random(-20, 20),
            x: gsap.utils.random(-15, 15),
            rotation: gsap.utils.random(-180, 180),
            duration: gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      });
    };

    const footerLinks = {
      services: [
        { name: 'Brand Strategy', path: '/services/brand-strategy' },
        { name: 'Web Development', path: '/services/web-development' },
        { name: 'UI/UX Design', path: '/services/ui-ux-design' },
        { name: 'Motion Graphics', path: '/services/motion-graphics' },
        { name: 'Content Creation', path: '/services/content-creation' },
        { name: 'Digital Marketing', path: '/services/digital-marketing' },
      ],
      work: [
        { name: 'All Projects', path: '/work' },
        { name: 'Case Studies', path: '/work/case-studies' },
        { name: 'Brand Identity', path: '/work/brand-identity' },
        { name: 'Digital Products', path: '/work/digital-products' },
        { name: 'Campaigns', path: '/work/campaigns' },
        { name: 'Awards', path: '/work/awards' },
      ],
      company: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Press', path: '/press' },
        { name: 'Partners', path: '/partners' },
      ],
      resources: [
        { name: 'Style Guide', path: '/resources/style-guide' },
        { name: 'Toolkit', path: '/resources/toolkit' },
        { name: 'Documentation', path: '/resources/docs' },
        { name: 'Tutorials', path: '/resources/tutorials' },
        { name: 'Community', path: '/resources/community' },
        { name: 'Help Center', path: '/help' },
      ]
    };

    const contactInfo = [
      { 
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        text: 'hello@noirstudio.com',
        link: 'mailto:hello@noirstudio.com'
      },
      { 
        icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
        text: '+1 (555) 123-4567',
        link: 'tel:+15551234567'
      },
      { 
        icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
        text: '123 Design Street, San Francisco, CA 94107',
        link: 'https://maps.google.com'
      }
    ];

    const awards = [
      { name: 'Awwwards', year: '2024' },
      { name: 'CSS Design Awards', year: '2023' },
      { name: 'Webby Awards', year: '2023' },
      { name: 'FWA', year: '2022' }
    ];

    const socialLinks = [
      { 
        name: 'Instagram', 
        icon: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25zm9.95 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7',
        color: 'hover:bg-gradient-to-br from-purple-600 to-pink-600'
      },
      { 
        name: 'Twitter', 
        icon: 'M22 5.924a8.982 8.982 0 0 1-2.357.646 4.125 4.125 0 0 0 1.804-2.27 8.225 8.225 0 0 1-2.605.996 4.108 4.108 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.714v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.41a11.615 11.615 0 0 0 6.29 1.84c7.545 0 11.67-6.25 11.67-11.668 0-.18-.004-.356-.012-.53A8.298 8.298 0 0 0 22 5.924',
        color: 'hover:bg-gradient-to-br from-blue-400 to-blue-600'
      },
      { 
        name: 'LinkedIn', 
        icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z',
        color: 'hover:bg-gradient-to-br from-blue-700 to-blue-900'
      },
      { 
        name: 'Dribbble', 
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm4.06 6.63c.94.6 1.7 1.42 2.26 2.38.12.21.23.43.33.66-1.34.6-2.75.93-4.21.93-.87 0-1.72-.12-2.53-.34.17-.39.33-.78.47-1.17.74.28 1.53.43 2.34.43.83 0 1.64-.15 2.39-.44a9.9 9.9 0 0 0-.16-1.85zm-2.85-1.25c.19.39.36.79.51 1.2a14.2 14.2 0 0 0-2.33-.2c-.8 0-1.58.08-2.33.23.15-.41.32-.81.51-1.2.9-.33 1.87-.51 2.86-.51.99 0 1.96.18 2.86.51zM8.52 4.78c.74.13 1.48.3 2.21.51.18.39.35.8.5 1.22-.72.18-1.47.27-2.23.27s-1.51-.09-2.23-.27c.15-.42.32-.83.5-1.22.73-.21 1.47-.38 2.21-.51zM4.68 9.3c.13.86.34 1.7.62 2.51.28-.63.65-1.22 1.09-1.76-.44-.5-.81-1.08-1.09-1.67-.14.3-.26.61-.36.92h.02c-.09.31-.17.63-.23.95v.05zm.75 4.48c-.6-1.05-1-2.21-1.19-3.43.08-.33.17-.65.27-.96.11.33.23.65.37.96.6 1.05 1.35 1.99 2.21 2.82-.81.17-1.64.28-2.49.34-.08-.29-.15-.58-.21-.87v.04zm1.94 3.18c-.73-.67-1.35-1.44-1.85-2.28.85-.06 1.71-.17 2.55-.34.3.38.62.75.96 1.1-.56.5-1.19.93-1.85 1.28-.08-.04-.16-.07-.24-.11v-.05zm2.73 1.51c-.88-.24-1.73-.56-2.54-.95.64-.37 1.22-.81 1.73-1.32.34.35.69.68 1.06.99.04.08.08.16.12.24-.45.35-.94.65-1.46.9l.09.14zm4.57.45c-.52-.07-1.03-.18-1.53-.32.37-.27.72-.57 1.05-.9.04-.08.08-.16.11-.24.37-.30.71-.63 1.03-.98.50.51 1.08.95 1.72 1.32-.80.39-1.65.71-2.53.95l.15.17zm3.24-1.51c-.66-.35-1.29-.78-1.85-1.28.34-.35.66-.72.96-1.10.84.17 1.70.28 2.55.34-.50.84-1.12 1.61-1.85 2.28-.08.04-.16.07-.24.11v-.05zm1.94-3.18c-.85-.06-1.68-.17-2.49-.34.86-.83 1.61-1.77 2.21-2.82.14-.31.26-.63.37-.96.10.31.19.63.27.96-.19 1.22-.59 2.38-1.19 3.43-.08.29-.15.58-.21.87v-.04z',
        color: 'hover:bg-gradient-to-br from-pink-500 to-red-500'
      },
      { 
        name: 'Behance', 
        icon: 'M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5h6.457c3.215 0 5.083 1.527 5.083 4.547 0 2.6-1.734 4.125-4.287 4.125H3.303v4.316zM3.303 10.9h2.87c1.304 0 2.227-.584 2.227-1.804 0-1.183-.833-1.822-2.227-1.822H3.303v3.626z',
        color: 'hover:bg-gradient-to-br from-blue-500 to-blue-700'
      }
    ];

    const currentYear = new Date().getFullYear();

    return (
      <footer 
        ref={footerRef}
        className="relative bg-black text-white overflow-hidden border-t border-white/10"
      >
        {/* Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              ref={el => particlesRef.current[i] = el}
              className="absolute rounded-full bg-white/5"
              style={{
                width: gsap.utils.random(2, 6) + 'px',
                height: gsap.utils.random(2, 6) + 'px',
                left: gsap.utils.random(0, 100) + '%',
                top: gsap.utils.random(0, 100) + '%',
              }}
            />
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* Top Section - Logo & Contact Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Logo & Description */}
            <div ref={logoRef} className="space-y-6">
              <div className="flex items-center gap-4">
              
                <div>
                  <img src={logo} alt="" className='w-64' />
                  <p className="text-sm text-gray-400 mt-1">Creative Studio</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                A forward-thinking creative studio crafting exceptional digital experiences 
                for visionary brands worldwide.
              </p>
            </div>

            {/* Contact Information */}
            <div ref={contactInfoRef} className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <svg 
                        className="w-5 h-5"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                      </svg>
                    </div>
                    <span className="pt-1.5 group-hover:translate-x-1 transition-transform duration-300">
                      {info.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div ref={newsletterRef} className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for the latest insights and updates.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300 pr-12"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

          {/* Middle Section - Links & Awards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Link Columns */}
            {Object.entries(footerLinks).map(([key, links], index) => (
              <div 
                key={key}
                ref={el => columnsRef.current[index] = el}
                className="space-y-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-6">
                  {key}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white transition-colors duration-300 group inline-flex items-center"
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                          {link.name}
                        </span>
                        <svg 
                          className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Awards Section */}
            <div ref={awardsRef} className="lg:col-span-1 space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-6">
                Awards & Recognition
              </h3>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-white font-medium">{award.name}</span>
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
                      {award.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

          {/* Bottom Section */}
          <div 
            ref={bottomRef}
            className="flex flex-col md:flex-row justify-between items-center gap-8"
          >
            {/* Copyright & Links */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-gray-500 text-sm text-center md:text-left">
                <p>© {currentYear} NOIR Studio. All rights reserved.</p>
                <p className="mt-1 text-xs text-gray-600">
                  Crafted with passion in San Francisco
                </p>
              </div>
              
              {/* Policy Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div 
              ref={socialRef}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${social.color} transition-all duration-300 group relative`}
                  aria-label={social.name}
                >
                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10">
                    {social.name}
                  </span>
                  
                  {/* Icon */}
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="absolute bottom-6 right-6 z-20">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <svg 
              className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      </footer>
    );
  };

  export default Footer;