import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubmitContact } from '@workspace/api-client-react';
import { Mail, Github, Linkedin, Check } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [mousePos, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const submitContact = useSubmitContact();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContact.mutateAsync({ data });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Background Magnetic Effect */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"
        animate={{
          x: mousePos.x * 50,
          y: mousePos.y * 50,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      />

      {/* Left Panel: Contact Info */}
      <div className="w-full md:w-5/12 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative z-10 border-r border-border/50 bg-background/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground">
            Initialize<br />Connection
          </h1>
          <p className="text-lg text-muted-foreground font-mono mb-12 max-w-sm">
            Whether you have a specific system in mind or just want to discuss distributed architectures and AI.
          </p>
          
          <div className="space-y-6 font-mono text-sm">
            <a href="mailto:someshyallapur17@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors group">
              <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent transition-colors bg-surface">
                <Mail className="w-4 h-4" />
              </div>
              someshyallapur17@gmail.com
            </a>
            <a href="https://github.com/Somesh1729" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors group">
              <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent transition-colors bg-surface">
                <Github className="w-4 h-4" />
              </div>
              github.com/Somesh1729
            </a>
            <a href="https://www.linkedin.com/in/somesh-y-390843278" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors group">
              <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent transition-colors bg-surface">
                <Linkedin className="w-4 h-4" />
              </div>
              linkedin.com/in/somesh-y-390843278
            </a>
            <a href="https://leetcode.com/u/Somesh1729/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-accent transition-colors group">
              <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent transition-colors bg-surface">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>
              </div>
              leetcode.com/u/Somesh1729
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full md:w-7/12 p-8 md:p-16 lg:p-24 flex items-center justify-center relative z-10">
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="relative group">
                            <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors">Name</FormLabel>
                            <FormControl>
                              <input 
                                {...field} 
                                className="w-full bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors font-mono placeholder:text-muted-foreground/30"
                                placeholder="John Doe"
                              />
                            </FormControl>
                            <FormMessage className="text-destructive font-mono text-xs absolute -bottom-5" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="relative group">
                            <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors">Email</FormLabel>
                            <FormControl>
                              <input 
                                {...field} 
                                type="email"
                                className="w-full bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors font-mono placeholder:text-muted-foreground/30"
                                placeholder="john@example.com"
                              />
                            </FormControl>
                            <FormMessage className="text-destructive font-mono text-xs absolute -bottom-5" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors">Subject</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="w-full bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors font-mono placeholder:text-muted-foreground/30"
                              placeholder="Project Inquiry"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive font-mono text-xs absolute -bottom-5" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="relative group">
                          <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-focus-within:text-accent transition-colors">Message</FormLabel>
                          <FormControl>
                            <textarea 
                              {...field} 
                              rows={5}
                              className="w-full bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors font-mono placeholder:text-muted-foreground/30 resize-none"
                              placeholder="Tell me about the system you want to build..."
                            />
                          </FormControl>
                          <FormMessage className="text-destructive font-mono text-xs absolute -bottom-5" />
                        </FormItem>
                      )}
                    />

                    <button 
                      type="submit" 
                      disabled={submitContact.isPending}
                      className="w-full bg-foreground text-background py-4 font-bold font-mono tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitContact.isPending ? 'Transmitting...' : 'Send Message'}
                    </button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-12 border border-accent/20 bg-accent/5"
              >
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-mono text-foreground mb-2">Payload Received</h3>
                <p className="text-muted-foreground font-mono">
                  I'll process your message and respond shortly.
                </p>
                <button
                  onClick={() => {
                    form.reset();
                    setIsSubmitted(false);
                  }}
                  className="mt-8 text-sm font-mono text-accent hover:text-accent-bright border-b border-transparent hover:border-accent-bright transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}
