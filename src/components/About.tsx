import { Section, SectionHeading } from './ui/Section';
import { Timeline } from './ui/Timeline';

const education = [
    {
        title: 'B.Tech in Computer Science and Engineering',
        subtitle: 'Birla Institute of Technology, Mesra',
        period: '2023–2027',
        detail: 'CGPA 8.51/10',
    },
    {
        title: 'Senior Secondary (Class XII)',
        subtitle: 'Holy Cross School, Hazaribagh',
        period: '2022',
        detail: 'CBSE · 91%',
    },
    {
        title: 'Matriculation (Class X)',
        subtitle: 'Holy Cross School, Hazaribagh',
        period: '2020',
        detail: 'CBSE · 95.5%',
    },
];

export const About = () => (
    <Section id="about" aria-labelledby="about-title" className="wall-shadow">
        <SectionHeading id="about-title" title="About" />

        <div className="mx-auto mb-20 max-w-3xl space-y-4 text-lg leading-relaxed text-theme-secondary md:text-center">
            <p>
                I am a final-year B.Tech student in Computer Science and Engineering at Birla Institute of Technology, Mesra, graduating in 2027. I work as a Software Developer Intern at SkyGrid, where I own features end to end on a live multi-tenant HRMS and payroll platform: PostgreSQL schemas and migrations, Python and FastAPI services, and React/TypeScript screens.
            </p>
            <p>
                Outside work, I build agent-facing APIs with LLM tool calling and solve algorithm problems on LeetCode and GeeksforGeeks.
            </p>
        </div>

        <h3 className="mb-10 text-center font-heading text-2xl font-bold text-theme-heading md:text-3xl">Education</h3>

        <Timeline items={education} heading="h4" />
    </Section>
);
