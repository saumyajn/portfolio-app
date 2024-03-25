import "./App.css";
import Box from "@mui/material/Box";

import Home from "./components/home";

import AboutMe from "./components/about-me";
import Projects from "./components/passion-projects";
import cover from "./images/layered-wave1.png";
import Contact from "./components/contact-me";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./components/error";
const routes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about-me", element: <AboutMe /> },
      { path: "/projects", element: <Projects /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <Box
        sx={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Suspense fallback={<div className="container">LOADING...</div>}>
        <RouterProvider router={routes} />
        </Suspense>
      </Box>
    </div>
  );
}

export default App;
