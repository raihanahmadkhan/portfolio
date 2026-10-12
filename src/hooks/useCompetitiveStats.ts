import { useState, useEffect, useRef } from 'react';
import { PLATFORMS, loadSavedStats, mergeProfileResponse, saveStats } from '../lib/profileStats';

export const useCompetitiveStats = () => {
    const [state, setState] = useState(loadSavedStats);
    const stateRef = useRef(state);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        let pending = false;
        let lastAttempt = 0;
        let controller: AbortController | undefined;
        const names = { leetcode: 'LeetCode', gfg: 'GFG', github: 'GitHub', codeforces: 'Codeforces' };

        const refresh = async (force = false) => {
            if (!active || pending || (!force && (document.visibilityState !== 'visible' || Date.now() - lastAttempt < 60_000))) return;
            lastAttempt = Date.now();
            pending = true;
            controller = new AbortController();
            const timeout = window.setTimeout(() => controller?.abort(), 12_000);
            try {
                const response = await fetch('/api/profile-stats', { signal: controller.signal, cache: 'no-store' });
                if (!response.ok) throw new Error('Profile refresh unavailable');
                const payload: unknown = await response.json();
                if (!active) return;
                const next = mergeProfileResponse(stateRef.current, payload);
                stateRef.current = next;
                setState(next);
                saveStats(next);
                const failed = PLATFORMS.filter(key => next.sources[key].status !== 'verified').map(key => names[key]);
                setError(failed.length ? `${failed.join(', ')} could not be refreshed. Last known values are shown.` : null);
            } catch {
                if (active) {
                    const previous = stateRef.current;
                    const next = { stats: previous.stats, sources: { ...previous.sources } };
                    for (const platform of PLATFORMS) {
                        if (next.sources[platform].status === 'verified') next.sources[platform] = { ...next.sources[platform], status: 'stale' };
                    }
                    stateRef.current = next;
                    setState(next);
                    setError('Profiles could not be refreshed. Last known values are shown.');
                }
            } finally {
                window.clearTimeout(timeout);
                pending = false;
                if (active) setLoading(false);
            }
        };

        const onResume = () => { void refresh(); };
        void refresh(true);
        const interval = window.setInterval(onResume, 5 * 60_000);
        window.addEventListener('focus', onResume);
        document.addEventListener('visibilitychange', onResume);
        return () => {
            active = false;
            controller?.abort();
            window.clearInterval(interval);
            window.removeEventListener('focus', onResume);
            document.removeEventListener('visibilitychange', onResume);
        };
    }, []);

    return { stats: state.stats, sources: state.sources, loading, error };
};
