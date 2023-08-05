import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Home, NotFound } from "../Pages";
import { AppCanvas } from "./AppCanvas";
// import { Experiments } from "../Components";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppCanvas>
            <Outlet />
          </AppCanvas>
        }
      >
        <Route index element={<Home />} />
        {/* <Route path="alpha" element={<Experiments />} /> */}
        <Route path="404" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
