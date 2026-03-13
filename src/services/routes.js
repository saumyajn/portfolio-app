import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { lazy, Suspense } from 'react';

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
        errorElement:  withLoader(Page404),
        children: [
             {
                index: true,
                element: <MainPortfolio />
            },
            {
                path: '/python',
                element: withLoader(UtilitiesDashboard)
            },
            {
                path: '/python/treasure-island',
                element: withLoader(lazy(() => import('../utilities/components/commonFullApp'))),
                loader: () => ({
                    title: "Treasure Island",
                    description: "Welcome to the Treasure Island adventure game! Your quest to find the hidden treasure begins here",
                    pythonFile: "treasure_island.py"
                })
            },
            {
                path: '/python/hangman',
                element: withLoader(lazy(() => import('../utilities/components/commonFullApp'))),
                loader: () => ({
                    title: "Hangman",
                    description: "A classic word-guessing game where you guess letters to identify the hidden word before running out of attempts. Enjoy the challenge and have fun playing Hangman!",
                    pythonFile: "hangman/hangman.py",
                    dependencies: [
                        { path: "hangman/hangman_art.py", name: "hangman_art.py" },
                        { path: "hangman/hangman_words.py", name: "hangman_words.py" }
                    ]
                })
            }

        ],
    },
]);
export default router;