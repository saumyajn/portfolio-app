import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Page404 from '../components/Error';
import MainPortfolio from '../components/MainPortfolio'; // 👈 Import the new component

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
            // 🔮 FUTURE APPS WILL GO HERE:
            // { path: 'apps/weather', element: <WeatherApp /> },
        ],
    },
]);
export default router;