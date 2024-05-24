import LayoutWrapper from "@neoWeb/components/LayoutWrapper";
import { lazy } from "react";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const Dashboard = lazy(() => import("@neoWeb/pages/Authorized/Dashboard"));
const Account = lazy(() => import("@neoWeb/pages/Authorized/Account"));
const Services = lazy(() => import("@neoWeb/pages/Authorized/Services"));
const SendMoney = lazy(() => import("@neoWeb/pages/Authorized/SendMoney"));
export const appRoutes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        path: NAVIGATION_ROUTES.HOME,
        element: <Dashboard />
      },
      {
        path: NAVIGATION_ROUTES.ACCOUNT,
        element: <Account />
      },
      {
        path: NAVIGATION_ROUTES.SERVICES,
        element: <Services />
      },
      //  SEND_MONEY: "/send-money",
      {
        path: NAVIGATION_ROUTES.SEND_MONEY,
        element: <SendMoney />
      }
    ]
  }
];
