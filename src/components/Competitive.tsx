import { site } from '../data/site';
import { useCompetitiveStats } from '../hooks/useCompetitiveStats';
import codeforcesLogo from '../images/codeforces.svg';
import gfgLogo from '../images/gfg-logo.svg';
import leetcodeLogo from '../images/leetcode-logo.svg';
import { sourceLabel, type SourceMetadata } from '../lib/profileStats';
import { ExternalIcon } from './ui/icons';
import { Section, SectionHeading } from './ui/Section';

interface Stat {
    label: string;
    value: number | null;
    tone?: string;
    grouped?: boolean;
}

interface Platform {
    name: string;
    handle: string;
    href: string;
    logo: string;
    source: SourceMetadata;
    detail?: string;
    headline: Stat;
    stats: Stat[];
}

const formatNumber = (value: number) => value.toLocaleString('en-US');

const StatValue = ({ stat, loading }: { stat: Stat; loading: boolean }) => {
    if (stat.value !== null) return stat.grouped === false ? stat.value : formatNumber(stat.value);
    if (loading) return <span className="skeleton" role="img" aria-label="Loading" />;
    return (
        <>
            <span aria-hidden="true">—</span>
            <span className="sr-only">Unavailable</span>
        </>
    );
};

const PlatformCard = ({ platform, loading }: { platform: Platform; loading: boolean }) => (
    <a
        href={platform.href}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-interactive flex h-full flex-col p-6 sm:p-8"
    >
        <div className="mb-6 flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-theme bg-theme-main p-2.5">
                <img src={platform.logo} alt="" width={28} height={28} className="h-full w-full object-contain" />
            </span>
            <div className="min-w-0 text-right">
                <h3 className="font-heading text-xl font-bold text-theme-heading">
                    {platform.name}
                    <span className="sr-only"> profile (opens in a new tab)</span>
                </h3>
                <p className="truncate font-mono text-sm text-theme-muted">{platform.handle}</p>
                {platform.detail && <p className="mt-1 font-mono text-xs text-theme-muted">{platform.detail}</p>}
                <p className="mt-1 font-mono text-[11px] text-theme-muted">{sourceLabel(platform.source)}</p>
            </div>
        </div>

        <dl className="mt-auto space-y-3">
            <div className="rounded-lg border border-theme bg-theme-main py-5 text-center">
                <dt className="stat-label text-theme-accent">{platform.headline.label}</dt>
                <dd className="mt-2 font-mono text-4xl font-bold tracking-tight text-theme-heading">
                    <StatValue stat={platform.headline} loading={loading} />
                </dd>
            </div>
            <div className={`grid gap-2 ${platform.stats.length > 1 ? 'grid-cols-3' : ''}`}>
                {platform.stats.map(stat => (
                    <div key={stat.label} className="rounded border border-theme bg-theme-main px-1 py-3 text-center">
                        <dt className={`stat-label ${stat.tone ?? 'text-theme-accent'}`}>{stat.label}</dt>
                        <dd className="mt-1 font-mono text-base font-bold text-theme-secondary">
                            <StatValue stat={stat} loading={loading} />
                        </dd>
                    </div>
                ))}
            </div>
        </dl>
    </a>
);

export const Competitive = () => {
    const { stats, sources, loading, error } = useCompetitiveStats();

    const platforms: Platform[] = [
        {
            name: 'LeetCode',
            handle: '@raihanahmad',
            href: 'https://leetcode.com/u/raihanahmad/',
            logo: leetcodeLogo,
            source: sources.leetcode,
            detail: stats.leetcode.contestRating === null ? undefined : `Contest rating: ${formatNumber(stats.leetcode.contestRating)}`,
            headline: { label: 'Problems Solved', value: stats.leetcode.totalSolved },
            stats: [
                { label: 'Easy', value: stats.leetcode.easySolved, tone: 'text-emerald-700 dark:text-emerald-400' },
                { label: 'Medium', value: stats.leetcode.mediumSolved, tone: 'text-amber-700 dark:text-amber-400' },
                { label: 'Hard', value: stats.leetcode.hardSolved, tone: 'text-red-700 dark:text-red-400' },
            ],
        },
        {
            name: 'Codeforces',
            handle: 'raihan_ahmad',
            href: 'https://codeforces.com/profile/raihan_ahmad',
            logo: codeforcesLogo,
            source: sources.codeforces,
            headline: { label: 'Current Rating', value: stats.codeforces.rating, grouped: false },
            stats: [{ label: 'Peak Rating', value: stats.codeforces.maxRating, grouped: false }],
        },
        {
            name: 'GeeksforGeeks',
            handle: 'raihan',
            href: 'https://www.geeksforgeeks.org/profile/raihan',
            logo: gfgLogo,
            source: sources.gfg,
            headline: { label: 'Problems Solved', value: stats.gfg.problemsSolved },
            stats: [
                { label: 'Score', value: stats.gfg.codingScore },
                { label: 'Rank', value: stats.gfg.instituteRank },
                { label: 'POTDs', value: stats.gfg.potdsSolved },
            ],
        },
    ];

    return (
        <Section id="competitive" aria-labelledby="competitive-title">
            <SectionHeading id="competitive-title" title="Competitive Programming">
                <p className="mt-6 text-lg text-theme-secondary">
                    Read from my public LeetCode, Codeforces, GeeksforGeeks and GitHub profiles.
                </p>
                <p className="mt-2 text-sm">
                    <a
                        href="https://codolio.com/profile/raihan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-theme-accent underline-offset-4 hover:underline"
                    >
                        All profiles on Codolio
                        <ExternalIcon width={14} height={14} />
                        <span className="sr-only">(opens in a new tab)</span>
                    </a>
                </p>
            </SectionHeading>

            <ul className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                {platforms.map(platform => (
                    <li key={platform.name}>
                        <PlatformCard platform={platform} loading={loading} />
                    </li>
                ))}
            </ul>

            <div className="card mx-auto mt-12 max-w-3xl p-6 text-center sm:p-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    <p>
                        <span className="block font-mono text-4xl font-bold tracking-tight text-theme-heading md:text-5xl">
                            {formatNumber(stats.leetcode.totalSolved + stats.gfg.problemsSolved)}
                        </span>
                        <span className="stat-label mt-2 block text-theme-accent">Problems Solved</span>
                        <span className="mt-1 block font-mono text-[11px] text-theme-muted">LeetCode + GeeksforGeeks</span>
                    </p>
                    <a
                        href={site.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-m-2 block rounded-lg p-2 transition-colors hover:bg-theme-accent/10"
                    >
                        <span className="block font-mono text-4xl font-bold tracking-tight text-theme-heading md:text-5xl">
                            {formatNumber(stats.github.contributionsLastYear)}
                        </span>
                        <span className="stat-label mt-2 block text-theme-accent">
                            GitHub Contributions
                            <span className="sr-only"> (opens in a new tab)</span>
                        </span>
                        <span className="mt-1 block font-mono text-[11px] text-theme-muted">Last year · {sourceLabel(sources.github)}</span>
                    </a>
                </div>

                {error && (
                    <p role="status" className="mt-5 text-xs text-theme-muted">
                        {error}
                    </p>
                )}
            </div>
        </Section>
    );
};
