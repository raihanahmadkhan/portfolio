import { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Competitive } from '../components/Competitive';
import { Extracurricular } from '../components/Extracurricular';
import { Contact } from '../components/Contact';

export const Home = () => {
    useEffect(() => {
        const scrollTarget = sessionStorage.getItem('scrollToSection');
        if (scrollTarget) {
            sessionStorage.removeItem('scrollToSection');
            setTimeout(() => {
                const section = document.getElementById(scrollTarget);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    return (
        <>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Competitive />
            <Extracurricular />
            <Contact />
        </>
    );
};
