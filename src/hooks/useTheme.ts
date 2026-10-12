import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_COLORS: Record<Theme, string> = { light: '#05338A', dark: '#050826' };

const currentTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(currentTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
    }, [theme]);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        const root = document.documentElement;
        root.classList.add('theme-switching');
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
        setTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch {
            return;
        }
    };

    return { theme, toggleTheme };
};
