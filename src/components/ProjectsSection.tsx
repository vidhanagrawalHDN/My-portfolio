import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  ChevronRight,
  Code2,
  FolderGit2
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'ai' | 'frontend'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 bg-[#FDFDFD] border-b border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-black/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-widest text-black">
              <FolderGit2 className="w-3.5 h-3.5 text-black" />
              <span>Catalog Index • Selected Works / 025-026</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight leading-none text-[#121212]">
              Featured Engineering
            </h2>
            <p className="text-sm text-[#121212]/80 mt-2 max-w-xl font-sans">
              Scalable web architectures, neural audio synthesis engines, and responsive client-side applications built with modern engineering standards.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#F5F5F4] border border-black self-start md:self-auto">
            {[
              { label: 'All Works', value: 'all' },
              { label: 'Full Stack', value: 'fullstack' },
              { label: 'AI & Audio', value: 'ai' },
              { label: 'Hackathon', value: 'frontend' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value as any)}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  activeFilter === tab.value
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:text-black hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-white border border-black p-6 flex flex-col justify-between hover:bg-[#FDFDFD] transition-colors group"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 border border-black text-[9px] font-bold uppercase tracking-wider bg-[#F5F5F4]">
                    {project.badge || 'Engineering'}
                  </span>
                  <span className="text-xs font-mono font-medium text-black/50">
                    {project.dates}
                  </span>
                </div>

                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-2xl sm:text-3xl font-serif italic tracking-tight leading-none text-[#121212] group-hover:text-black">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-justify opacity-80 text-black font-sans mt-2">
                  {project.summary}
                </p>

                {/* Bullets */}
                <div className="mt-4 space-y-2 border-t border-black/15 pt-3">
                  {project.descriptionBullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-black/80 leading-relaxed font-sans">
                      <span className="text-black font-bold mt-0.5">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Tech Stack & Links */}
              <div className="pt-4 mt-4 border-t border-black/15 bg-[#F5F5F4]/60 -mx-6 -mb-6 p-6">
                <div className="mb-3">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-black/60 mb-2">
                    Stack Components
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 border border-black text-[9px] font-bold uppercase text-black bg-white hover:bg-black hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-black/10">
                  <a
                    id={`project-github-${project.id}`}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-black bg-white hover:bg-black hover:text-white text-black text-[11px] font-bold uppercase tracking-wider transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      id={`project-live-${project.id}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-black bg-black hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
