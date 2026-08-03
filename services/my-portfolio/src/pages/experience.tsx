import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useListExperience } from '@workspace/api-client-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { data: experience = [], isLoading } = useListExperience();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || experience.length === 0) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGPathElement>('.connector-line');
      
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, experience]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Experience</h1>
        <p className="text-xl text-muted-foreground font-mono">The organizations I've helped build and scale.</p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-24 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-surface animate-pulse border border-border" />
          ))}
        </div>
      ) : (
        <div className="relative max-w-5xl mx-auto">
          {/* Central static line for mobile, hidden on md+ since we draw custom SVG lines */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:hidden" />

          {experience.map((entry, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={entry.id} className="relative mb-32 last:mb-0">
                {/* Responsive Layout: Single column mobile, alternating desktop */}
                <div className={`flex flex-col md:flex-row items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                  >
                    <div className="mb-2 flex flex-col md:inline-flex md:items-end gap-1">
                      <span className="font-mono text-accent text-sm tracking-widest uppercase">
                        {entry.startDate} — {entry.current ? 'Present' : entry.endDate}
                      </span>
                      {entry.location && <span className="text-xs text-muted-foreground font-mono">{entry.location}</span>}
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground mb-1">{entry.company}</h3>
                    <h4 className="text-xl text-muted-foreground mb-4 font-light">{entry.role}</h4>
                    
                    <p className="text-secondary-foreground mb-6 leading-relaxed">
                      {entry.description}
                    </p>
                    
                    <ul className={`space-y-3 mb-6 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                      {entry.highlights.map((h, i) => (
                        <li key={i} className={`flex items-start gap-3 max-w-md ${isEven ? 'md:text-right md:flex-row-reverse' : ''}`}>
                          <span className="text-accent mt-1 opacity-50 text-xs">▹</span>
                          <span className="text-sm text-muted-foreground">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                      {entry.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-surface border border-border text-xs font-mono rounded-sm text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Desktop SVG Connector Line */}
                  {index < experience.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 w-[100px] h-[300px] pointer-events-none z-0">
                      <svg width="100%" height="100%" viewBox="0 0 100 300" preserveAspectRatio="none">
                        <path
                          d={isEven ? "M50,0 C50,150 50,150 50,300" : "M50,0 C50,150 50,150 50,300"}
                          className="connector-line text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ color: 'hsl(var(--accent))' }}
                        />
                      </svg>
                    </div>
                  )}

                  {/* Center Node Desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-accent rounded-full z-10" />

                  {/* Left Node Mobile */}
                  <div className="md:hidden absolute left-[22px] top-8 w-3 h-3 bg-background border-2 border-accent rounded-full z-10" />

                  {/* Empty space for opposite side on desktop */}
                  <div className="hidden md:block w-5/12" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
