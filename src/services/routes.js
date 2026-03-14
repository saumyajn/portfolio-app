import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { lazy, Suspense } from 'react';

export const fullApps = [
  {
    id: "complexity-analyzer",
    title: "Big-O Code Analyzer",
    description: "Paste your Python script to analyze its algorithmic Time Complexity.",
    path: "/python/complexity-analyzer",
    scriptPath: "/complexity-analyzer.py", 
    inputs: []
  }
];
const MainPortfolio = lazy(() => import('../components/MainPortfolio'));
const Page404 = lazy(() => import('../components/Error'));
const UtilitiesDashboard = lazy(() => import('../utilities'));

const withLoader = (Component) => (
    <Suspense fallback={<Loader message="Loading App..." />}>
        <Component />
    </Suspense>
);
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: withLoader(Page404),
        children: [
            {
                index: true,
                element: <MainPortfolio />
            },
            {
                path: '/python',
                element: withLoader(UtilitiesDashboard)
            }
        ],
    },
]);
export default router;