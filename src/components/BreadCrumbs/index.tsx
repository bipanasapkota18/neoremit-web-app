import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon
} from "@chakra-ui/react";
import { sidebarSvg } from "@neoWeb/assets/images/svgs/Sidebar";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { colorScheme } from "@neoWeb/theme/colorScheme";

interface PagesInterface {
  pageName: string;
  href?: string;
  isCurrentPage?: boolean;
}
interface BreadCrumbsProps {
  pages: PagesInterface[];
}
const BreadCrumbs = ({ pages }: BreadCrumbsProps) => {
  return (
    <Breadcrumb
      pl={2}
      separator={
        <Icon pt={1.5} height={"30px"} w={"20px"} as={sidebarSvg.Ellipse} />
      }
    >
      <BreadcrumbItem gap={1}>
        <Icon
          as={sidebarSvg.Home}
          h={"20px"}
          w={"20px"}
          color={colorScheme.normalTextColor}
        />
        <BreadcrumbLink
          color={colorScheme.normalTextColor}
          href={NAVIGATION_ROUTES.HOME}
          fontWeight={500}
          fontSize={"14px"}
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pages.map((page, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink
            fontWeight={500}
            fontSize={"14px"}
            color={
              page?.isCurrentPage
                ? colorScheme.primary_500
                : colorScheme.normalTextColor
            }
            href={page?.href}
          >
            {page?.pageName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
