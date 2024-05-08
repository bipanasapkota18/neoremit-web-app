import LayoutWrapper from "@neoWeb/components/LayoutWrapper";
import { lazy } from "react";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const Dashboard = lazy(() => import("@neoWeb/pages/Authorized/Dashboard"));
const Home = lazy(() => import("@neoWeb/pages/Authorized/Home"));

export const appRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: NAVIGATION_ROUTES.HOME,
        element: <Home />
      }
    ]
  }
];
