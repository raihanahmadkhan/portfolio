import { useEffect, useState } from 'react';

export const useActiveSection = (enabled: boolean) => {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) return;
        const sections = document.querySelectorAll('main > section[id]');
        const footer = document.querySelector('footer');
        const last = sections[sections.length - 1];
        let atLine: string | null = null;
        let atEnd = false;
        const update = () => setActive(atEnd ? last.id : atLine);

        const lineObserver = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) atLine = entry.target.id;
                }
                update();
            },
            { rootMargin: '-40% 0px -60% 0px' },
        );
        const endObserver = new IntersectionObserver(
            ([entry]) => {
                atEnd = entry.isIntersecting;
                update();
            },
            { threshold: 0.9 },
        );

        sections.forEach(section => lineObserver.observe(section));
        if (footer) endObserver.observe(footer);
        return () => {
            lineObserver.disconnect();
            endObserver.disconnect();
            setActive(null);
        };
    }, [enabled]);

    return active;
};
