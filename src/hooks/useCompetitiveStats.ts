import { useState, useEffect } from 'react';

export interface PlatformStats {
    leetcode: {
        totalSolved: number;
        easySolved: number;
        mediumSolved: number;
        hardSolved: number;
    };
    codeforces: {
        rating: number;
        maxRating: number;
    };
    gfg: {
        problemsSolved: number;
        codingScore: number;
        instituteRank: number;
        potdsSolved: number;
    };
}

export const useCompetitiveStats = () => {
    const [stats, setStats] = useState<PlatformStats>({
        leetcode: { totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0 },
        codeforces: { rating: 0, maxRating: 0 },
        gfg: { problemsSolved: 243, codingScore: 991, instituteRank: 150, potdsSolved: 127 }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const leetcodePromise = fetch('https://leetcode-stats-api.herokuapp.com/raihanahmad')
                    .then(res => res.json())
                    .catch(() => null);

                const codeforcesPromise = fetch('https://codeforces.com/api/user.info?handles=raihan_ahmad')
                    .then(res => res.json())
                    .catch(() => null);

                const gfgData = {
                    problemsSolved: 243,
                    codingScore: 991,
                    instituteRank: 150,
                    potdsSolved: 127
                };

                const [leetcodeData, codeforcesData] = await Promise.all([
                    leetcodePromise,
                    codeforcesPromise
                ]);

                const newStats: PlatformStats = {
                    leetcode: leetcodeData?.status === 'success' ? {
                        totalSolved: leetcodeData.totalSolved || 0,
                        easySolved: leetcodeData.easySolved || 0,
                        mediumSolved: leetcodeData.mediumSolved || 0,
                        hardSolved: leetcodeData.hardSolved || 0
                    } : { totalSolved: 254, easySolved: 80, mediumSolved: 123, hardSolved: 51 },

                    codeforces: codeforcesData?.status === 'OK' && codeforcesData.result?.[0] ? {
                        rating: codeforcesData.result[0].rating || 1392,
                        maxRating: codeforcesData.result[0].maxRating || 1397
                    } : { rating: 1392, maxRating: 1397 },

                    gfg: gfgData
                };

                setStats(newStats);
            } catch (err) {
                console.error('Failed to fetch competitive stats:', err);
                setError('Failed to load stats');
                setStats({
                    leetcode: { totalSolved: 254, easySolved: 80, mediumSolved: 123, hardSolved: 51 },
                    codeforces: { rating: 1392, maxRating: 1397 },
                    gfg: { problemsSolved: 243, codingScore: 991, instituteRank: 150, potdsSolved: 127 }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};
