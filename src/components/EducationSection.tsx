import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { educationList } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 bg-[#F5F5F4] border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-black/15">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-widest text-black">
            <GraduationCap className="w-3.5 h-3.5 text-black" />
            <span>Academic Registry • Degrees & Honors</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight leading-none text-[#121212]">
            Education & Honors
          </h2>
          <p className="text-sm text-[#121212]/80 mt-2 max-w-xl font-sans">
            Strong foundational learning and continuous academic distinction across high school, intermediate, and university engineering.
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id}
              id={`education-card-${edu.id}`}
              className="bg-white border border-black p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-black/15 pb-5 mb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="text-2xl sm:text-3xl font-serif italic tracking-tight text-[#121212]">
                      {edu.institution}
                    </h3>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-black text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F5F5F4] text-black">
                      <Award className="w-3 h-3 text-black" />
                      <span>{edu.scoreLabel}: {edu.scoreValue}</span>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-black font-sans">
                    {edu.degree} {edu.field ? `• ${edu.field}` : ''}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-black/70 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-black" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 border border-black bg-[#F5F5F4] text-black text-[11px] font-mono font-bold shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {edu.highlights && (
                <div className="space-y-2">
                  {edu.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/85 font-sans leading-relaxed">
                      <span className="text-black font-bold mt-0.5">—</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
