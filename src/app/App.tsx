import React, { Suspense, useContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AboutPage } from "pages/AboutPage";
import { HomePage } from "pages/HomePage";

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
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/"} element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
