import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { useCompetitiveStats } from '../hooks/useCompetitiveStats';
import leetcodeLogo from '../images/leetcode-logo.svg';
import codeforcesLogo from '../images/codeforces.svg';
import gfgLogo from '../images/gfg-logo.svg';

export const Competitive = () => {
    const { stats, loading, error } = useCompetitiveStats();

    return (
        <Section id="competitive" className="relative py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-theme-heading mb-4 tracking-tight">
                    TRIALS OF LOGIC
                </h2>
                <div className="w-20 h-1 bg-theme-accent/60 mx-auto rounded-full mb-6" />
                <p className="text-theme-secondary max-w-2xl mx-auto text-lg font-body">
                    Consistent problem-solving across multiple platforms
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.a
                        href="https://leetcode.com/u/raihanahmad/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                        className="group relative"
                    >
                        <div className="h-full bg-theme-card border-2 border-theme rounded-lg p-8 transition-all duration-300 hover:border-theme-accent/40 shadow-lg hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-12 p-2.5 bg-theme-main rounded-lg border border-theme group-hover:border-theme-accent/30 transition-all duration-300">
                                    <img
                                        src={leetcodeLogo}
                                        alt="LeetCode"
                                        className="w-full h-full object-contain opacity-90"
                                    />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-heading font-medium text-theme-heading">
                                        LeetCode
                                    </h3>
                                    <p className="text-sm font-mono text-theme-muted opacity-80">
                                        @raihanahmad
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-center py-6 bg-theme-main rounded-lg border border-theme shadow-inner">
                                    <p className="text-[10px] text-theme-accent uppercase tracking-[0.2em] mb-2 font-bold font-heading">
                                        Problems Solved
                                    </p>
                                    <div className="text-4xl font-bold font-mono text-theme-heading tracking-tight">
                                        {loading ? "..." : stats.leetcode.totalSolved}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center px-2 py-3 bg-theme-main rounded border border-theme">
                                    <p className="text-[9px] text-emerald-400 uppercase font-bold mb-1.5 tracking-wider font-heading">
                                        Easy
                                    </p>
                                    <p className="text-base font-mono text-theme-secondary font-semibold">
                                        {loading ? "--" : stats.leetcode.easySolved}
                                    </p>
                                </div>
                                <div className="text-center px-2 py-3 bg-theme-main rounded border border-theme">
                                    <p className="text-[9px] text-amber-400 uppercase font-bold mb-1.5 tracking-wider font-heading">
                                        Medium
                                    </p>
                                    <p className="text-base font-mono text-theme-secondary font-semibold">
                                        {loading ? "--" : stats.leetcode.mediumSolved}
                                    </p>
                                </div>
                                <div className="text-center px-2 py-3 bg-theme-main rounded border border-theme">
                                    <p className="text-[9px] text-red-400 uppercase font-bold mb-1.5 tracking-wider font-heading">
                                        Hard
                                    </p>
                                    <p className="text-base font-mono text-theme-secondary font-semibold">
                                        {loading ? "--" : stats.leetcode.hardSolved}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    <motion.a
                        href="https://codeforces.com/profile/raihan_ahmad"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group relative"
                    >
                        <div className="h-full bg-theme-card border-2 border-theme rounded-lg p-8 transition-all duration-300 hover:border-theme-accent/40 shadow-lg hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-12 p-2.5 bg-theme-main rounded-lg border border-theme group-hover:border-theme-accent/30 transition-all duration-300">
                                    <img
                                        src={codeforcesLogo}
                                        alt="Codeforces"
                                        className="w-full h-full object-contain opacity-90"
                                    />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-heading font-medium text-theme-heading">
                                        Codeforces
                                    </h3>
                                    <p className="text-sm font-mono text-theme-muted opacity-80">
                                        raihan_ahmad
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-center py-6 bg-theme-main rounded-lg border border-theme shadow-inner">
                                    <p className="text-[10px] text-theme-accent uppercase tracking-[0.2em] mb-2 font-bold font-heading">
                                        Current Rating
                                    </p>
                                    <div className="text-4xl font-bold font-mono text-theme-heading tracking-tight">
                                        {loading ? "..." : stats.codeforces.rating}
                                    </div>
                                </div>

                                <div className="text-center py-4 bg-theme-main rounded border border-theme">
                                    <p className="text-[9px] text-theme-accent uppercase font-bold mb-1.5 tracking-wider font-heading">
                                        Peak Rating
                                    </p>
                                    <p className="text-xl font-mono text-theme-secondary font-semibold">
                                        {loading ? "--" : stats.codeforces.maxRating}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    <motion.a
                        href="https://www.geeksforgeeks.org/user/raihan"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="group relative"
                    >
                        <div className="h-full bg-theme-card border-2 border-theme rounded-lg p-8 transition-all duration-300 hover:border-theme-accent/40 shadow-lg hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-12 p-2.5 bg-theme-main rounded-lg border border-theme group-hover:border-theme-accent/30 transition-all duration-300">
                                    <img
                                        src={gfgLogo}
                                        alt="GeeksforGeeks"
                                        className="w-full h-full object-contain opacity-90"
                                    />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-heading font-medium text-theme-heading">
                                        GeeksforGeeks
                                    </h3>
                                    <p className="text-sm font-mono text-theme-muted opacity-80">
                                        raihan
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-center py-6 bg-theme-main rounded-lg border border-theme shadow-inner">
                                    <p className="text-[10px] text-theme-accent uppercase tracking-[0.2em] mb-2 font-bold font-heading">
                                        Problems Solved
                                    </p>
                                    <div className="text-4xl font-bold font-mono text-theme-heading tracking-tight">
                                        {stats.gfg.problemsSolved}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center px-2 py-3 bg-theme-main rounded border border-theme">
                                    <p className="text-[9px] text-theme-accent uppercase font-bold mb-1.5 tracking-wider font-heading">
                                        Score
                                    </p>
                                    <p className="text-base font-mono text-theme-secondary font-semibold">
                                        {stats.gfg.codingScore}
                                    </p>
                                </div>
                                <div className="text-center px-2 py-3 bg-theme-main rounded border border-theme">
                                    <p className="text-[9px] text-theme-accent uppercase font-bold mb-1.5 tracking-wider font-heading">
                                        Rank
                                    </p>
                                    <p className="text-base font-mono text-theme-secondary font-semibold">
                                        {stats.gfg.instituteRank}
                                    </p>
                                </div>
                                <div className="text-center px-2 py-3 bg-theme-main rounded border border-theme">
                                    <p className="text-[9px] text-theme-accent uppercase font-bold mb-1.5 tracking-wider font-heading">
                                        POTDs
                                    </p>
                                    <p className="text-base font-mono text-theme-secondary font-semibold">
                                        {stats.gfg.potdsSolved}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.a>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 max-w-3xl mx-auto"
                >
                    <div className="bg-theme-card border-2 border-theme rounded-lg p-8 backdrop-blur-sm shadow-xl gradient-border">
                        <div className="grid grid-cols-2 gap-8 mb-6">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold font-mono text-theme-heading mb-2 tracking-tight">
                                    450+
                                </div>
                                <div className="text-[10px] md:text-[11px] text-theme-accent uppercase tracking-[0.12em] font-bold font-heading">
                                    Problems Solved
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold font-mono text-theme-heading mb-2 tracking-tight">
                                    1397
                                </div>
                                <div className="text-[10px] md:text-[11px] text-theme-accent uppercase tracking-[0.12em] font-bold font-heading">
                                    Peak Rating
                                </div>
                            </div>
                        </div>

                        <div className="w-16 h-px bg-theme-accent/30 mx-auto mb-4" />

                        <p className="text-center text-theme-secondary text-sm font-body">
                            Focused on <span className="text-theme-heading font-medium">Data Structures</span>, <span className="text-theme-heading font-medium">Algorithms</span> & <span className="text-theme-heading font-medium">Problem Solving</span>
                        </p>

                        {error && (
                            <p className="text-theme-muted text-[10px] mt-6 font-mono opacity-50 uppercase tracking-widest text-center">
                                Connection to platform spirits is weak...
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};
