import { Section, SectionHeading } from './ui/Section';

const activities = [
    {
        role: 'Google Student Ambassador',
        org: 'Google',
        period: 'Aug 2025 – Dec 2025',
        description: 'Delivered hands-on AI workshops to 300+ students.',
    },
    {
        role: 'General Secretary',
        org: 'Aakshar Literary Society',
        period: '2025',
        description: 'Directed 15+ campus events for the society.',
    },
    {
        role: 'School Captain',
        org: 'Holy Cross School',
        period: '2020–2022',
        description: 'Led the student council of a school with 1,000+ students and coordinated school-wide events.',
    },
];

export const Extracurricular = () => (
    <Section id="extracurricular" aria-labelledby="extracurricular-title" className="border-t border-theme bg-theme-card">
        <SectionHeading id="extracurricular-title" title="Leadership" />

        <ol className="mx-auto max-w-3xl space-y-6 border-l border-theme-accent/25 pl-6 md:pl-8">
            {activities.map(activity => (
                <li key={activity.role} className="relative">
                    <span
                        aria-hidden="true"
                        className="absolute -left-6 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-theme-accent ring-4 ring-theme-card md:-left-8"
                    />
                    <div className="rounded-lg border border-theme bg-theme-main/60 p-4 sm:p-5">
                        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
                            <h3 className="font-heading text-lg font-bold text-theme-heading">{activity.role}</h3>
                            <p className="shrink-0 font-mono text-xs uppercase tracking-widest text-theme-muted">{activity.period}</p>
                        </div>
                        <p className="mt-1 text-sm font-bold text-theme-accent">{activity.org}</p>
                        <p className="mt-1 text-sm leading-relaxed text-theme-secondary">{activity.description}</p>
                    </div>
                </li>
            ))}
        </ol>
    </Section>
);
