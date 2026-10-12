import type { HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    container?: boolean;
}

export const Section = ({ children, className = '', container = true, ...props }: SectionProps) => (
    <section className={`section ${className}`} {...props}>
        {container ? <div className="container relative z-10 mx-auto px-4 sm:px-6">{children}</div> : children}
    </section>
);

interface SectionHeadingProps {
    id: string;
    title: string;
    children?: ReactNode;
    rule?: boolean;
}

export const SectionHeading = ({ id, title, children, rule = true }: SectionHeadingProps) => (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <h2 id={id} className={`font-heading text-4xl font-bold tracking-tight text-theme-heading md:text-5xl ${rule ? 'retro-rule' : ''}`}>
            {title}
        </h2>
        {children}
    </div>
);
