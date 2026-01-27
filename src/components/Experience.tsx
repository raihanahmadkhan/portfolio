import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Card } from './ui/Card';

const experiences = [
    {
        role: "Full-Stack Developer Intern",
        company: "Zidio Development",
        period: "Mar 2025 - Apr 2025",
        description: "Led frontend development of FinTrak using React.js and Material UI. Assisted in developing secure REST APIs with Spring Boot and MySQL (JWT/OAuth2). Integrated real-time analytics dashboards."
    },
    {
        role: "General Secretary",
        company: "Aakshar Literary Society",
        period: "Jan 2025 - Nov 2025",
        description: "Led major campus events and contributed to growing participation and outreach."
    },
    {
        role: "Google Student Ambassador",
        company: "Google",
        period: "Aug 2025 - Dec 2025",
        description: "Conducted AI workshops and engaged students in innovation initiatives."
    }
];

const skills = {
    Languages: ["Python", "JavaScript", "Java", "SQL", "C"],
    Backend: ["FastAPI", "Node.js", "Express.js", "Spring Boot"],
    Frontend: ["React.js", "Tailwind CSS", "Bootstrap", "Material UI"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
    DevOps: ["Docker", "Git/GitHub", "AWS EC2", "Postman"],
    "Tools & Tech": ["VS Code", "Vite", "npm/yarn", "Netlify", "Render", "Linux"]
};

export const Experience = () => {
    return (
        <Section id="experience">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-heading font-bold text-center text-theme-heading mb-12"
            >
                Chronicles of Work
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-8 relative mb-20">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-theme-accent/20 -translate-x-1/2" />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="relative"
                    >
                        <motion.div
                            className="hidden md:block absolute left-1/2 w-3 h-3 bg-theme-accent rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                            <div className="flex-1">
                                <Card hover className="bg-theme-card border-theme gradient-border">
                                    <h3 className="text-xl font-heading text-theme-heading">{exp.role}</h3>
                                    <p className="text-theme-accent font-medium mb-2">{exp.company}</p>
                                    <p className="text-theme-secondary text-sm leading-relaxed">{exp.description}</p>
                                </Card>
                            </div>

                            <div className={`hidden md:flex flex-1 ${index % 2 === 0 ? 'justify-end text-right' : 'justify-start text-left'}`}>
                                <span className="text-theme-muted font-heading text-sm tracking-widest uppercase">{exp.period}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto px-4"
            >
                <h3 className="text-3xl font-heading text-center text-theme-heading mb-10">Arsenal of Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skills).map(([category, items], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                        >
                            <Card className="bg-theme-card border-theme shadow-sm gradient-border h-full">
                                <h4 className="text-theme-heading font-heading mb-4 text-lg border-b border-theme pb-2">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill, skillIndex) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                                            whileHover={{
                                                y: -3,
                                                boxShadow: '0 0 15px rgba(197, 160, 89, 0.2)',
                                                borderColor: 'var(--accent)'
                                            }}
                                            className="px-2 py-1 bg-theme-main text-theme-secondary text-sm rounded border border-theme cursor-default transition-all duration-200"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};
