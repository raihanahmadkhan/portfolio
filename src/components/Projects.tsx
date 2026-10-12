import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowRightIcon } from './ui/icons';
import { Section, SectionHeading } from './ui/Section';

const VISIBLE_TECH = 4;

export const Projects = () => (
    <Section id="projects" aria-labelledby="projects-title" className="wall-shadow-r">
        <SectionHeading id="projects-title" title="Projects" />

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
                <li key={project.slug}>
                    <article className="card card-interactive group relative flex h-full flex-col p-5 sm:p-6">
                        <div className="mb-5 aspect-video overflow-hidden rounded-md border border-theme bg-theme-main">
                            <img
                                src={project.image.src}
                                alt={project.image.alt}
                                loading="lazy"
                                decoding="async"
                                className={`h-full w-full object-cover ${project.image.focus === 'center' ? 'object-center' : 'object-top'}`}
                            />
                        </div>

                        {project.period && (
                            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-theme-accent">{project.period}</p>
                        )}
                        <h3 className="font-heading text-2xl font-bold text-theme-heading">
                            <Link to={`/project/${project.slug}`} className="after:absolute after:inset-0 after:rounded-lg">
                                {project.name}
                            </Link>
                        </h3>
                        <p className="mt-1 font-heading text-sm font-bold text-theme-muted">{project.tagline}</p>
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-theme-secondary">{project.description}</p>

                        <ul aria-label="Technologies" className="mb-5 mt-5 flex flex-wrap gap-2">
                            {project.tech.slice(0, VISIBLE_TECH).map(tech => (
                                <li key={tech} className="chip font-mono text-xs">{tech}</li>
                            ))}
                            {project.tech.length > VISIBLE_TECH && (
                                <li className="px-1 py-1 font-mono text-xs leading-5 text-theme-muted">+{project.tech.length - VISIBLE_TECH} more</li>
                            )}
                        </ul>

                        <span aria-hidden="true" className="btn btn-outline btn-sm mt-auto w-full">
                            View project
                            <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                        </span>
                    </article>
                </li>
            ))}
        </ul>
    </Section>
);
