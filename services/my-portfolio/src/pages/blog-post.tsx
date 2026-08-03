import React, { useEffect } from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { useGetPost, useIncrementPostView, getGetPostQueryKey } from '@workspace/api-client-react';
import { Clock, Eye, Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'wouter';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug || '';
  
  const { data: post, isLoading } = useGetPost(slug, {
    query: { enabled: !!slug, queryKey: getGetPostQueryKey(slug) }
  });
  
  const incrementView = useIncrementPostView();

  useEffect(() => {
    if (slug) {
      incrementView.mutate({ slug });
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
        <div className="h-8 w-32 bg-surface animate-pulse mb-12" />
        <div className="h-16 w-3/4 bg-surface animate-pulse mb-6" />
        <div className="h-4 w-1/2 bg-surface animate-pulse mb-16" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-surface animate-pulse" />
          <div className="h-4 w-full bg-surface animate-pulse" />
          <div className="h-4 w-5/6 bg-surface animate-pulse" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-mono">404</h1>
          <p className="text-muted-foreground mb-8">Post not found</p>
          <Link href="/blog" className="text-accent hover:text-accent-bright font-mono uppercase tracking-widest text-sm border-b border-accent pb-1">
            &larr; Back to Log
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12 font-mono text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Log
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/20 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-6 text-foreground">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-muted-foreground mb-16 border-b border-border/50 pb-8">
          {post.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent/70" />
              {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent/70" />
            {post.readingTimeMinutes} min read
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-accent/70" />
            {post.views.toLocaleString()} views
          </div>
        </div>

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-pre:bg-surface-2 prose-pre:border prose-pre:border-border"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </motion.div>
    </article>
  );
}
