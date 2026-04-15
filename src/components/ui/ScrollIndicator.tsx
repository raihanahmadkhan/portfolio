import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'competitive', label: 'Competitive' },
    { id: 'extracurricular', label: 'Beyond' },
    { id: 'contact', label: 'Contact' }
];

export const ScrollIndicator = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(progress);

            const sectionElements = sections.map(s => ({
                id: s.id,
                element: document.getElementById(s.id)
            })).filter(s => s.element);

            if (scrollTop < 100) {
                setActiveSection('hero');
                return;
            }

            for (const section of sectionElements.reverse()) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 h-[2px] bg-theme-accent z-[101]"
                style={{ width: `${scrollProgress}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            />

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
            >
                {sections.map((section) => (
                    <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative flex items-center justify-end"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="absolute right-6 px-2 py-1 text-xs font-mono text-theme-heading bg-theme-card border border-theme rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {section.label}
                        </span>

                        <motion.div
                            className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300
                                ${activeSection === section.id
                                    ? 'border-theme-accent bg-theme-accent scale-125 glow-accent'
                                    : 'border-theme bg-transparent hover:border-theme-accent'
                                }`}
                        />
                    </motion.button>
                ))}
            </motion.div>
        </>
    );
};
