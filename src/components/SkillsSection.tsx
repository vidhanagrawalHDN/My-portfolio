import React, { useState } from 'react';
import { 
  Code2, 
  Globe, 
  BarChart3, 
  Layers, 
  Users, 
  Check, 
  Sparkles,
  Cpu
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-black" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-black" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-black" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-black" />;
      case 'Users':
        return <Users className="w-4 h-4 text-black" />;
      default:
        return <Cpu className="w-4 h-4 text-black" />;
    }
  };

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.categoryName === selectedCategory);

  return (
    <section id="skills" className="py-16 bg-[#FDFDFD] border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-black/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-widest text-black">
              <Cpu className="w-3.5 h-3.5 text-black" />
              <span>Technical Inventory • Proficiencies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight leading-none text-[#121212]">
              Skills & Proficiencies
            </h2>
            <p className="text-sm text-[#121212]/80 mt-2 max-w-xl font-sans">
              A comprehensive toolkit covering full-stack software development, neural audio systems, business intelligence platforms, and team leadership.
            </p>
          </div>

          {/* Quick Filter */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#F5F5F4] border border-black self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-black text-white'
                  : 'text-black/70 hover:text-black hover:bg-white'
              }`}
            >
              All Domains
            </button>
            {skillCategories.map(cat => (
              <button
                key={cat.categoryName}
                onClick={() => setSelectedCategory(cat.categoryName)}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat.categoryName
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:text-black hover:bg-white'
                }`}
              >
                {cat.categoryName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.categoryName}
              className="bg-white border border-black p-6 hover:bg-[#FDFDFD] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5 border-b border-black/15 pb-4">
                  <div className="w-9 h-9 border border-black bg-[#F5F5F4] flex items-center justify-center shrink-0">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <h3 className="font-serif italic font-bold text-slate-900 text-xl">
                    {category.categoryName}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-black transition-colors ${
                        skill.featured
                          ? 'bg-white font-mono font-bold text-black hover:bg-black hover:text-white'
                          : 'bg-[#F5F5F4] font-mono text-black/80 hover:bg-black hover:text-white'
                      }`}
                    >
                      {skill.featured && (
                        <span className="w-1.5 h-1.5 bg-black"></span>
                      )}
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] opacity-60 font-serif italic">
                          ({skill.level})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {category.categoryName === "BI & Data Visualization" && (
                <div className="mt-5 pt-3 border-t border-black/15 text-[11px] font-mono text-black/70 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Backed by IBM Summer Training Program</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

