import LayoutWrapper from "@neoWeb/components/LayoutWrapper";
import PageNotFound from "@neoWeb/components/LayoutWrapper/PageNotFound";
import { lazy } from "react";
import BeneficiaryDetails from "../Authorized/BeneficiaryDetails";
import { NAVIGATION_ROUTES } from "./navigationRoutes";

const Dashboard = lazy(() => import("@neoWeb/pages/Authorized/Dashboard"));
const Services = lazy(() => import("@neoWeb/pages/Authorized/Services"));
const SendMoney = lazy(() => import("@neoWeb/pages/Authorized/SendMoney"));
const KycInformation = lazy(
  () => import("@neoWeb/pages/Authorized/KYCInformation")
);

const Transaction = lazy(
  () => import("@neoWeb/pages/Authorized/Transaction History")
);
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
        path: NAVIGATION_ROUTES.TRANSACTION_HISTORY,
        element: <Transaction />
      },
      {
        path: NAVIGATION_ROUTES.KYC_INFORMATION,
        element: <KycInformation />
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  }
];
