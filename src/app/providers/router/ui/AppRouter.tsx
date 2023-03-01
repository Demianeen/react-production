import { AboutPage } from "pages/AboutPage";
import { HomePage } from "pages/HomePage";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) =>
          <Route key={path} path={path} element={element} />)}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
