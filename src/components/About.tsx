import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Card } from './ui/Card';

const educationData = [
    {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "Birla Institute of Technology, Mesra",
        period: "2023 - 2027",
        grade: "CGPA: 8.43",
        icon: "🎓",
        current: true
    },
    {
        degree: "Senior Secondary (Class XII)",
        institution: "Holy Cross School, Hazaribagh",
        period: "2022",
        grade: "91%",
        board: "CBSE",
        icon: "📚"
    },
    {
        degree: "Matriculation (Class X)",
        institution: "Holy Cross School, Hazaribagh",
        period: "2020",
        grade: "95.5%",
        board: "CBSE",
        icon: "📖"
    }
];

export const About = () => {
    return (
        <Section id="about" className="bg-theme-main">
            <div className="max-w-4xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-heading font-bold text-theme-heading mb-8"
                    >
                        About Me
                    </motion.h2>
                    <div className="space-y-4 text-theme-secondary text-lg leading-relaxed max-w-3xl mx-auto">
                        <p>
                            I am a B.Tech Computer Science student at Birla Institute of Technology, Mesra, focused on building clear, scalable and maintainable software systems.
                        </p>
                        <p>
                            I work across the full stack, designing intuitive frontends and robust backends and enjoy thinking through system structure, data flow and long-term maintainability. I value simplicity in design, clarity in code and solutions that hold up as requirements evolve.
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
            >
                <motion.h3
                    className="text-3xl font-heading font-bold text-center text-theme-heading mb-12"
                >
                    Education
                </motion.h3>

                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-theme-accent/20 -translate-x-1/2" />

                    <div className="space-y-8 md:space-y-12">
                        {educationData.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <Card className="border-theme bg-theme-card shadow-md gradient-border">
                                        {edu.current && (
                                            <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-theme-accent/10 text-theme-accent rounded mb-3 border border-theme-accent/20">
                                                Currently Pursuing
                                            </span>
                                        )}

                                        <h4 className="text-xl font-heading text-theme-heading font-semibold mb-1">
                                            {edu.degree}
                                        </h4>
                                        <p className="text-theme-accent font-medium text-sm mb-2">
                                            {edu.institution}
                                        </p>
                                        <div className={`flex flex-wrap gap-3 items-center ${index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'} text-sm`}>
                                            {edu.board && (
                                                <span className="text-theme-muted font-mono text-xs px-2 py-0.5 bg-theme-main rounded border border-theme">
                                                    {edu.board}
                                                </span>
                                            )}
                                            <span className="text-theme-heading font-bold font-mono bg-theme-accent/10 px-2 py-0.5 rounded">
                                                {edu.grade}
                                            </span>
                                        </div>
                                    </Card>
                                </div>

                                <div className="relative flex flex-col items-center z-10">
                                    <div className={`w-14 h-14 rounded-full bg-theme-card border-2 ${edu.current ? 'border-theme-accent' : 'border-theme'} flex items-center justify-center shadow-lg`}>
                                        <span className="text-2xl">{edu.icon}</span>
                                    </div>
                                    <span className="mt-2 text-xs font-mono text-theme-muted tracking-wider">
                                        {edu.period}
                                    </span>
                                </div>

                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Section>
    );
};
