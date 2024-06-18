import { sidebarSvg } from "@neoWeb/assets/images/svgs/Sidebar";
import { ComponentProps } from "react";
import { NAVIGATION_ROUTES } from "./../../pages/App/navigationRoutes";
import NavItem from "./NavItem";

export const navLinks = [
  {
    icon: sidebarSvg.Home,
    href: NAVIGATION_ROUTES.HOME,
    label: "Home",
    header: "MENUS"
  },
  {
    icon: sidebarSvg.User,
    href: NAVIGATION_ROUTES.ACCOUNT,
    label: "Account",
    header: "MENUS",
    isNotLink: true,
    childNav: [
      {
        icon: sidebarSvg.Ellipse,
        href: NAVIGATION_ROUTES.ACCOUNT.KYC_INFORMATION,
        label: "Kyc Information"
      }
    ]
  },
  {
    icon: sidebarSvg.User,
    href: NAVIGATION_ROUTES.SERVICES,
    label: "Services",
    header: "MENUS"
  },
  {
    icon: sidebarSvg.UserIcon,
    href: NAVIGATION_ROUTES.SEND_MONEY,
    label: "Send Money",
    header: "MENUS"
  },
  {
    icon: sidebarSvg.UserIcon,
    href: NAVIGATION_ROUTES.BENEFICIARY,
    label: "Beneficiary",
    header: "MENUS"
  },

  {
    icon: sidebarSvg.Transaction,
    href: NAVIGATION_ROUTES.TRANSACTION_HISTORY,
    label: "Transaction History",
    header: "MENUS"
  },
  {
    icon: sidebarSvg.settings,
    href: NAVIGATION_ROUTES.SETTINGS,
    label: "Settings",
    header: "MENUS"
  },

  {
    icon: sidebarSvg.UserIcon,
    href: NAVIGATION_ROUTES.SUPPORT,
    label: "Support",
    header: "NEO"
  },
  {
    icon: sidebarSvg.Transaction,
    href: NAVIGATION_ROUTES.CONTACT,
    label: "Contact",
    header: "NEO"
  },
  {
    icon: sidebarSvg.settings,
    href: NAVIGATION_ROUTES.NEO_SETTINGS,
    label: "Settings",
    header: "NEO"
  }

  // {
  //   icon:sidebarSvg.User,
  //   href:NAVIGATION_ROUTES.LOGOUT,
  //   label:"logout",
  //   header:"NEO"
  // }

  // {
  //   icon: FaIcons,
  //   href: NAVIGATION_ROUTES.COLLAPSE,
  //   label: "Collapse",
  //   isNotLink: true,
  //   childNav: [
  //     {
  //       icon: FaIcons,
  //       href: NAVIGATION_ROUTES.DASHBOARD,
  //       label: "Dashboard"
  //     }
  //   ]
  // },
  // {
  //   icon: FaIcons,
  //   href: NAVIGATION_ROUTES.EXAMPLE,
  //   label: "Example",
  //   header: "NEO"
  // }
] as ComponentProps<typeof NavItem>[];
