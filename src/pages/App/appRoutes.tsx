import LayoutWrapper from "@neoWeb/components/LayoutWrapper";
import PageNotFound from "@neoWeb/components/LayoutWrapper/PageNotFound";
import { lazy } from "react";
import BeneficiaryDetails from "../Authorized/BeneficiaryDetails";
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
      {
        path: NAVIGATION_ROUTES.SEND_MONEY,
        element: <SendMoney />
      },
      {
        path: NAVIGATION_ROUTES.BENEFICIARY,
        element: <BeneficiaryDetails />
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  }
];
