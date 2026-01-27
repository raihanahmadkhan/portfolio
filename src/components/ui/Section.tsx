import { type HTMLAttributes, type FC } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
    container?: boolean;
}

export const Section: FC<SectionProps> = ({
    children,
    className = '',
    container = true,
    ...props
}) => {
    return (
        <section
            className={`py-20 relative overflow-hidden ${className}`}
            {...props}
        >
            {container ? (
                <div className="container mx-auto px-4 z-10 relative">
                    {children}
                </div>
            ) : children}
        </section>
    );
};
