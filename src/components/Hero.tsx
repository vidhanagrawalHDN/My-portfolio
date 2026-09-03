import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  FileText, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto } from '../lib/useProfilePhoto';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const { photo } = useProfilePhoto();

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section id="about" className="pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden relative border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Issue Ticker */}
        <div className="flex justify-between items-baseline mb-6 border-b border-black/15 pb-2 text-[10px] font-mono uppercase tracking-widest text-black/60">
          <span>Issue Vol. 026 • Portfolio Index</span>
          <span>Phagwara, PB / Madhya Pradesh, India</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-black bg-[#F5F5F4] text-[#121212] text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-black animate-ping"></span>
              <span>{personalInfo.status}</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-[#121212]">
                {personalInfo.name}
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] font-medium opacity-60 italic text-black">
                Developer & Data Analytics Enthusiast • {personalInfo.title}
              </p>
            </div>

            {/* Academic Credential Highlight */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#121212] bg-[#F5F5F4] p-3.5 border border-black">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-black shrink-0" />
                <span>Lovely Professional University</span>
              </div>
              <span className="opacity-30">/</span>
              <span className="font-medium">B.Tech Computer Science & Engineering</span>
              <span className="opacity-30">/</span>
              <span className="inline-flex items-center px-2 py-0.5 bg-black text-white font-serif italic text-xs font-bold">
                9.3 CGPA
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base text-[#121212]/85 leading-relaxed text-justify font-sans">
              {personalInfo.about}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                id="hero-view-projects-btn"
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider border border-black transition-colors"
              >
                <span>Selected Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                id="hero-view-certificates-btn"
                href="#certificates"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-black hover:text-white text-black font-bold text-xs uppercase tracking-wider border border-black transition-colors"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certifications (6)</span>
              </a>

              <button
                id="hero-download-cv-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F5F5F4] hover:bg-black hover:text-white text-black font-bold text-xs uppercase tracking-wider border border-black transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </button>
            </div>

            {/* Quick Contact Badges */}
            <div className="pt-4 border-t border-black/15 flex flex-wrap items-center gap-2 text-xs text-[#121212]">
              
              {/* Email with copy */}
              <div 
                id="hero-contact-email"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black hover:bg-[#F5F5F4] transition-colors cursor-pointer group"
                onClick={() => handleCopy(personalInfo.email, 'email')}
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-black" />
                <span className="font-serif italic font-medium">{personalInfo.email}</span>
                {copiedType === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-black ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 ml-1" />
                )}
              </div>

              {/* Phone with copy */}
              <div 
                id="hero-contact-phone"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black hover:bg-[#F5F5F4] transition-colors cursor-pointer group"
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                title="Click to copy phone"
              >
                <Phone className="w-3.5 h-3.5 text-black" />
                <span className="font-mono text-xs">{personalInfo.phone}</span>
                {copiedType === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-black ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 ml-1" />
                )}
              </div>

              {/* GitHub Link */}
              <a
                id="hero-social-github"
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">{personalInfo.githubUsername}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {/* LinkedIn Link */}
              <a
                id="hero-social-linkedin"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">{personalInfo.linkedinUsername}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5F4] border border-black/30 text-black/70 text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span className="uppercase text-[10px] font-bold tracking-wider">PB & MP, India</span>
              </div>

            </div>

          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl bg-[#F5F5F4] border-2 border-black p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-6 gap-4">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-28 h-36 sm:w-36 sm:h-44 border-2 border-black bg-white overflow-hidden shrink-0 shadow-sm">
                    <img 
                      src={photo} 
                      alt={personalInfo.name} 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/profile.png';
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#121212] leading-tight">{personalInfo.name}</h2>
                    <p className="text-xs uppercase font-bold tracking-widest opacity-70">Full-Stack & Data Engineer</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-black border border-black px-2 py-0.5 bg-white">
                        Rank 9.3 CGPA
                      </span>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white bg-black px-2 py-0.5">
                        LPU CSE '26
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-start sm:self-auto shrink-0">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase border border-black bg-white">
                    DOC / 026
                  </span>
                </div>
              </div>

              {/* Core Skill Pills */}
              <div className="space-y-2.5">
                <div className="text-xs font-black uppercase tracking-widest text-black">
                  Technical Stack
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {["Python", "Node.js", "React", "SQL Server", "Tableau", "Power BI", "Cognos", "Figma", "Vercel", "Supabase", "C", "JS (ES6+)"].map((item) => (
                    <span 
                      key={item}
                      className="px-2.5 py-1 border border-black text-[10px] font-bold uppercase text-black bg-white hover:bg-black hover:text-white transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Highlight Cards */}
              <div className="space-y-2.5 border-t-2 border-black pt-4">
                <div className="p-3.5 bg-white border border-black/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-serif italic font-bold text-base shrink-0">
                      9.3
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black">Academic CGPA</p>
                      <p className="text-xs italic font-serif opacity-70">Lovely Professional University</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase border border-black px-2 py-0.5 bg-[#F5F5F4] shrink-0">
                    B.Tech CSE
                  </span>
                </div>

                <div className="p-3.5 bg-white border border-black/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      IBM
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black">Summer Training</p>
                      <p className="text-xs italic font-serif opacity-70">BI & Data Visualization</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase border border-black px-2 py-0.5 bg-[#F5F5F4] shrink-0">
                    Cognos / Tableau
                  </span>
                </div>

                <div className="p-3.5 bg-white border border-black/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-serif italic font-bold text-base shrink-0">
                      06
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black">Verified Credentials</p>
                      <p className="text-xs italic font-serif opacity-70">Infosys, Saylor, iamNeo, Times</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase border border-black px-2 py-0.5 bg-[#F5F5F4] shrink-0">
                    Verified
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-black/70 border-t-2 border-black">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 bg-black"></span>
                  PHAGWARA, PB
                </span>
                <span className="font-bold">
                  READY FOR HIRE
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
