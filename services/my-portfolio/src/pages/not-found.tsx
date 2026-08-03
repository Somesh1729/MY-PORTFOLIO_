import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full"
      >
        <h1 className="text-8xl font-bold font-mono text-accent mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground font-mono mb-8">
          The requested resource could not be located on this server.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-surface border border-border text-foreground hover:border-accent transition-colors font-mono text-sm"
        >
          Return to root
        </Link>
      </motion.div>
    </div>
  );
}
