import React from 'react';
import { Award, BookOpen, Code, Trophy } from 'lucide-react';
import { stats } from '../data/portfolioData';

export const StatsBar: React.FC = () => {
  const icons = [
    <Trophy key="0" className="w-4 h-4 text-black" />,
    <Award key="1" className="w-4 h-4 text-black" />,
    <Code key="2" className="w-4 h-4 text-black" />,
    <BookOpen key="3" className="w-4 h-4 text-black" />
  ];

  return (
    <section className="border-b border-black bg-[#F5F5F4] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-black/20">
          {stats.map((item, index) => (
            <div
              key={item.label}
              id={`stat-card-${index}`}
              className="flex items-center gap-3.5 p-3 md:px-6 group"
            >
              <div className="w-10 h-10 border border-black bg-white flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors [&>svg]:group-hover:text-white">
                {icons[index % icons.length]}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif italic font-bold text-[#121212] tracking-tight leading-none">
                  {item.value}
                </div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-black mt-1">
                  {item.label}
                </div>
                <div className="text-[11px] font-serif italic text-black/60 truncate max-w-[130px] sm:max-w-none">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

