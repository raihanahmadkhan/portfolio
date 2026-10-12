import { Button } from './ui/Button';
import { PoolScene } from './ui/PoolScene';
import { Section } from './ui/Section';

export const Hero = () => (
    <Section
        id="home"
        aria-labelledby="home-title"
        container={false}
        className="hero-sky flex min-h-svh items-center justify-center pb-[calc(var(--band-h)+2rem)] pt-24"
    >
        <PoolScene />

        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-theme-muted sm:text-sm sm:tracking-[0.3em] md:text-base">
                Software Engineer
            </p>

            <h1 id="home-title" className="mt-6 font-heading text-5xl font-black tracking-tight text-theme-heading md:text-7xl lg:text-8xl">
                Raihan Ahmad
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-theme-secondary md:text-xl">
                Final-year Computer Science student at BIT Mesra, building HRMS and payroll software at SkyGrid.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button to="/#projects" size="lg">
                    View projects
                </Button>
                <Button to="/#contact" variant="outline" size="lg">
                    Get in touch
                </Button>
            </div>
        </div>
    </Section>
);
