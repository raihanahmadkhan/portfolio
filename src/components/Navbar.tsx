import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, site } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolledPast } from '../hooks/useScrolledPast';
import { useTheme } from '../hooks/useTheme';
import { DownloadIcon, MoonIcon, SunIcon } from './ui/icons';

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const activeSection = useActiveSection(isHome);
    const isScrolled = useScrolledPast(24);
    const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null);
    const isMenuOpen = menuOpenAt === location.key;
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isMenuOpen) return;
        const page = document.getElementById('page');
        const desktop = window.matchMedia('(min-width: 768px)');
        const close = () => setMenuOpenAt(null);
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            close();
            menuButtonRef.current?.focus();
        };

        document.documentElement.style.overflow = 'hidden';
        page?.setAttribute('inert', '');
        menuRef.current?.querySelector('a')?.focus();
        window.addEventListener('keydown', onKeyDown);
        desktop.addEventListener('change', close);
        return () => {
            document.documentElement.style.overflow = '';
            page?.removeAttribute('inert');
            window.removeEventListener('keydown', onKeyDown);
            desktop.removeEventListener('change', close);
        };
    }, [isMenuOpen]);

    const current = isHome ? activeSection : location.pathname.startsWith('/project/') ? 'projects' : null;
    const isSolid = isScrolled && !isMenuOpen;
    const isOnSky = isHome && !isScrolled && !isMenuOpen;
    const closeMenu = () => setMenuOpenAt(null);

    const goToTop = () => {
        closeMenu();
        if (isHome) window.scrollTo({ top: 0 });
    };

    return (
        <header>
            <nav
                aria-label="Primary"
                className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,box-shadow] duration-200 ${isSolid
                    ? 'border-theme bg-theme-card shadow-lg'
                    : `border-transparent ${isOnSky ? 'nav-on-sky' : ''}`
                    }`}
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                    <Link
                        to="/"
                        onClick={goToTop}
                        aria-label={`${site.name}, home`}
                        className="font-heading text-xl font-bold tracking-wide text-theme-heading transition-colors duration-200"
                    >
                        <span className="text-theme-accent transition-colors duration-200">R</span>aihan
                        <span className="ml-1 font-medium text-theme-muted transition-colors duration-200">.dev</span>
                    </Link>

                    <div className="flex items-center gap-1 md:gap-4">
                        <ul className="hidden items-center md:flex">
                            {navLinks.map(link => {
                                const isCurrent = current === link.id;
                                return (
                                    <li key={link.id}>
                                        <Link
                                            to={`/#${link.id}`}
                                            aria-current={isCurrent ? 'location' : undefined}
                                            className={`relative block px-3 py-2 font-heading text-sm font-bold tracking-wide transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:bg-theme-accent after:transition-transform after:duration-200 ${isCurrent
                                                ? 'text-theme-heading after:scale-x-100'
                                                : 'text-theme-secondary after:scale-x-0 hover:text-theme-heading hover:after:scale-x-100'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <a
                            href={site.resume}
                            download={site.resumeFilename}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden items-center gap-1.5 rounded-full border border-theme-accent/60 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-theme-accent transition-colors duration-200 hover:bg-theme-accent hover:text-theme-on-accent sm:inline-flex"
                        >
                            Resume
                            <DownloadIcon width={14} height={14} />
                        </a>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Switch to day theme' : 'Switch to dusk theme'}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-theme-heading transition-colors duration-200 hover:bg-theme-accent/15"
                        >
                            {theme === 'dark' ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
                        </button>

                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => setMenuOpenAt(isMenuOpen ? null : location.key)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            className="flex h-11 w-11 items-center justify-center rounded-full text-theme-heading transition-colors duration-200 hover:bg-theme-accent/15 md:hidden"
                        >
                            <span aria-hidden="true" className="relative block h-4 w-5">
                                <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-200 ${isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                                <span className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-200 ${isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-full -translate-y-full'}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div
                    ref={menuRef}
                    id="mobile-menu"
                    onClick={closeMenu}
                    className="fixed inset-0 z-[99] animate-fade-in overflow-y-auto overscroll-contain bg-theme-main md:hidden"
                >
                    <ul className="flex min-h-full flex-col items-center justify-center gap-2 px-6 py-24">
                        {navLinks.map(link => (
                            <li key={link.id}>
                                <Link
                                    to={`/#${link.id}`}
                                    onClick={closeMenu}
                                    aria-current={current === link.id ? 'location' : undefined}
                                    className={`block px-6 py-3 font-heading text-2xl font-bold transition-colors hover:text-theme-heading ${current === link.id ? 'text-theme-heading' : 'text-theme-secondary'}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="mt-6">
                            <a
                                href={site.resume}
                                download={site.resumeFilename}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                                className="btn btn-outline btn-md"
                            >
                                Resume
                                <DownloadIcon width={16} height={16} />
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};
