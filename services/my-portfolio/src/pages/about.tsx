import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useListSkills } from '@workspace/api-client-react';

function SkillRadial({ groups }: { groups: any[] }) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  if (!groups || groups.length === 0) return null;

  const width = 600;
  const height = 600;
  const center = { x: width / 2, y: height / 2 };
  const innerRadius = 100;
  const outerRadius = 220;

  return (
    <div className="relative w-full aspect-square flex flex-col items-center justify-center">
      {/* Category filter pills above topology */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 z-10">
        <button
          onClick={() => setActiveGroup(null)}
          className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
            activeGroup === null
              ? 'bg-accent text-accent-foreground border-accent font-bold'
              : 'bg-surface/80 border-border text-muted-foreground hover:border-accent'
          }`}
        >
          All
        </button>
        {groups.map((g) => (
          <button
            key={g.category}
            onClick={() => setActiveGroup(activeGroup === g.category ? null : g.category)}
            className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
              activeGroup === g.category
                ? 'bg-accent text-accent-foreground border-accent font-bold'
                : 'bg-surface/80 border-border text-muted-foreground hover:border-accent'
            }`}
          >
            {g.category}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-w-[550px]">
        {/* Center core glowing ring */}
        <circle cx={center.x} cy={center.y} r={28} className="fill-surface stroke-accent/40" strokeWidth={2} />
        <text
          x={center.x}
          y={center.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[11px] font-mono font-bold fill-accent"
        >
          CORE
        </text>

        {groups.map((group, groupIdx) => {
          // Angle of category origin (distributed evenly in circle starting top-right)
          const categoryAngle = (groupIdx / groups.length) * Math.PI * 2 - Math.PI / 2;
          const groupX = center.x + Math.cos(categoryAngle) * innerRadius;
          const groupY = center.y + Math.sin(categoryAngle) * innerRadius;
          const isActive = activeGroup === group.category || activeGroup === null;

          // Fan out skills around category angle
          const totalSkills = group.skills.length;
          const arcWidth = (Math.PI * 2 / groups.length) * 0.75;
          const startAngle = categoryAngle - arcWidth / 2;

          return (
            <g key={group.category}>
              {/* Line from Core to Category Node */}
              <motion.line
                x1={center.x}
                y1={center.y}
                x2={groupX}
                y2={groupY}
                stroke="currentColor"
                className="text-accent/30"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />

              {/* Category Node */}
              <motion.g
                onClick={() => setActiveGroup(activeGroup === group.category ? null : group.category)}
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <circle
                  cx={groupX}
                  cy={groupY}
                  r={16}
                  className={`transition-colors duration-300 ${
                    activeGroup === group.category
                      ? 'fill-accent stroke-background'
                      : isActive
                      ? 'fill-surface stroke-accent'
                      : 'fill-surface/40 stroke-border'
                  }`}
                  strokeWidth={2}
                />
                <text
                  x={groupX}
                  y={groupY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[9px] font-mono font-bold pointer-events-none ${
                    activeGroup === group.category ? 'fill-accent-foreground' : 'fill-foreground'
                  }`}
                >
                  {group.category.slice(0, 4).toUpperCase()}
                </text>
              </motion.g>

              {/* Individual Skill Nodes */}
              {group.skills.map((skill: any, skillIdx: number) => {
                const skillAngle =
                  totalSkills > 1
                    ? startAngle + (skillIdx / (totalSkills - 1)) * arcWidth
                    : categoryAngle;

                // Alternate distances slightly to prevent collision
                const baseDist = innerRadius + 45 + (skill.level / 100) * 75;
                const distanceOffset = (skillIdx % 2 === 0 ? 0 : 22);
                const skillDist = baseDist + distanceOffset;

                const skillX = center.x + Math.cos(skillAngle) * skillDist;
                const skillY = center.y + Math.sin(skillAngle) * skillDist;

                const cos = Math.cos(skillAngle);
                const sin = Math.sin(skillAngle);

                // Collision-free text anchor and offsets
                let anchor: 'start' | 'end' | 'middle' = 'middle';
                let dx = 0;
                let dy = 0;

                if (Math.abs(cos) > 0.4) {
                  anchor = cos > 0 ? 'start' : 'end';
                  dx = cos > 0 ? 8 : -8;
                  dy = 3;
                } else {
                  anchor = 'middle';
                  dy = sin > 0 ? 14 : -10;
                }

                return (
                  <g key={skill.name}>
                    {/* Line from Category to Skill */}
                    <motion.line
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 0.3 : 0.05 }}
                      x1={groupX}
                      y1={groupY}
                      x2={skillX}
                      y2={skillY}
                      stroke="currentColor"
                      className="text-accent"
                      strokeWidth={1}
                    />

                    {/* Skill Dot */}
                    <motion.circle
                      initial={{ scale: 0 }}
                      animate={{ scale: isActive ? 1 : 0.4, opacity: isActive ? 1 : 0.2 }}
                      transition={{ type: 'spring', delay: 0.1 * skillIdx }}
                      cx={skillX}
                      cy={skillY}
                      r={activeGroup === group.category ? 5 : 3.5}
                      className="fill-accent stroke-surface"
                      strokeWidth={1}
                    />

                    {/* Skill Name Label */}
                    <motion.text
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.15 }}
                      x={skillX + dx}
                      y={skillY + dy}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      className={`text-[10px] font-mono font-medium transition-all pointer-events-none ${
                        activeGroup === group.category ? 'fill-accent font-bold text-xs' : 'fill-foreground/90'
                      }`}
                    >
                      {skill.name}
                    </motion.text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function About() {
  const { data: skillGroups } = useListSkills();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Narrative Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert prose-lg"
        >
          <h1 className="text-5xl font-bold mb-8 text-foreground">The Engineering Journey</h1>
          
          <div className="space-y-12 text-muted-foreground relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-surface border-2 border-accent -translate-x-1.5" />
              <h3 className="text-xl font-bold text-foreground font-mono mb-2">01. The Foundations (Languages & Web Dev)</h3>
              <p>
                My journey began with core programming fundamentals — Python, Java, C, JavaScript. At New Horizon College of Engineering (CGPA 9.27), I built a strong foundation in data structures, algorithms, and object-oriented design. My first real projects were full-stack web apps: dynamic frontends with React and robust backends with Node.js/Express.
              </p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-surface border-2 border-accent -translate-x-1.5" />
              <h3 className="text-xl font-bold text-foreground font-mono mb-2">02. The AI/ML Pivot</h3>
              <p>
                As a dedicated AI/ML student, I pivoted to building intelligent systems. I explored PyTorch, Hugging Face Transformers, and computer vision — culminating in my IEEE-published research on biomedical speech transcription. This phase taught me to bridge academic ML theory with practical, production-grade engineering.
              </p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-surface border-2 border-accent -translate-x-1.5" />
              <h3 className="text-xl font-bold text-foreground font-mono mb-2">03. Broadening the Horizon</h3>
              <p>
                As a recent graduate, I'm not just specialized in Agentic AI. I am a versatile Software Developer with a deep, keen interest in Artificial Intelligence and Machine Learning. From building complex LangGraph multi-agent pipelines like the ProjectHealth-ReportingAgent, to crafting scalable React and Node.js web applications, I enjoy solving problems across the entire stack.
              </p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-surface border-2 border-accent -translate-x-1.5" />
              <h3 className="text-xl font-bold text-foreground font-mono mb-2">04. The Present & Goals</h3>
              <p>
                Today I operate at the intersection of Full-Stack Software Engineering and AI/ML. I'm actively building projects, solving 174+ LeetCode problems, and pursuing my goal of building scalable, intelligent technology products. I believe the next era belongs to developers who can write robust software and seamlessly integrate intelligent machine learning cores.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Visualization Right Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="sticky top-32 lg:h-[calc(100vh-10rem)] flex flex-col items-center justify-center bg-surface border border-border/50 rounded-lg p-8"
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold font-mono text-foreground mb-2">Skill Topology</h2>
            <p className="text-sm text-muted-foreground">Click a category to focus. Node distance indicates proficiency.</p>
          </div>
          
          {skillGroups ? (
            <SkillRadial groups={skillGroups} />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
