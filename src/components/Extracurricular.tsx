import { motion } from 'framer-motion';
import { Section } from './ui/Section';

const activities = [
    {
        role: "Google Student Ambassador",
        org: "Google",
        period: "Aug 2025 - Dec 2025",
        description: "Conducted AI workshops and engaged students in innovation initiatives.",
        icon: "🤖"
    },
    {
        role: "Semifinalist",
        org: "Trikaya Hack-to-Hire Hackathon",
        period: "Nov 2025",
        description: "Recognized for developing PodcastMini, an AI-powered podcast summarization tool.",
        icon: "🏆"
    },
    {
        role: "General Secretary",
        org: "Aakshar Literary Society",
        period: "Jan 2025 - Nov 2025",
        description: "Led major campus events and contributed to growing participation and outreach.",
        icon: "✍️"
    },
    {
        role: "Member",
        org: "IEEE Student Branch - BIT Mesra",
        period: "May 2024 - Present",
        description: "Active member contributing to technical events and professional development initiatives.",
        icon: "⚡"
    },
    {
        role: "Community Captain",
        org: "Zuno by Foundit",
        period: "May 2024 - Oct 2024",
        description: "Led community engagement and career development activities for students.",
        icon: "🚀"
    },
    {
        role: "School Captain",
        org: "Holy Cross School",
        period: "2020 - 2022",
        description: "Directed the student council and coordinated school-wide events.",
        icon: "👨‍🎓"
    }
];

export const Extracurricular = () => {
    return (
        <Section id="extracurricular" className="bg-theme-card border-t border-theme">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-heading font-bold text-center text-theme-heading mb-12"
            >
                Beyond the Code
            </motion.h2>

            <div className="max-w-3xl mx-auto space-y-6">
                {activities.map((activity, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative pl-16 md:pl-20"
                    >
                        {index < activities.length - 1 && (
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                                style={{ transformOrigin: 'top' }}
                                className="absolute left-6 md:left-8 top-12 bottom-0 w-px bg-gradient-to-b from-theme-accent/30 to-transparent"
                            />
                        )}

                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-theme-main border-2 border-theme group-hover:border-theme-accent/50 flex items-center justify-center shadow-lg transition-all duration-300"
                        >
                            <span className="text-xl md:text-2xl">{activity.icon}</span>
                            <motion.div
                                className="absolute inset-0 rounded-full bg-theme-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                            />
                        </motion.div>

                        <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                            className="bg-theme-main/50 rounded-lg p-4 border border-theme group-hover:border-theme-accent/30 transition-all duration-300 card-shine"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1 gap-1">
                                <h3 className="text-lg font-heading text-theme-secondary group-hover:text-theme-heading transition-colors">{activity.role}</h3>
                                <span className="text-xs font-mono text-theme-muted uppercase tracking-widest">{activity.period}</span>
                            </div>
                            <p className="text-sm font-medium text-theme-accent mb-1">{activity.org}</p>
                            <p className="text-theme-secondary text-sm leading-relaxed">{activity.description}</p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
