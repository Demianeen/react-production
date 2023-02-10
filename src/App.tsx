import React, { Suspense, useContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { HomePageAsync } from "./pages/HomePage/HomePage.async";
import "./styles/index.scss";
import { useTheme } from "./theme/useTheme";
import { classNames } from './helpers/classNames/classNames'

const App = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className={
      classNames(
        'app',
        {},
        [theme]
      )
    }>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <button onClick={toggleTheme}>Toggle</button>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path={"/about"} element={<AboutPageAsync />} />
          <Route path={"/"} element={<HomePageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
