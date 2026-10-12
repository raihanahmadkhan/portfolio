import { Section, SectionHeading } from './ui/Section';
import { Timeline } from './ui/Timeline';

const experiences = [
    {
        title: 'Software Developer Intern',
        subtitle: 'SkyGrid LLC · Dubai, UAE (Remote)',
        period: 'Aug 2026 – Present',
        detail: 'Built Benefits Configuration end to end: 50 FastAPI endpoints, 17 PostgreSQL tables, 6 Alembic migrations and 4 React/TypeScript configuration screens. Developed reusable eligibility and calculation engines covering 11 eligibility fields, 22 field/operator combinations and 5 formula node types.',
    },
    {
        title: 'Software Developer Intern',
        subtitle: 'Nucelux Private Limited · New Delhi, India (Remote)',
        period: 'Mar 2026 – Jul 2026',
        detail: 'Delivered 12 modules and about 100 endpoints for SkyGrid, an enterprise HRMS and payroll platform. Built Final Settlement, Variable Earnings bulk upload and Air Ticket Processing with journal vouchers. Re-architected the monthly roster, introduced frontend testing infrastructure, audited role-based access controls, resolved migration and CI issues, and wrote about 4,100 lines of engineering documentation.',
    },
    {
        title: 'Full Stack Developer Intern',
        subtitle: 'Zidio Development · Bengaluru, India (Remote)',
        period: 'Mar 2025 – Apr 2025',
        detail: 'Led frontend development for FinTrak using React and Material UI. Built Spring Boot REST APIs with MySQL, JWT authentication and Chart.js analytics dashboards.',
    },
];

const skills = {
    Languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL'],
    'Backend & LLM': ['FastAPI', 'SQLAlchemy', 'Alembic', 'Pydantic', 'REST APIs', 'LLM tool calling'],
    Frontend: ['React', 'Material UI', 'Tailwind CSS'],
    Databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
    DevOps: ['Docker', 'Git', 'GitHub Actions', 'Linux'],
    'Auth & Testing': ['Keycloak', 'OAuth2', 'Playwright', 'pytest'],
};

export const Experience = () => (
    <Section id="experience" aria-labelledby="experience-title">
        <SectionHeading id="experience-title" title="Experience" />

        <Timeline items={experiences} heading="h3" className="mb-20" />

        <h3 className="mb-10 text-center font-heading text-2xl font-bold text-theme-heading md:text-3xl">Skills</h3>

        <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, items]) => (
                <li key={category} className="card p-6">
                    <h4 className="mb-4 border-b border-theme pb-2 font-heading text-lg font-bold text-theme-heading">{category}</h4>
                    <ul className="flex flex-wrap gap-2">
                        {items.map(skill => (
                            <li key={skill} className="chip">{skill}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </Section>
);
