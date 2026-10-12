import { About } from '../components/About';
import { Competitive } from '../components/Competitive';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { Extracurricular } from '../components/Extracurricular';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';

export const Home = () => (
    <>
        <main id="main" className="flex-1">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Competitive />
            <Extracurricular />
            <Contact />
        </main>
        <Footer />
    </>
);
