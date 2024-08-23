import LayoutWrapper from "@neoWeb/components/LayoutWrapper";
import PageNotFound from "@neoWeb/components/LayoutWrapper/PageNotFound";
import { lazy } from "react";

import { NAVIGATION_ROUTES } from "./navigationRoutes";

const Dashboard = lazy(() => import("@neoWeb/pages/Authorized/Dashboard"));
const Services = lazy(() => import("@neoWeb/pages/Authorized/Services"));
const SendMoney = lazy(() => import("@neoWeb/pages/Authorized/SendMoney"));
const KycInformation = lazy(
  () => import("@neoWeb/pages/Authorized/KYCInformation")
);
const FAQs = lazy(() => import("@neoWeb/pages/Authorized/Support/FAQs"));
const Support = lazy(() => import("@neoWeb/pages/Authorized/Support/Support"));
const PrivacyPolicy = lazy(
  () => import("@neoWeb/pages/Authorized/Support/PrivacyPolicy")
);
const BeneficiaryDetails = lazy(
  () => import("@neoWeb/pages/Authorized/BeneficiaryDetails")
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
      // {
      //   path: NAVIGATION_ROUTES.ACCOUNT,
      //   element: <Account />
      // },
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
        path: NAVIGATION_ROUTES.FAQS,
        element: <FAQs />
      },
      {
        path: NAVIGATION_ROUTES.SUPPORT,
        element: <Support />
      },
      {
        path: NAVIGATION_ROUTES.PRIVACY_POLICY,
        element: <PrivacyPolicy />
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  }
];
