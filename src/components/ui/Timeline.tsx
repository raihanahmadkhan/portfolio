interface TimelineItem {
    title: string;
    subtitle: string;
    period: string;
    detail: string;
}

interface TimelineProps {
    items: TimelineItem[];
    heading: 'h3' | 'h4';
    className?: string;
}

export const Timeline = ({ items, heading: Heading, className = '' }: TimelineProps) => (
    <div className={`relative mx-auto max-w-4xl ${className}`}>
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-theme-accent/25 md:block" />

        <ol className="space-y-8">
            {items.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                    <li key={`${item.title}-${item.period}`} className="relative md:grid md:grid-cols-2 md:items-center md:gap-16">
                        <span
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme-accent ring-4 ring-theme-main md:block"
                        />
                        <div className={`card p-6 ${isLeft ? '' : 'md:col-start-2'}`}>
                            <Heading className="font-heading text-xl font-bold text-theme-heading">{item.title}</Heading>
                            <p className="mt-1 font-bold text-theme-accent">{item.subtitle}</p>
                            <p className="mt-2 font-mono text-xs text-theme-muted md:hidden">{item.period}</p>
                            <p className="mt-3 text-sm leading-relaxed text-theme-secondary">{item.detail}</p>
                        </div>
                        <p
                            className={`hidden font-heading text-sm font-bold uppercase tracking-widest text-theme-muted md:block ${isLeft ? '' : 'md:col-start-1 md:row-start-1 md:text-right'}`}
                        >
                            {item.period}
                        </p>
                    </li>
                );
            })}
        </ol>
    </div>
);
