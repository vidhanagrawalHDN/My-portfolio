import React from 'react';
import { Briefcase, BarChart3, CheckCircle2, Building, Calendar, Layers, MapPin } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 bg-[#F5F5F4] border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-black/15">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-widest text-black">
            <Briefcase className="w-3.5 h-3.5 text-black" />
            <span>Field Archives • Practical Immersion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight leading-none text-[#121212]">
            Training & Leadership
          </h2>
          <p className="text-sm text-[#121212]/80 mt-2 max-w-xl font-sans">
            Specialized industrial summer training in Business Intelligence with IBM, along with civic community development leadership.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              className="bg-white border border-black p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-black/15 pb-5 mb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <h3 className="text-2xl sm:text-3xl font-serif italic tracking-tight text-[#121212]">
                      {exp.role}
                    </h3>
                    <span className="px-2 py-0.5 border border-black text-[9px] font-bold uppercase tracking-wider bg-[#F5F5F4]">
                      {exp.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-black/70 font-sans">
                    <span className="flex items-center gap-1.5 text-black font-bold uppercase tracking-wider">
                      <Building className="w-3.5 h-3.5 text-black" />
                      {exp.organization}
                    </span>
                    {exp.location && (
                      <>
                        <span className="opacity-40">/</span>
                        <span className="flex items-center gap-1 text-black/70 font-mono text-[11px]">
                          <MapPin className="w-3 h-3 text-black" />
                          {exp.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 border border-black bg-[#F5F5F4] text-black text-[11px] font-mono font-bold shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description Bullets */}
              <div className="space-y-3 mb-6">
                {exp.descriptionBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-black/85 leading-relaxed font-sans">
                    <span className="text-black font-bold mt-0.5">—</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Tools Chips */}
              <div className="pt-4 border-t border-black/15 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black/60 mr-2 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-black" />
                  Competencies:
                </span>
                {exp.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 border border-black text-[9px] font-bold uppercase text-black bg-white hover:bg-black hover:text-white transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
