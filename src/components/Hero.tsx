import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { useTypewriter } from '../hooks/useTypewriter';

export const Hero = () => {
    const { text, isTyping } = useTypewriter({
        words: ['Full-Stack Developer', 'Problem Solver', 'System Designer'],
        typingSpeed: 80,
        deletingSpeed: 40,
        delayBetweenWords: 2500
    });

    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 5,
            delay: Math.random() * 5
        }));
    }, []);

    const orbs = useMemo(() => {
        return Array.from({ length: 3 }).map((_, i) => ({
            id: i,
            size: 150 + i * 100,
            x: 20 + i * 30,
            y: 30 + i * 20,
            duration: 15 + i * 5
        }));
    }, []);

    return (
        <Section className="min-h-screen flex items-center justify-center relative overflow-hidden" container={false}>
            <div className="absolute inset-0 -z-10 bg-theme-main transition-colors duration-500" />

            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)',
                        filter: 'blur(40px)'
                    }}
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -40, 30, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-theme-accent/40 pointer-events-none"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -150],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}

            <div className="container mx-auto px-4 z-10 text-center space-y-8 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-theme-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-theme-muted font-heading tracking-[0.3em] uppercase text-sm md:text-base font-semibold h-6"
                >
                    <span className={isTyping ? 'typing-cursor' : ''}>{text}</span>
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-2 relative tracking-tight text-theme-heading"
                >
                    Raihan Ahmad
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-theme-secondary text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed"
                >
                    Software developer with a focus on building clear, maintainable systems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                >
                    <Button
                        size="lg"
                        className="glow-accent"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Explore My Work
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-theme-secondary border-theme hover:bg-theme-main/10"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Get in Touch
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 border-2 border-theme rounded-full flex justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-3 bg-theme-accent rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
};
