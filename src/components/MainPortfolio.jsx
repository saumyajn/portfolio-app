import  { lazy, Suspense } from 'react';
import Loader from './Loader';
// Lazy load the sections to keep performance high
const Home = lazy(() => import('./Home'));
const AboutMe = lazy(() => import('./AboutMe'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));

export default function MainPortfolio() {
    return (
        <Suspense fallback={<Loader message="Initializing Portfolio..." />}>
            <div id="home" style={{ scrollSnapAlign: 'start' }}><Home /></div>
            <div id="about" style={{ scrollSnapAlign: 'start' }}><AboutMe /></div>
            <div id="projects" style={{ scrollSnapAlign: 'start' }}><Projects /></div>
            <div id="contact" style={{ scrollSnapAlign: 'start' }}><Contact /></div>
        </Suspense>
    );
}