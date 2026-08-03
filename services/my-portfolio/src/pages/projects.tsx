import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useListProjects } from '@workspace/api-client-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, X } from 'lucide-react';

export default function Projects() {
  const { data: projects = [], isLoading } = useListProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  // Helper to give cards pseudo-random aspect ratios
  const getAspectRatio = (index: number) => {
    const ratios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square', 'aspect-[16/9]'];
    return ratios[index % ratios.length];
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Architecture & Code</h1>
        <p className="text-xl text-muted-foreground font-mono max-w-2xl">
          A selection of engineered systems, experiments, and open-source contributions.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`bg-surface animate-pulse ${getAspectRatio(i)}`} />
          ))}
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
              className={`break-inside-avoid cursor-pointer group relative overflow-hidden bg-surface border border-border hover:border-accent/50 transition-all duration-300 ${getAspectRatio(index)}`}
              onClick={() => setSelectedProjectId(project.id)}
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-surface-2 flex items-center justify-center">
                  <div className="font-mono text-muted-foreground opacity-10 text-8xl font-bold select-none mix-blend-overlay">
                    {project.id.toString().padStart(2, '0')}
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-background/50 backdrop-blur-sm border-accent/20 text-accent font-mono text-[10px] uppercase tracking-wider">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-border text-muted-foreground font-mono text-[10px]">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Case Study Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProjectId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border p-0 gap-0">
          {selectedProject && (
            <div className="relative">
              <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border p-6 flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-foreground">{selectedProject.title}</DialogTitle>
                <div className="flex items-center gap-4">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <DialogClose className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </DialogClose>
                </div>
              </div>

              <div className="p-6 md:p-10 space-y-12">
                {/* Tech Stack */}
                <div>
                  <h4 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-surface border border-border text-sm font-mono rounded-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="prose prose-invert max-w-none">
                  {selectedProject.description && (
                    <>
                      <h3 className="text-xl font-bold font-mono text-accent">/ Overview</h3>
                      <p>{selectedProject.description}</p>
                    </>
                  )}

                  {selectedProject.problemStatement && (
                    <>
                      <h3 className="text-xl font-bold font-mono text-accent">/ The Problem</h3>
                      <p>{selectedProject.problemStatement}</p>
                    </>
                  )}

                  {selectedProject.architectureNotes && (
                    <>
                      <h3 className="text-xl font-bold font-mono text-accent">/ Architecture Notes</h3>
                      <div className="bg-surface p-6 border border-border font-mono text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                        {selectedProject.architectureNotes}
                      </div>
                    </>
                  )}

                  {selectedProject.keyDecisions && (
                    <>
                      <h3 className="text-xl font-bold font-mono text-accent">/ Key Decisions</h3>
                      <p>{selectedProject.keyDecisions}</p>
                    </>
                  )}

                  {selectedProject.outcomes && (
                    <>
                      <h3 className="text-xl font-bold font-mono text-accent">/ Outcomes</h3>
                      <p>{selectedProject.outcomes}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
