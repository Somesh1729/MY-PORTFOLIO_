import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useListPublications } from '@workspace/api-client-react';
import { BookOpen, ExternalLink, ChevronDown } from 'lucide-react';

export default function Publications() {
  const { data: publications = [], isLoading } = useListPublications();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-serif">Research & Publications</h1>
        <p className="text-lg text-muted-foreground max-w-2xl font-mono">
          Academic papers, technical reports, and whitepapers on distributed systems and AI.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-surface animate-pulse border border-border" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {publications.map((pub, index) => {
            const isExpanded = expandedId === pub.id;
            // IEEE style roughly: A. Author, B. Author, "Title," Venue, Year.
            const authorString = pub.authors.join(', ');

            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group border border-border bg-surface hover:border-accent/30 transition-colors"
              >
                <div 
                  className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row gap-6 md:items-start"
                  onClick={() => toggleExpand(pub.id)}
                >
                  <div className="text-accent shrink-0 pt-1">
                    <BookOpen className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold font-serif leading-snug mb-2 text-foreground group-hover:text-accent transition-colors">
                      {pub.title}
                    </h3>
                    
                    <p className="text-sm font-mono text-muted-foreground mb-4">
                      {authorString}. <span className="text-secondary-foreground italic">{pub.venue}</span>, {pub.year}.
                    </p>

                    <div className="flex flex-wrap gap-2 items-center text-xs font-mono">
                      {pub.doi && (
                        <span className="text-accent/80">DOI: {pub.doi}</span>
                      )}
                      {pub.url && (
                        <a 
                          href={pub.url} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-muted-foreground hover:text-accent border border-border px-2 py-1 bg-background"
                        >
                          <ExternalLink className="w-3 h-3" /> PDF
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 text-muted-foreground flex items-center justify-center">
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-accent' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 pt-0 border-t border-border/50 bg-background/30">
                        {pub.abstract && (
                          <div className="mb-6">
                            <h4 className="text-xs font-mono font-bold tracking-widest text-accent uppercase mb-2">Abstract</h4>
                            <p className="text-sm leading-relaxed text-secondary-foreground text-justify">
                              {pub.abstract}
                            </p>
                          </div>
                        )}
                        
                        {pub.plainLanguageSummary && (
                          <div>
                            <h4 className="text-xs font-mono font-bold tracking-widest text-accent uppercase mb-2">What This Means</h4>
                            <div className="border-l-2 border-accent/50 pl-4 py-1">
                              <p className="text-sm italic text-muted-foreground">
                                {pub.plainLanguageSummary}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6 flex flex-wrap gap-2">
                          {pub.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-surface-2 px-2 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
