import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRef = useRef([]);
  const contactRef = useRef([]);
  const newsletterRef = useRef(null);
  const awardsRef = useRef([]);
  const bottomLinksRef = useRef([]);
  const topRowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. ENTRANCE ANIMATION ON SCROLL ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // Starts when footer is 85% down the screen
          toggleActions: "play none none none"
        }
      });

      tl.fromTo([logoRef.current, ".footer-desc"], 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      )
      .fromTo(contactRef.current, 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 
        "-=0.4"
      )
      .fromTo(newsletterRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, 
        "-=0.6"
      )
      .fromTo(columnsRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }, 
        "-=0.4"
      )
      .fromTo(awardsRef.current, 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, 
        "-=0.5"
      )
      .fromTo(".footer-bottom", 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }, 
        "-=0.3"
      );

      // --- 2. INTERACTIVE HOVER ANIMATIONS ---
      // Logo Hover
      if (logoRef.current) {
        logoRef.current.addEventListener('mouseenter', () => gsap.to(logoRef.current, { scale: 1.05, duration: 0.3 }));
        logoRef.current.addEventListener('mouseleave', () => gsap.to(logoRef.current, { scale: 1, duration: 0.3 }));
      }

      // Column Links Hover
      columnsRef.current.forEach((link) => {
        if (!link) return;
        link.addEventListener('mouseenter', () => {
          gsap.to(link, { x: 8, color: '#ffffff', duration: 0.3 });
          gsap.to(link.querySelector('.arrow-icon'), { x: 4, opacity: 1, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { x: 0, color: '#9ca3af', duration: 0.3 });
          gsap.to(link.querySelector('.arrow-icon'), { x: 0, opacity: 0, duration: 0.3 });
        });
      });

      // Social Icons Hover
      socialRef.current.forEach((icon) => {
        if (!icon) return;
        icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.2, y: -4, rotation: 10, duration: 0.4, ease: 'back.out(2)' }));
        icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1, y: 0, rotation: 0, duration: 0.4 }));
      });

      // Newsletter Button Hover
      if (newsletterRef.current) {
        const btn = newsletterRef.current.querySelector('.newsletter-btn');
        btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.1, rotation: 90, duration: 0.3 }));
        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, rotation: 0, duration: 0.3 }));
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  // ... (Data objects footerLinks, contactInfo, awards, socialLinks remain the same) ...
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
    { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'hello@noirstudio.com', link: 'mailto:hello@noirstudio.com' },
    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: '123 Design Street, SF', link: '#' }
  ];

  const awards = [
    { name: 'Awwwards', year: '2024' },
    { name: 'CSS Design Awards', year: '2023' },
    { name: 'Webby Awards', year: '2023' },
    { name: 'FWA', year: '2022' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25zm9.95 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7', color: 'hover:bg-pink-600' },
    { name: 'Twitter', icon: 'M22 5.924a8.982 8.982 0 0 1-2.357.646 4.125 4.125 0 0 0 1.804-2.27 8.225 8.225 0 0 1-2.605.996 4.108 4.108 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.714v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.41a11.615 11.615 0 0 0 6.29 1.84c7.545 0 11.67-6.25 11.67-11.668 0-.18-.004-.356-.012-.53A8.298 8.298 0 0 0 22 5.924', color: 'hover:bg-blue-400' },
    { name: 'LinkedIn', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z', color: 'hover:bg-blue-700' },
  ];

  return (
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden border-t border-white/10">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div ref={logoRef} className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">NOIR</h2>
                <p className="text-sm text-gray-400 mt-1">Creative Studio</p>
              </div>
            </div>
            <p className="footer-desc text-gray-400 leading-relaxed max-w-md">
              A forward-thinking creative studio crafting exceptional digital experiences for visionary brands worldwide.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a key={index} ref={el => contactRef.current[index] = el} href={info.link} className="flex items-start gap-4">
                  <div className="icon-bg w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                    </svg>
                  </div>
                  <span className="contact-text pt-1.5 text-gray-400">{info.text}</span>
                </a>
              ))}
            </div>
          </div>

          <div ref={newsletterRef} className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <div className="relative group">
              <input type="email" placeholder="Enter your email" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none pr-12" />
              <button className="newsletter-btn absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {Object.entries(footerLinks).map(([key, links], colIndex) => (
            <div key={key} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-6">{key}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a ref={el => columnsRef.current[colIndex * 6 + linkIndex] = el} href={link.path} className="text-gray-400 inline-flex items-center">
                      <span>{link.name}</span>
                      <svg className="arrow-icon w-4 h-4 ml-2 opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-6">Recognition</h3>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <div key={index} ref={el => awardsRef.current[index] = el} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <span className="text-white font-medium">{award.name}</span>
                  <span className="award-year text-gray-400 text-sm">{award.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} NOIR Studio.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a key={social.name} ref={el => socialRef.current[index] = el} href="#" className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${social.color} transition-colors group`}>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d={social.icon} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
    </footer>
  );
};

export default Footer;