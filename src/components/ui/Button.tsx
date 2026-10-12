import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface StyleProps {
    variant?: 'primary' | 'outline';
    size?: 'md' | 'lg';
    className?: string;
    children: ReactNode;
}

type LinkButtonProps = StyleProps & { to: string };
type AnchorButtonProps = StyleProps & { href: string; external?: boolean } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>;

type ButtonProps = LinkButtonProps | AnchorButtonProps;

export const Button = (props: ButtonProps) => {
    const { variant = 'primary', size = 'md', className = '', children, ...rest } = props;
    const classes = `btn btn-${variant} btn-${size} ${className}`;

    if ('to' in rest) {
        return (
            <Link to={rest.to} className={classes}>
                {children}
            </Link>
        );
    }

    const { external, ...anchor } = rest;
    return (
        <a className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...anchor}>
            {children}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
    );
};
