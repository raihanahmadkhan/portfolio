import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { ArrowLeftIcon, ArrowRightIcon, ExternalIcon, GitHubIcon } from '../components/ui/icons';
import { Section } from '../components/ui/Section';
import { projects, type Project } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFound } from './NotFound';

type Screenshot = Project['image'];

const Screen = ({ image, fallbackCaption, eager = false }: { image: Screenshot; fallbackCaption: string; eager?: boolean }) => (
    <figure className="overflow-hidden rounded-lg border border-theme bg-theme-card shadow-xl">
        <figcaption className="flex items-center gap-1.5 border-b border-theme px-4 py-2.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--sun)]" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--pool)]" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-theme-accent" />
            <span className="ml-2 truncate font-mono text-xs text-theme-muted">{image.caption ?? fallbackCaption}</span>
        </figcaption>
        <img
            src={image.src}
            alt={image.alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className={`aspect-video w-full object-cover ${image.focus === 'center' ? 'object-center' : 'object-top'}`}
        />
    </figure>
);

const ProjectPage = ({ project, index }: { project: Project; index: number }) => {
    useDocumentTitle(`${project.name}: ${project.tagline}`);

    const previous = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    const caption = project.link ? new URL(project.link).hostname : project.name;

    return (
        <>
            <main id="main" className="flex-1">
                <Section className="wall-shadow-r pb-16 pt-28 md:pt-32">
                    <div className="mx-auto max-w-6xl">
                        <Link
                            to="/#projects"
                            className="group mb-8 inline-flex items-center gap-2 font-heading text-sm font-bold text-theme-secondary transition-colors hover:text-theme-accent"
                        >
                            <ArrowLeftIcon width={16} height={16} className="transition-transform group-hover:-translate-x-1" />
                            All projects
                        </Link>

                        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                            <div>
                                <p className="font-mono text-sm uppercase tracking-widest text-theme-accent">
                                    Project {String(index + 1).padStart(2, '0')}
                                    {project.period && ` · ${project.period}`}
                                </p>
                                <h1 className="mt-4 font-heading text-4xl font-black leading-tight text-theme-heading md:text-5xl lg:text-6xl">
                                    {project.name}
                                </h1>
                                <p className="mt-2 font-heading text-xl font-bold text-theme-muted md:text-2xl">{project.tagline}</p>
                                <p className="mt-6 text-lg leading-relaxed text-theme-secondary">{project.description}</p>

                                <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
                                    {project.tech.map(tech => (
                                        <li key={tech} className="chip font-mono text-xs">{tech}</li>
                                    ))}
                                </ul>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    {project.link && (
                                        <Button href={project.link} external size="lg">
                                            Live demo
                                            <ExternalIcon width={16} height={16} />
                                        </Button>
                                    )}
                                    {project.github && (
                                        <Button href={project.github} external variant={project.link ? 'outline' : 'primary'} size="lg">
                                            <GitHubIcon width={18} height={18} />
                                            Source code
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <Screen image={project.image} fallbackCaption={caption} eager />
                        </div>
                    </div>
                </Section>

                <Section className="border-y border-theme bg-theme-card">
                    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-theme-heading">Problem</h2>
                            <p className="mt-4 leading-relaxed text-theme-secondary">{project.problem}</p>
                        </div>
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-theme-heading">Solution</h2>
                            <p className="mt-4 leading-relaxed text-theme-secondary">{project.solution}</p>
                        </div>
                    </div>
                </Section>

                <Section>
                    <div className="mx-auto max-w-5xl">
                        <h2 className="retro-rule mb-12 text-center font-heading text-3xl font-bold text-theme-heading">Features</h2>
                        <ul className="grid gap-4 md:grid-cols-2">
                            {project.features.map(feature => (
                                <li key={feature} className="flex items-start gap-4 rounded-lg border border-theme bg-theme-card p-5">
                                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-theme-accent" />
                                    <span className="text-theme-secondary">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Section>

                {project.gallery && (
                    <Section className="pt-0">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-theme-heading">Screens</h2>
                            <div className="mx-auto grid max-w-3xl gap-8">
                                {project.gallery.map(image => (
                                    <Screen key={image.src} image={image} fallbackCaption={caption} />
                                ))}
                            </div>
                        </div>
                    </Section>
                )}

                <Section className="border-y border-theme bg-theme-card">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-theme-accent">Takeaways</h2>
                        <p className="mt-6 text-lg leading-relaxed text-theme-secondary md:text-xl">{project.learnings}</p>
                    </div>
                </Section>

                <nav aria-label="More projects" className="container mx-auto px-4 py-12 sm:px-6">
                    <div className="mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
                        <Link to={`/project/${previous.slug}`} className="group flex items-center gap-4 rounded-lg p-2">
                            <ArrowLeftIcon className="shrink-0 text-theme-muted transition-all group-hover:-translate-x-1 group-hover:text-theme-accent" />
                            <span>
                                <span className="block text-xs uppercase tracking-wider text-theme-muted">Previous</span>
                                <span className="block font-heading font-bold text-theme-heading transition-colors group-hover:text-theme-accent">{previous.name}</span>
                            </span>
                        </Link>

                        <Button to="/#projects" variant="outline" className="order-last md:order-none">
                            All projects
                        </Button>

                        <Link to={`/project/${next.slug}`} className="group flex items-center justify-end gap-4 rounded-lg p-2 text-right">
                            <span>
                                <span className="block text-xs uppercase tracking-wider text-theme-muted">Next</span>
                                <span className="block font-heading font-bold text-theme-heading transition-colors group-hover:text-theme-accent">{next.name}</span>
                            </span>
                            <ArrowRightIcon className="shrink-0 text-theme-muted transition-all group-hover:translate-x-1 group-hover:text-theme-accent" />
                        </Link>
                    </div>
                </nav>
            </main>
            <Footer edge />
        </>
    );
};

export const ProjectDetail = () => {
    const { slug } = useParams();
    const index = projects.findIndex(project => project.slug === slug);

    return index === -1 ? <NotFound /> : <ProjectPage project={projects[index]} index={index} />;
};
