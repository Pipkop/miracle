import { Outlet, Route, Routes } from "react-router-dom";
import { useMiniApp, useViewport } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { Home } from "./Home";
import { Mine } from "./Mine";
import { Shop } from "./Shop";
import { Navbar } from "./Components";
import { Analitics } from "./Analitics";

export const BaseRoutes = () => {
  const miniApp = useMiniApp();
  const viewport = useViewport();

  useEffect(() => {
    miniApp.ready();
    viewport.expand();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="h-screen w-screen flex flex-col">
            <Outlet />
            <Navbar />
          </div>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="mine/:mine" element={<Mine />} />
        <Route path="store" element={<Shop />} />
        <Route path="analitics" element={<Analitics />} />
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};
