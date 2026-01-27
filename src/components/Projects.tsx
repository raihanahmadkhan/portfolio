import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { projects } from '../data/projects';
import fintrakLogo from '../images/fintrak-logo.svg';
import studentStressDetector from '../images/student-stress-detector.svg';
import unibazaar from '../images/unibazaar.svg';
import nile from '../images/nile.svg';
import { useRef } from 'react';

const TiltCard = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const Projects = () => {
    const navigate = useNavigate();

    const getProjectImage = (slug: string) => {
        switch (slug) {
            case 'fintrak':
                return fintrakLogo;
            case 'stress-detector':
                return studentStressDetector;
            case 'unibazaar':
                return unibazaar;
            case 'nile-ecommerce':
                return nile;
            default:
                return null;
        }
    };

    return (
        <Section id="projects" className="bg-theme-main/50">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-heading font-bold text-center text-theme-heading mb-16"
            >
                Artifacts of Creation
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <TiltCard className="h-full cursor-pointer" onClick={() => navigate(`/project/${project.slug}`)}>
                            <Card hover className="h-full flex flex-col group bg-theme-card border-theme shadow-sm gradient-border overflow-hidden">
                                <div className="h-48 mb-6 bg-theme-main rounded-md border border-theme flex items-center justify-center overflow-hidden relative flex-shrink-0">
                                    {getProjectImage(project.slug) ? (
                                        <motion.img
                                            src={getProjectImage(project.slug)!}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                                            whileHover={{ scale: 1.05 }}
                                            style={{ transformStyle: "preserve-3d", translateZ: 20 }}
                                        />
                                    ) : (
                                        <motion.span
                                            className="text-4xl opacity-50 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            {project.emoji || '📜'}
                                        </motion.span>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-theme-main/40 via-transparent to-transparent pointer-events-none" />
                                </div>

                                <h3 className="text-2xl font-heading text-theme-heading mb-3 group-hover:text-theme-accent transition-colors duration-300 flex-shrink-0">{project.title}</h3>

                                <p className="text-theme-secondary text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{project.description}</p>

                                <div className="space-y-4 mt-auto flex-shrink-0">
                                    <div className="flex flex-wrap gap-2 min-h-[60px] content-start">
                                        {project.tech.slice(0, 5).map(t => (
                                            <motion.span
                                                key={t}
                                                className="text-xs font-mono text-theme-muted border border-theme px-2 py-1 rounded bg-theme-main h-fit"
                                                whileHover={{ y: -2, borderColor: 'var(--accent)' }}
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                        {project.tech.length > 5 && (
                                            <span className="text-xs font-mono text-theme-muted px-2 py-1">
                                                +{project.tech.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-theme text-theme-secondary hover:bg-theme-main hover:border-theme-accent"
                                        onClick={() => navigate(`/project/${project.slug}`)}
                                    >
                                        View Project
                                    </Button>
                                </div>
                            </Card>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
