import React from 'react';
import { motion } from 'framer-motion';
import { useListPosts } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Clock, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function Blog() {
  const { data: posts = [], isLoading } = useListPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Engineering Log</h1>
        <p className="text-xl text-muted-foreground font-mono max-w-2xl">
          Thoughts on system design, AI integration, and the craft of software.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-surface animate-pulse border border-border" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (index % 2) * 0.1, duration: 0.5 }}
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="group block h-full p-8 border border-border bg-surface hover:border-accent/50 hover:bg-surface-2 transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/20 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-3 leading-tight font-serif">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground mt-auto">
                  {post.publishedAt && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTimeMinutes} min read
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto group-hover:text-foreground transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views.toLocaleString()}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
