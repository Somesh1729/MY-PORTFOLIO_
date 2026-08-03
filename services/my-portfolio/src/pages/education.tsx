import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  dates: string;
  location: string;
  grade: string;
  description: string;
  highlights: string[];
  skills: string[];
}

const educationData: EducationEntry[] = [
  {
    id: 'be-aiml',
    institution: 'New Horizon College of Engineering',
    degree: 'Bachelor of Engineering in Artificial Intelligence & Machine Learning',
    dates: '2022 — 2026',
    location: 'Bangalore, Karnataka',
    grade: 'CGPA: 9.27 / 10.0',
    description: 'Specializing in core AI/ML algorithms, neural networks, computer vision, and software engineering. Consistently top of class with active research publications.',
    highlights: [
      'Top Tier Academic Standing — CGPA 9.27',
      'Published IEEE research paper on biomedical speech transcription using deep neural networks',
      'Built 8+ projects spanning Agentic AI, full-stack web applications, and ML models',
      'Active contributor to open-source software and competitive programming (174+ LeetCode solved)',
    ],
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'Java', 'Data Structures & Algorithms', 'React', 'Node.js'],
  },
  {
    id: 'pu-education',
    institution: 'PU Education (Science PCMB)',
    degree: 'Pre-University Course — Physics, Chemistry, Mathematics, Biology',
    dates: '2019 — 2021',
    location: 'Dharwad, Karnataka',
    grade: 'Percentage: 98.33%',
    description: 'Rigorous pre-university scientific curriculum with a stellar distinction in Physics, Chemistry, Mathematics, and Biology.',
    highlights: [
      'Achieved a phenomenal 98.33% in state board examinations',
      'Demonstrated high proficiency in analytical mathematics and core physical sciences',
      'Developed foundational problem-solving skills laying the path for AI/ML engineering',
    ],
    skills: ['Mathematics', 'Physics', 'Analytical Problem Solving', 'Chemistry', 'Biology'],
  },
  {
    id: 'schooling',
    institution: 'Sewa Vidyalaya Kinnal',
    degree: 'Primary & High School Education',
    dates: '2009 — 2019',
    location: 'Koppal District, Karnataka',
    grade: 'Percentage: 91.68%',
    description: 'Complete primary and secondary schooling with distinction in state examinations, academic competitions, and leadership activities.',
    highlights: [
      'Scored 91.68% in SSLC state board examinations',
      'Consistently ranked top of class throughout primary and secondary school',
      'Actively participated in science exhibitions, quiz competitions, and debate clubs',
    ],
    skills: ['Core Science', 'Mathematics', 'English & Languages', 'Leadership'],
  },
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGPathElement>('.connector-line-edu');
      
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
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Education</h1>
        <p className="text-xl text-muted-foreground font-mono">My academic foundation and qualifications.</p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        {/* Mobile vertical timeline bar */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:hidden" />

        {educationData.map((entry, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={entry.id} className="relative mb-32 last:mb-0">
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
                    <span className="font-mono text-accent text-sm tracking-widest uppercase font-bold">
                      {entry.dates}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{entry.location}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-foreground mb-1">{entry.institution}</h3>
                  <h4 className="text-lg text-accent mb-2 font-mono">{entry.degree}</h4>
                  <div className={`mb-4 inline-block px-3 py-1 bg-surface border border-accent/30 font-mono text-xs text-accent font-bold rounded-sm ${isEven ? 'md:ml-auto' : ''}`}>
                    {entry.grade}
                  </div>
                  
                  <p className="text-secondary-foreground mb-6 leading-relaxed text-sm">
                    {entry.description}
                  </p>
                  
                  <ul className={`space-y-3 mb-6 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                    {entry.highlights.map((h, i) => (
                      <li key={i} className={`flex items-start gap-3 max-w-md ${isEven ? 'md:text-right md:flex-row-reverse' : ''}`}>
                        <span className="text-accent mt-1 opacity-60 text-xs">▹</span>
                        <span className="text-sm text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                    {entry.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-surface border border-border text-xs font-mono rounded-sm text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* SVG Connector Line */}
                {index < educationData.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 w-[100px] h-[300px] pointer-events-none z-0">
                    <svg width="100%" height="100%" viewBox="0 0 100 300" preserveAspectRatio="none">
                      <path
                        d="M50,0 C50,150 50,150 50,300"
                        className="connector-line-edu text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ color: 'hsl(var(--accent))' }}
                      />
                    </svg>
                  </div>
                )}

                {/* Node Desktop */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-accent rounded-full z-10" />

                {/* Node Mobile */}
                <div className="md:hidden absolute left-[22px] top-8 w-3 h-3 bg-background border-2 border-accent rounded-full z-10" />

                <div className="hidden md:block w-5/12" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
