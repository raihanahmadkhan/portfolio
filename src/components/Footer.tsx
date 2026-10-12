import { site } from '../data/site';
import { GitHubIcon, LinkedInIcon, MailIcon } from './ui/icons';

const year = new Date().getFullYear();

const socialLinks = [
    { name: 'GitHub', href: site.github, icon: GitHubIcon, external: true },
    { name: 'LinkedIn', href: site.linkedin, icon: LinkedInIcon, external: true },
    { name: 'Email', href: `mailto:${site.email}`, icon: MailIcon, external: false },
];

export const Footer = ({ edge = false }: { edge?: boolean }) => (
    <footer className={`pool-floor px-4 pb-10 text-center ${edge ? 'pool-edge pt-14' : 'pt-4'}`}>
        <ul className="flex justify-center gap-4">
            {socialLinks.map(({ name, href, icon: Icon, external }) => (
                <li key={name}>
                    <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        aria-label={external ? `${name} (opens in a new tab)` : name}
                        title={name}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-theme text-theme-secondary transition-colors hover:border-theme-accent hover:bg-theme-accent hover:text-theme-on-accent"
                    >
                        <Icon />
                    </a>
                </li>
            ))}
        </ul>
        <p className="mt-8 font-mono text-sm text-theme-secondary">
            &copy; {year} {site.name}
        </p>
    </footer>
);
