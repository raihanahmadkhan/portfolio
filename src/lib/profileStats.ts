export interface PlatformStats {
    leetcode: { totalSolved: number; easySolved: number; mediumSolved: number; hardSolved: number; contestRating: number | null };
    codeforces: { rating: number | null; maxRating: number | null };
    gfg: { problemsSolved: number; codingScore: number; instituteRank: number | null; potdsSolved: number };
    github: { contributionsLastYear: number };
}

export type Platform = keyof PlatformStats;
export interface SourceMetadata {
    status: 'snapshot' | 'verified' | 'stale' | 'unavailable';
    verifiedAt: string | null;
}
export interface StatsState {
    stats: PlatformStats;
    sources: Record<Platform, SourceMetadata>;
}

export const PLATFORMS: Platform[] = ['leetcode', 'gfg', 'github', 'codeforces'];
const CACHE_KEY = 'raihan-profile-stats-v1';
const SNAPSHOT_DATE = '2026-10-12T00:00:00.000Z';
const fields = {
    leetcode: ['totalSolved', 'easySolved', 'mediumSolved', 'hardSolved', 'contestRating'],
    codeforces: ['rating', 'maxRating'],
    gfg: ['problemsSolved', 'codingScore', 'instituteRank', 'potdsSolved'],
    github: ['contributionsLastYear']
} as const;

export function baselineStats(): StatsState {
    return {
        stats: {
            leetcode: { totalSolved: 256, easySolved: 80, mediumSolved: 125, hardSolved: 51, contestRating: 1414 },
            codeforces: { rating: null, maxRating: null },
            gfg: { problemsSolved: 243, codingScore: 991, instituteRank: 158, potdsSolved: 127 },
            github: { contributionsLastYear: 320 }
        },
        sources: {
            leetcode: { status: 'snapshot', verifiedAt: SNAPSHOT_DATE },
            gfg: { status: 'snapshot', verifiedAt: SNAPSHOT_DATE },
            github: { status: 'snapshot', verifiedAt: SNAPSHOT_DATE },
            codeforces: { status: 'unavailable', verifiedAt: null }
        }
    };
}

function object(value: unknown): Record<string, unknown> | null {
    return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function validData(platform: Platform, value: unknown): value is PlatformStats[Platform] {
    const data = object(value);
    return !!data && fields[platform].every(field => {
        const value = data[field];
        const nullable = platform === 'codeforces' || field === 'contestRating' || field === 'instituteRank';
        return (nullable && value === null) || (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0);
    });
}

export function mergeProfileResponse(previous: StatsState, payload: unknown): StatsState {
    const response = object(payload);
    const platforms = object(response?.platforms);
    if (response?.version !== 1 || !platforms) throw new Error('Invalid profile response');
    const next: StatsState = { stats: { ...previous.stats }, sources: { ...previous.sources } };
    for (const platform of PLATFORMS) {
        const entry = object(platforms[platform]);
        if (!entry || !['verified', 'stale'].includes(String(entry.status)) || !validData(platform, entry.data) || typeof entry.verifiedAt !== 'string' || !Number.isFinite(Date.parse(entry.verifiedAt))) {
            next.sources[platform] = { ...previous.sources[platform], status: previous.sources[platform].status === 'verified' ? 'stale' : previous.sources[platform].status };
            continue;
        }
        const previousDate = previous.sources[platform].verifiedAt;
        if (previousDate && Date.parse(entry.verifiedAt) < Date.parse(previousDate)) continue;
        const data = Object.fromEntries(fields[platform].map(field => [field, (entry.data as unknown as Record<string, unknown>)[field]]));
        Object.assign(next.stats, { [platform]: data });
        next.sources[platform] = { status: entry.status as 'verified' | 'stale', verifiedAt: entry.verifiedAt };
    }
    return next;
}

export function loadSavedStats(): StatsState {
    const baseline = baselineStats();
    try {
        const saved = localStorage.getItem(CACHE_KEY);
        if (!saved) return baseline;
        const state = mergeProfileResponse(baseline, JSON.parse(saved));
        for (const platform of PLATFORMS) {
            if (state.sources[platform].status === 'verified') state.sources[platform].status = 'stale';
        }
        return state;
    } catch {
        return baseline;
    }
}

export function saveStats(state: StatsState) {
    try {
        const platforms = Object.fromEntries(PLATFORMS.filter(key => ['verified', 'stale'].includes(state.sources[key].status)).map(key => [key, { data: state.stats[key], ...state.sources[key] }]));
        localStorage.setItem(CACHE_KEY, JSON.stringify({ version: 1, platforms }));
    } catch {
        return;
    }
}

export function sourceLabel(source: SourceMetadata) {
    if (!source.verifiedAt) return 'Statistics unavailable';
    const date = new Date(source.verifiedAt);
    if (source.status === 'snapshot') return `Saved ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })}`;
    const timestamp = date.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
    return `${source.status === 'verified' ? 'Checked' : 'Last verified'} ${timestamp} IST`;
}
