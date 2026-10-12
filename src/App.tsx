import { useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigationType, type Location, type NavigationType } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ArrowUpIcon } from './components/ui/icons';
import { useScrolledPast } from './hooks/useScrolledPast';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';

const SCROLL_STORAGE_KEY = 'scroll-positions';

const restoredPositions = (): [string, number][] => {
    const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (!entry || entry.type === 'navigate') return [];
    try {
        const saved: unknown = JSON.parse(sessionStorage.getItem(SCROLL_STORAGE_KEY) ?? '[]');
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
};

const scrollPositions = new Map<string, number>(restoredPositions());
let lastLocation: Location | null = null;

history.scrollRestoration = 'manual';

const moveFocusTo = (element: HTMLElement | null) => {
    if (!element) return;
    if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
};

const PageScroll = ({ location, navigationType }: { location: Location; navigationType: NavigationType }) => {
    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        const isMount = !hasMounted.current;
        hasMounted.current = true;
        const saved = scrollPositions.get(location.key);
        const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;

        if (lastLocation && lastLocation !== location) moveFocusTo(target ?? document.getElementById('main'));
        lastLocation = location;

        if (navigationType === 'POP' && saved !== undefined) {
            window.scrollTo({ top: saved, behavior: 'instant' });
        } else if (target) {
            target.scrollIntoView({ behavior: isMount ? 'instant' : 'auto' });
            if (isMount) {
                const landedAt = window.scrollY;
                void document.fonts.ready.then(() => {
                    if (Math.abs(window.scrollY - landedAt) < 4) target.scrollIntoView({ behavior: 'instant' });
                });
            }
        } else if (isMount) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }

        return () => {
            scrollPositions.set(location.key, window.scrollY);
        };
    }, [location, navigationType]);

    return null;
};

const BackToTop = () => {
    const isVisible = useScrolledPast(600);

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-theme bg-theme-card text-theme-secondary shadow-lg transition-[opacity,visibility,color,border-color] duration-200 hover:border-theme-accent hover:text-theme-accent ${isVisible ? '' : 'invisible opacity-0'}`}
        >
            <ArrowUpIcon />
        </button>
    );
};

const Shell = () => {
    const location = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        const save = () => {
            scrollPositions.set(location.key, window.scrollY);
            try {
                sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify([...scrollPositions].slice(-50)));
            } catch {
                return;
            }
        };
        window.addEventListener('pagehide', save);
        return () => window.removeEventListener('pagehide', save);
    }, [location.key]);

    const skipToContent = (event: MouseEvent) => {
        event.preventDefault();
        const main = document.getElementById('main');
        moveFocusTo(main);
        main?.scrollIntoView();
    };

    return (
        <>
            <a href="#main" onClick={skipToContent} className="skip-link">
                Skip to content
            </a>
            <Navbar />
            <div key={location.pathname} id="page" className="flex min-h-svh flex-col">
                <PageScroll location={location} navigationType={navigationType} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:slug" element={<ProjectDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <BackToTop />
        </>
    );
};

const App = () => (
    <BrowserRouter>
        <Shell />
    </BrowserRouter>
);

export default App;
