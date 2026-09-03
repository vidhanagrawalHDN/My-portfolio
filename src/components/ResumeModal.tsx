import React from 'react';
import { X, Printer, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { personalInfo, projects, experienceData, certificates, educationList } from '../data/portfolioData';
import { useProfilePhoto } from '../lib/useProfilePhoto';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { photo } = useProfilePhoto();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="resume-view-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#FDFDFD] w-full max-w-4xl border-2 border-black overflow-hidden flex flex-col max-h-[95vh] my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Bar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-black bg-[#F5F5F4] print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
              Curriculum Vitae • Vidhan Agrawal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 border border-black bg-white text-black font-bold uppercase">
              Academic & Engineering Record
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-black bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 border border-black bg-white hover:bg-black hover:text-white text-black transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Canvas */}
        <div id="printable-resume-document" className="p-6 sm:p-10 overflow-y-auto bg-white font-sans text-black space-y-6">
          
          {/* Header with Photo */}
          <div className="border-b-2 border-black pb-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            
            {/* Left: Professional Photo */}
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="w-28 h-36 sm:w-32 sm:h-40 border-2 border-black bg-[#F5F5F4] overflow-hidden">
                  <img
                    id="cv-profile-photo"
                    src={photo}
                    alt="Vidhan Agrawal"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/profile.png';
                    }}
                  />
                </div>
              </div>

              {/* Personal Info & Title */}
              <div className="text-left space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black/60 block">
                  Curriculum Vitae • Engineering Portfolio
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif italic tracking-tight font-bold text-black">
                  {personalInfo.name}
                </h1>
                <p className="text-xs sm:text-sm font-sans font-medium text-black/85">
                  Full-Stack Web Developer & Data Science Enthusiast
                </p>
                <div className="inline-flex items-center gap-2 mt-1 px-2.5 py-0.5 border border-black bg-[#F5F5F4] text-xs font-mono font-bold text-black">
                  <span>LPU B.Tech CSE</span>
                  <span>•</span>
                  <span>CGPA: 9.3 / 10.0</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Registry */}
            <div className="text-xs font-mono text-black/80 text-center sm:text-right space-y-1.5 self-center sm:self-start">
              <div>
                <a href={`mailto:${personalInfo.email}`} className="hover:underline font-bold text-black">
                  {personalInfo.email}
                </a>
              </div>
              <div className="font-bold text-black">{personalInfo.phone}</div>
              <div className="text-[11px] text-black/70">
                {personalInfo.location}
              </div>
              <div className="flex sm:justify-end items-center gap-2 pt-1 text-[11px]">
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline font-bold text-black flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                </a>
                <span>•</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline font-bold text-black flex items-center gap-1">
                  <Linkedin className="w-3 h-3" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Academic Education
            </h2>
            <div className="space-y-3 text-xs">
              {educationList.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start border-b border-black/10 pb-2">
                  <div>
                    <div className="font-serif italic font-bold text-sm text-black">{edu.institution}</div>
                    <div className="text-black/70 font-sans">{edu.degree} {edu.field ? `(${edu.field})` : ''}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="font-bold text-black">{edu.scoreLabel}: {edu.scoreValue}</div>
                    <div className="text-black/60 text-[11px]">{edu.location} | {edu.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-2.5">
              Technical & Core Competencies
            </h2>
            <div className="text-xs space-y-1.5 font-mono">
              <div>
                <span className="font-bold text-black uppercase">Languages: </span>
                <span className="text-black/80 font-sans">Python, C, HTML, CSS, JavaScript, Node.js, React, JSON</span>
              </div>
              <div>
                <span className="font-bold text-black uppercase">Tools & Platforms: </span>
                <span className="text-black/80 font-sans">Tableau, Power BI, Cognos, MS SQL Server, Figma, CapCut, AI, Vercel, GitHub, Render, Supabase</span>
              </div>
              <div>
                <span className="font-bold text-black uppercase">Soft Skills: </span>
                <span className="text-black/80 font-sans">Active Listener, Time Management, Project Management, Adaptability, Team Leader</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Engineering Projects
            </h2>
            <div className="space-y-4 text-xs">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1 border-b border-black/10 pb-3">
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <div>
                      <span className="font-serif italic text-sm">{proj.title}</span>
                      <span className="font-mono text-xs text-black/60 ml-2 font-normal">| GitHub Project</span>
                    </div>
                    <span className="text-black/60 font-mono text-[11px] font-normal">{proj.dates}</span>
                  </div>
                  <ul className="space-y-1 text-black/85 font-sans leading-relaxed">
                    {proj.descriptionBullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <span className="font-bold">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-black/70 pt-1">
                    <span className="font-bold text-black">Tech Stack: </span>
                    {proj.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Training */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              Experience & Professional Training
            </h2>
            <div className="space-y-4 text-xs">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-1 border-b border-black/10 pb-3">
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <div>
                      <span className="font-serif italic text-sm">{exp.organization}</span>
                      <span className="font-sans text-black/70 font-normal ml-2">– {exp.role}</span>
                    </div>
                    <span className="text-black/60 font-mono text-[11px] font-normal">{exp.period}</span>
                  </div>
                  <ul className="space-y-1 text-black/85 font-sans leading-relaxed">
                    {exp.descriptionBullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <span className="font-bold">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-2.5">
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-2 border border-black bg-[#F5F5F4]">
                  <div className="font-serif italic font-bold text-black">{cert.title}</div>
                  <div className="text-black/70 font-mono text-[11px] flex justify-between mt-0.5">
                    <span>{cert.issuer}</span>
                    <span>{cert.issueDate}</span>
                  </div>
                  {cert.grade && (
                    <div className="text-[10px] font-mono font-bold text-black mt-1">
                      Score: {cert.grade} {cert.hours ? `• ${cert.hours}` : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
