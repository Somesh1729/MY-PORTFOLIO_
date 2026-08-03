import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useListFeaturedProjects, useGetStats } from '@workspace/api-client-react';

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const maxNodes = 50;
    const connectionRadius = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize nodes
    for (let i = 0; i < maxNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(245, 166, 35, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionRadius) {
            const opacity = 1 - dist / connectionRadius;
            ctx.strokeStyle = `rgba(245, 166, 35, ${opacity * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = 'rgba(245, 166, 35, 0.5)';
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
}

export default function Home() {
  const { data: featuredProjects = [] } = useListFeaturedProjects();
  const { data: stats } = useGetStats();

  return (
    <div className="relative min-h-screen">
      <ParticleCanvas />

      {/* Hero Section */}
      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] px-6 max-w-7xl mx-auto py-20 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-accent mb-4">Hello, World. I am</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-foreground">
            Somesh Yallapur
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Software Developer & AI/ML Enthusiast
          </h2>
          <p className="text-lg md:text-xl max-w-2xl font-mono text-secondary-foreground mb-12">
            A recent graduate and versatile Software Developer with a deep, keen interest in Artificial Intelligence and Machine Learning. Crafting scalable web applications and building intelligent systems that solve real-world problems.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="px-8 py-4 bg-accent text-accent-foreground font-bold hover:bg-accent-bright transition-colors rounded-sm"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-surface border border-border text-foreground hover:border-accent transition-colors rounded-sm"
            >
              Contact Me
            </Link>
            <a
              href="https://github.com/Somesh1729"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-surface border border-border text-foreground hover:border-accent transition-colors rounded-sm font-mono text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
              GitHub
            </a>
            <a
              href="https://leetcode.com/u/Somesh1729/"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-surface border border-border text-foreground hover:border-accent transition-colors rounded-sm font-mono text-sm"
            >
              LeetCode
            </a>
          </div>
        </motion.div>

        {/* Right side picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center lg:justify-end relative my-6 lg:my-0"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full -z-10" />
            <motion.img 
              initial={{ filter: 'blur(20px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
              src="/profile.jpg" 
              alt="Somesh Yallapur" 
              className="max-w-[300px] sm:max-w-[380px] lg:max-w-[450px] w-full rounded-lg object-cover shadow-2xl border-4 border-surface"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Band */}
      {stats && (
        <section className="relative z-10 bg-surface border-y border-border/50 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold font-mono text-accent">{stats.cgpa}</span>
              <span className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">CGPA</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold font-mono text-accent">{stats.projectsShipped}+</span>
              <span className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">Projects Built</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold font-mono text-accent">{stats.leetcodeSolved}+</span>
              <span className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">LeetCode Solved</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold font-mono text-accent">{stats.publicationsCount}</span>
              <span className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">IEEE Publication</span>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Strip */}
      <section className="relative z-10 py-32 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h3 className="text-4xl font-bold">Selected Work</h3>
          <Link href="/projects" className="text-accent hover:text-accent-bright font-mono uppercase tracking-widest text-sm">
            All Projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-surface border border-border hover:border-accent/50 transition-colors overflow-hidden rounded-sm"
            >
              <div className="aspect-[16/9] bg-surface-2 p-8 flex items-center justify-center relative overflow-hidden">
                 {project.imageUrl ? (
                   <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal" />
                 ) : (
                   <div className="font-mono text-muted-foreground opacity-20 text-9xl font-bold select-none mix-blend-overlay">
                     {project.id.toString().padStart(2, '0')}
                   </div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-8 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="text-xs font-mono text-accent px-2 py-1 bg-accent/10 border border-accent/20 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <h4 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h4>
                <p className="text-muted-foreground line-clamp-2">{project.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
