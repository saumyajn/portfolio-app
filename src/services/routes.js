import { lazy, Suspense } from 'react';
import Layout from '../components/Layout'
import Page404 from '../components/Error';
import { createBrowserRouter } from 'react-router-dom';
//lazy loading
const Home = lazy(() => import('../components/Home'));
const AboutMe = lazy(() => import('../components/AboutMe'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));


const withSuspense = (Component) => (
    <Suspense fallback={<div className="container">LOADING...</div>}>
        <Component />
    </Suspense>
)
const routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout />
        ),
        errorElement: <Page404 />,
        children: [
            { index: true, element: withSuspense(Home) },
            { path: "/about", element: withSuspense(AboutMe) },
            { path: "/projects", element: withSuspense(Projects) },
            { path: "/contact", element: withSuspense(Contact) },
        ],
    },
]);
export default routes;