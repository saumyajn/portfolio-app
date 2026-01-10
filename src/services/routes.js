import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Page404 from '../components/Error';
import MainPortfolio from '../components/MainPortfolio'; // 👈 Import the new component
import { lazy, Suspense } from 'react';
import Loader from '../components/Loader';
// 1. Lazy Load your new "Python Lab" Dashboard
// Since the file is named index.jsx inside src/utilities, we just import the folder
const UtilitiesDashboard = lazy(() => import('../utilities'));

const withLoader = (Component) => (
    <Suspense fallback={<Loader message="Loading App..." />}>
        <Component />
    </Suspense>
);
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // Wraps everything
        errorElement: <Page404 />,
        children: [
            { 
                index: true, 
                element: <MainPortfolio /> // Shows your scrollable Home/About/Projects
            },
            { 
                path: '/python', 
                element: withLoader(UtilitiesDashboard) 
            },
            
        ],
    },
]);
export default router;