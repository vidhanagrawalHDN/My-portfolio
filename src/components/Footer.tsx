import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black bg-[#F5F5F4] py-8 text-black text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-black bg-white text-black font-serif italic font-bold flex items-center justify-center text-sm">
              VA
            </div>
            <div>
              <div className="font-serif italic font-bold text-black text-sm">{personalInfo.name}</div>
              <div className="text-[11px] font-mono text-black/60">
                Lovely Professional University • B.Tech CSE (CGPA: 9.3)
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 text-black">
            <a
              id="footer-github"
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-black bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              id="footer-linkedin"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-black bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              id="footer-email"
              href={`mailto:${personalInfo.email}`}
              className="p-2 border border-black bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a
              id="footer-phone"
              href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
              className="p-2 border border-black bg-white hover:bg-black hover:text-white transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Back to Top */}
          <div className="flex items-center gap-3">
            <span className="text-black/60 font-mono text-[10px] uppercase tracking-wider">
              Editorial Edition • {new Date().getFullYear()}
            </span>
            <button
              id="scroll-to-top-btn"
              onClick={scrollToTop}
              className="p-2 border border-black bg-white hover:bg-black hover:text-white text-black transition-colors"
              aria-label="Scroll back to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

