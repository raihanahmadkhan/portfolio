import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const NotFound = () => {
    useDocumentTitle('Page not found');

    return (
        <>
            <main id="main" className="flex flex-1 items-center justify-center px-4 pb-16 pt-32 text-center">
                <div className="max-w-md">
                    <p className="font-mono text-sm uppercase tracking-widest text-theme-accent">Error 404</p>
                    <h1 className="mt-4 font-heading text-4xl font-bold text-theme-heading md:text-5xl">Page not found</h1>
                    <p className="mt-4 text-lg text-theme-secondary">
                        This page does not exist or has moved.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Button to="/">Back to home</Button>
                        <Button to="/#projects" variant="outline">View projects</Button>
                    </div>
                </div>
            </main>
            <Footer edge />
        </>
    );
};
