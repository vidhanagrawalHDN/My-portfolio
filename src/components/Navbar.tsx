import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Send, Github, Linkedin, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certificates' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FDFDFD]/95 backdrop-blur-md border-b border-black py-2.5 shadow-xs'
          : 'bg-[#FDFDFD]/90 backdrop-blur-xs border-b border-black/20 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#about"
          id="navbar-brand-logo"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 bg-black text-white font-black flex items-center justify-center text-xs tracking-widest border border-black group-hover:bg-neutral-800 transition-colors">
            VA
          </div>
          <div>
            <span className="font-serif italic font-bold text-[#121212] tracking-tight text-base sm:text-lg block leading-tight">
              {personalInfo.name}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              CGPA 9.3 • LPU
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase()}`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-black/70 hover:text-black hover:underline underline-offset-4 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            id="navbar-resume-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-black hover:text-white border border-black transition-colors"
            title="View Formatted CV / Print"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume / CV</span>
          </button>

          <a
            id="navbar-contact-cta"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 border border-black transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-resume-btn"
            onClick={onOpenResume}
            className="p-2 text-black hover:bg-black hover:text-white border border-black transition-colors"
            aria-label="View Resume"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black hover:bg-neutral-100 border border-black transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-dropdown"
          className="lg:hidden bg-[#FDFDFD] border-b border-black px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2"
        >
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white border border-transparent hover:border-black transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-black/15 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#F5F5F4] hover:bg-black hover:text-white border border-black transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View & Print CV</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 border border-black transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Contact Vidhan</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
