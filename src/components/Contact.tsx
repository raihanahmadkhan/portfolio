import { useEffect, useState } from 'react';
import { site } from '../data/site';
import { Button } from './ui/Button';
import { CheckIcon, CopyIcon } from './ui/icons';
import { Section, SectionHeading } from './ui/Section';

export const Contact = () => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 2000);
        return () => window.clearTimeout(timer);
    }, [copied]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
        } catch {
            window.location.href = `mailto:${site.email}`;
        }
    };

    return (
        <Section id="contact" aria-labelledby="contact-title" className="pool-water pool-edge pt-24 text-center md:pt-28">
            <SectionHeading id="contact-title" title="Get in Touch" rule={false}>
                <p className="mt-6 text-lg text-theme-secondary">
                    For roles, projects or questions about my work, email is the fastest way to reach me.
                </p>
            </SectionHeading>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button href={`mailto:${site.email}`} size="lg">
                    Send an email
                </Button>
                <Button href={site.linkedin} external variant="outline" size="lg">
                    Connect on LinkedIn
                </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="break-all font-mono text-sm text-theme-heading sm:text-base">{site.email}</span>
                <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 rounded border border-theme px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-theme-heading transition-colors hover:border-theme-accent hover:bg-theme-accent/10"
                >
                    {copied ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
                    {copied ? 'Copied' : 'Copy'}
                    <span className="sr-only"> email address</span>
                </button>
                <span role="status" className="sr-only">{copied ? 'Email address copied to clipboard' : ''}</span>
            </div>
        </Section>
    );
};
