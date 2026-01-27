import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsMobileMenuOpen(false);
        if (location.pathname === '/') {
            e.preventDefault();
            const element = document.querySelector(href);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = (e: React.MouseEvent) => {
        setIsMobileMenuOpen(false);
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
                    ? 'bg-theme-card/90 backdrop-blur-lg shadow-lg border-b border-theme'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            onClick={scrollToTop}
                            className="group"
                        >
                            <motion.span
                                className="font-heading text-xl font-semibold tracking-wide text-theme-heading transition-colors"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-theme-accent">R</span>aihan
                                <span className="text-theme-muted font-light ml-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                    .dev
                                </span>
                            </motion.span>
                        </Link>

                        <div className="flex items-center gap-8">
                            <ul className="hidden md:flex items-center gap-6">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={location.pathname === '/' ? link.href : `/${link.href}`}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className="text-sm font-medium text-theme-secondary hover:text-theme-heading transition-colors duration-200 tracking-wide relative group"
                                        >
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-theme-accent transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="hidden md:block w-px h-5 bg-theme opacity-30" />

                            <div className="flex items-center gap-3">
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:block px-4 py-1.5 text-xs font-medium font-heading text-theme-accent border border-theme-accent/40 rounded-full hover:bg-theme-accent hover:text-theme-main transition-all duration-300 tracking-widest uppercase"
                                >
                                    Resume
                                </a>

                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full hover:bg-theme-main/20 transition-all duration-200 text-theme-heading hover:scale-110"
                                    aria-label="Toggle Theme"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {theme === 'dark' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="5"></circle>
                                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                            </svg>
                                        )}
                                    </motion.div>
                                </button>

                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="md:hidden p-2 rounded-lg hover:bg-theme-main/20 transition-all duration-200 text-theme-heading"
                                    aria-label="Toggle Menu"
                                >
                                    <motion.div
                                        animate={isMobileMenuOpen ? "open" : "closed"}
                                        className="w-5 h-4 flex flex-col justify-between"
                                    >
                                        <motion.span
                                            className="w-full h-0.5 bg-current block origin-left"
                                            variants={{
                                                closed: { rotate: 0, y: 0 },
                                                open: { rotate: 45, y: -2 }
                                            }}
                                        />
                                        <motion.span
                                            className="w-full h-0.5 bg-current block"
                                            variants={{
                                                closed: { opacity: 1 },
                                                open: { opacity: 0 }
                                            }}
                                        />
                                        <motion.span
                                            className="w-full h-0.5 bg-current block origin-left"
                                            variants={{
                                                closed: { rotate: 0, y: 0 },
                                                open: { rotate: -45, y: 2 }
                                            }}
                                        />
                                    </motion.div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-theme-main/95 backdrop-blur-lg z-[99] md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center justify-center h-full gap-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={location.pathname === '/' ? link.href : `/${link.href}`}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className="text-2xl font-heading font-medium text-theme-secondary hover:text-theme-heading transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4 px-6 py-2 text-sm font-medium font-heading text-theme-accent border border-theme-accent/40 rounded-full hover:bg-theme-accent hover:text-theme-main transition-all duration-300 tracking-widest uppercase"
                            >
                                View Resume
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
