import { useSyncExternalStore } from 'react';

const subscribe = (notify: () => void) => {
    window.addEventListener('scroll', notify, { passive: true });
    return () => window.removeEventListener('scroll', notify);
};

export const useScrolledPast = (offset: number) => useSyncExternalStore(subscribe, () => window.scrollY > offset);
