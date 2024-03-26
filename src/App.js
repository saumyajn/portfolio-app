import "./App.css";
import Box from "@mui/material/Box";

import Home from "./components/home";

import AboutMe from "./components/about-me";
import Projects from "./components/passion-projects";

import lightCover1 from "./images/layered-wave-pink.png";
import lightCover2 from "./images/layered-wave-blue.png";
import lightCover3 from "./images/layered-wave-green.png";
import lightCover4 from "./images/layered-wave-orange.png";

import darkCover1 from "./images/dark-waves-pink.png";
import darkCover2 from "./images/dark-waves-blue.png";
import darkCover3 from "./images/dark-waves-green.png";
import darkCover4 from "./images/dark-waves-orange.png";
import Contact from "./components/contact-me";
import { Suspense, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./components/error";

function App() {
  const [img, setImg] = useState(lightCover1);
  const [theme, setTheme] = useState(null);
  const handleChangeTheme = (val) => {
    console.log(val);
    if (val) {
      setTheme("light");
    } else setTheme("dark");

    console.log(theme);
    handleBack(window.location.pathname);
  };
  const handleBack = (data) => {
    console.log(theme);
    switch (data) {
      case "/":
        theme === "light" ? setImg(lightCover1) : setImg(darkCover1);
        break;

      case "/about-me":
        theme === "light" ? setImg(lightCover2) : setImg(darkCover2);
        break;

      case "/projects":
        theme === "light" ? setImg(lightCover3) : setImg(darkCover3);
        break;

      case "/contact":
        theme === "light" ? setImg(lightCover4) : setImg(darkCover4);
        break;

      default:
        setImg(lightCover1);

        break;
    }
    console.log(img);
  };
  const routes = createBrowserRouter([
    {
      element: (
        <Layout appPathCall={handleBack} appChangeTheme={handleChangeTheme} />
      ),
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
