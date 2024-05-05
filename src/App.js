import "./App.css";
import Box from "@mui/material/Box";

import Home from "./components/home";

import AboutMe from "./components/about-me";
import Projects from "./components/passion-projects";
// import useLocation from 'react-router'
// import styles from "./styles/header.module.css";
// import lightCover1 from "./images/layered-wave-pink.png";
// import lightCover2 from "./images/layered-wave-blue.png";
// import lightCover3 from "./images/layered-wave-green.png";
// import lightCover4 from "./images/layered-wave-orange.png";

import darkCover1 from "./images/dark-waves-pink.png";
import darkCover2 from "./images/dark-waves-blue.png";
import darkCover3 from "./images/dark-waves-green.png";
import darkCover4 from "./images/dark-waves-orange.png";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Contact from "./components/contact-me";
import { Suspense, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./components/error";

function App() {
  const [img, setImg] = useState(darkCover1);
  // const [path, setPath] = useState("/");
  // state to manage the dark mode
  // const [toggleDarkMode, setToggleDarkMode] = useState(true);
  // const toggleDarkTheme = () => {
  //   setToggleDarkMode(!toggleDarkMode);
  // };
  // applying the primary and secondary theme colors
  const darkTheme = createTheme({
    palette: {
      mode: "dark", // handle the dark mode state on toggle

      // primary: {
      //   main: "#90caf9",
      // },
      // secondary: {
      //   main: "#131052",
      // },
    },
  });
  useEffect(() => {
    handlePath(localStorage.getItem("path"));
  });
  const handlePath = (data) => {

    switch (data) {
      case "/":
        setImg(darkCover1);
        break;

      case "/about-me":
        setImg(darkCover2);
        break;

      case "/projects":
        setImg(darkCover3);
        break;

      case "/contact":
        setImg(darkCover4);
        break;
      default:
        setImg(darkCover1);
        break;
    }
  };
  const routes = createBrowserRouter([
    {
      element: (
        <>
          {" "}
          <ThemeProvider theme={darkTheme}>
            {/* <Switch
              name="dark"
              className={styles.switchBox}
              checked={toggleDarkMode}
              onChange={toggleDarkTheme}
            /> */}
            <Layout appPathCall={handlePath} />{" "}
          </ThemeProvider>
        </>
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
          height: "fit-content",
          color: "secondary",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Suspense fallback={<div className="container">LOADING...</div>}>
          <RouterProvider forceRefresh={true} router={routes} />
        </Suspense>
      </Box>
    </div>
  );
}

export default App;
