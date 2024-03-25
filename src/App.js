import "./App.css";
import Box from "@mui/material/Box";

import Home from "./components/home";

import AboutMe from "./components/about-me";
import Projects from "./components/passion-projects";
import cover from "./images/layered-wave-orange.png";
import cover1 from "./images/layered-wave-pink.png";
import cover2 from "./images/layered-wave-blue.png";
import cover3 from "./images/layered-wave-green.png";
import Contact from "./components/contact-me";
import { Suspense, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./components/error";

function App() {
  const [img, setImg] = useState(cover1);
  const handleBack = (data) => {
    console.log(data);
    switch (data) {
      case "/":
        setImg(cover1);
        break;

      case "/about-me":
        setImg(cover2);
        break;

      case "/projects":
        setImg(cover3);
        break;

      case "/contact":
        setImg(cover);
        break;

      default:
        setImg(cover1);
        break;
    }
    console.log(img);
  };
  const routes = createBrowserRouter([
    {
      element: <Layout appCallBack={handleBack} />,
      errorElement: <Page404 />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about-me", element: <AboutMe /> },
        { path: "/projects", element: <Projects /> },
        { path: "/contact", element: <Contact /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <Box
        sx={{
          backgroundImage: `url(${img})`,
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
