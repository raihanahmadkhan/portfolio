import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Section } from '../components/ui/Section';
import { projects } from '../data/projects';
import { useEffect } from 'react';
import fintrakLogo from '../images/fintrak-logo.svg';
import studentStressDetector from '../images/student-stress-detector.svg';
import unibazaar from '../images/unibazaar.svg';
import nile from '../images/nile.svg';

const getProjectImage = (slug: string) => {
    switch (slug) {
        case 'fintrak': return fintrakLogo;
        case 'stress-detector': return studentStressDetector;
        case 'unibazaar': return unibazaar;
        case 'nile-ecommerce': return nile;
        default: return null;
    }
};

export const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.slug === slug);
    const projectIndex = projects.findIndex(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBackClick = () => {
        sessionStorage.setItem('scrollToSection', 'projects');
        navigate('/');
    };

    if (!project) {
        return (
            <Section className="min-h-screen flex items-center justify-center text-center bg-theme-main">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <span className="text-6xl mb-6 block">🔍</span>
                    <h1 className="text-4xl font-heading text-theme-heading mb-4">Project Not Found</h1>
                    <p className="text-theme-secondary mb-8">The artifact you seek has vanished into the void.</p>
                    <Button onClick={() => navigate('/')}>Return to Portfolio</Button>
                </motion.div>
            </Section>
        );
    }

    const nextProject = projects[(projectIndex + 1) % projects.length];
    const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

    return (
        <div className="min-h-screen bg-theme-main text-theme-main font-body selection:bg-theme-accent selection:text-theme-main transition-colors duration-300">
            <motion.div
                className="fixed top-24 left-6 z-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                <motion.button
                    onClick={handleBackClick}
                    className="flex items-center gap-2 px-4 py-2 bg-theme-card/90 backdrop-blur-md border border-theme rounded-full text-theme-secondary hover:text-theme-heading hover:border-theme-accent transition-all duration-300 shadow-lg"
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>←</span>
                    <span className="text-sm font-medium">Projects</span>
                </motion.button>
            </motion.div>

            <Section className="pt-32 pb-20 bg-theme-main relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-theme-accent/5 via-transparent to-transparent pointer-events-none" />

                <div className="max-w-5xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-theme-accent/50 font-mono text-sm tracking-widest uppercase mb-4 block">
                                Project {String(projectIndex + 1).padStart(2, '0')}
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-theme-heading mb-6 leading-tight">
                                {project.title}
                            </h1>

                            <p className="text-xl text-theme-secondary leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((t, i) => (
                                    <motion.span
                                        key={t}
                                        className="px-3 py-1.5 bg-theme-card text-theme-muted text-xs font-mono rounded-full border border-theme"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.05 }}
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </div>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Button size="lg" className="glow-accent" onClick={() => window.open(project.link, '_blank')}>
                                        <span className="flex items-center gap-2">
                                            View Live Demo
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </span>
                                    </Button>
                                </motion.div>
                                {project.github && (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                        <Button variant="outline" size="lg" className="border-theme text-theme-secondary hover:bg-theme-card" onClick={() => window.open(project.github, '_blank')}>
                                            <span className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                Source Code
                                            </span>
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-square bg-theme-card rounded-2xl border-2 border-theme overflow-hidden shadow-2xl relative group">
                                {getProjectImage(project.slug) ? (
                                    <motion.img
                                        src={getProjectImage(project.slug)!}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-8xl opacity-30">{project.emoji}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-theme-main/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-theme-accent/20 rounded-2xl -z-10" />
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-theme-accent/10 rounded-xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </Section>

            <Section className="py-20 bg-theme-card/30 border-y border-theme">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-lg">⚠️</span>
                                <h2 className="text-2xl font-heading text-theme-heading">The Problem</h2>
                            </div>
                            <p className="text-theme-secondary leading-relaxed">
                                {project.problem}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-lg">✨</span>
                                <h2 className="text-2xl font-heading text-theme-heading">The Solution</h2>
                            </div>
                            <p className="text-theme-secondary leading-relaxed">
                                {project.solution}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </Section>

            <Section className="py-20 bg-theme-main">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-heading text-theme-heading mb-4">Key Features</h2>
                        <div className="w-16 h-px bg-theme-accent mx-auto" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {project.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-4 p-5 bg-theme-card rounded-lg border border-theme group hover:border-theme-accent/50 transition-all duration-300"
                            >
                                <span className="text-theme-accent text-lg mt-0.5 group-hover:scale-110 transition-transform">✦</span>
                                <span className="text-theme-secondary">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section className="py-20 bg-theme-card/30 border-y border-theme">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <span className="text-6xl text-theme-accent/20 font-heading leading-none">"</span>
                    <p className="text-xl md:text-2xl text-theme-secondary italic leading-relaxed -mt-6 mb-6">
                        {project.learnings}
                    </p>
                    <span className="text-sm font-heading text-theme-muted uppercase tracking-widest">Key Takeaway</span>
                </motion.div>
            </Section>

            <Section className="py-16 bg-theme-main border-t border-theme">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <motion.button
                            onClick={() => navigate(`/project/${prevProject.slug}`)}
                            className="flex items-center gap-4 group text-left"
                            whileHover={{ x: -5 }}
                        >
                            <span className="text-2xl text-theme-muted group-hover:text-theme-accent transition-colors">←</span>
                            <div>
                                <span className="text-xs text-theme-muted uppercase tracking-wider block mb-1">Previous</span>
                                <span className="text-theme-heading font-heading group-hover:text-theme-accent transition-colors">{prevProject.title}</span>
                            </div>
                        </motion.button>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="outline" className="border-theme text-theme-secondary" onClick={handleBackClick}>
                                All Projects
                            </Button>
                        </motion.div>

                        <motion.button
                            onClick={() => navigate(`/project/${nextProject.slug}`)}
                            className="flex items-center gap-4 group text-right"
                            whileHover={{ x: 5 }}
                        >
                            <div>
                                <span className="text-xs text-theme-muted uppercase tracking-wider block mb-1">Next</span>
                                <span className="text-theme-heading font-heading group-hover:text-theme-accent transition-colors">{nextProject.title}</span>
                            </div>
                            <span className="text-2xl text-theme-muted group-hover:text-theme-accent transition-colors">→</span>
                        </motion.button>
                    </div>
                </div>
            </Section>
        </div>
    );
};
