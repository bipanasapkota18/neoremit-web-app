import { Flex, Image, VStack } from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { navLinks } from "./navLinks";

interface SidebarProps {
  width: number;
  isCollapsed: boolean;
  animate: string;
  onEnterSidebar: () => void;
  onExitSidebar: () => void;
  isHovered: boolean;
  labelSideData?: string | number;
}

export const parentNavRoutes = {
  collapse: "/collapse"
};

export default function Sidebar({
  width,
  isCollapsed,
  animate,
  onEnterSidebar,
  onExitSidebar,
  isHovered
}: SidebarProps) {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const [activeCollapse, setActiveCollapse] = useState("");

  // const { initData } = useStoreInitData();

  // parentNavList includes the collapsable sidebar elements so that when reloading we can check for and highlight the parent of selected link
  const parentNavList = [{ nav: "Collaple", url: parentNavRoutes.collapse }];

  // This useEffect sets the active sidebar link whether it is a normal link or a collapsable link or it is a child of collapsable link
  // activeCollapse checks if the url contains the parentNavList item eg http://example.com/clients/add -> here the url inclides /clients so clients is selected
  // active link selects the label from an object inside navLinks where the current window url includes the href from that object
  // if else is used to fix issue swhel reloading
  useEffect(() => {
    const url = window.location.href;
    setActiveCollapse(
      parentNavList?.find(item => url.includes(item.url))?.nav ?? ""
    );
    if (window.location.pathname == "/") {
      setActiveLink(
        navLinks?.find(item => url.includes(item.href))?.label ?? ""
      );
    } else {
      setActiveLink(
        navLinks?.find(item => item.href != "/" && url.includes(item.href))
          ?.label ?? ""
      );
    }
  }, []);

  const labelData = [{ navName: "Example", value: 10 }];

  const pendingSidebarLabels = (barName: string) => {
    const navLabelValue = labelData?.find(item => item.navName == barName);
    if (navLabelValue) {
      return navLabelValue.value ?? null;
    }
  };

  return (
    <Flex
      pos="fixed"
      top={0}
      h="100%"
      w={width + "px"}
      maxW={width + "px"}
      bg="white"
      transition={animate}
      zIndex={isHovered ? 11 : 10}
    >
      <VStack
        w="100%"
        as="nav"
        gap={3}
        transition="all 0.25s ease-in-out"
        onMouseEnter={onEnterSidebar}
        onMouseLeave={onExitSidebar}
      >
        <Image
          maxW="50%"
          h="50px"
          alt={"mofin-logo"}
          src={imageAssets.Logo}
          objectFit="contain"
          m="auto"
          mt={4}
          mb={7}
          cursor={"pointer"}
          onClick={() => navigate("/")}
        />
        <VStack
          w="100%"
          css={{
            scrollbarGutter: "stable",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.6rem",
              position: "absolute",
              transitionDuration: "all 2s"
            },
            "&::-webkit-scrollbar-track": {
              position: "absolute",
              background: colorScheme.white,
              opacity: 0.1
            },
            "&::-webkit-scrollbar-thumb": {
              background: colorScheme.purple_100,
              borderRadius: 20
            }
          }}
        >
          {navLinks.map(nav => {
            return (
              <NavItem
                {...nav}
                labelSideData={pendingSidebarLabels(nav.label ?? "") ?? null}
                key={nav.href}
                collapsed={isCollapsed && !isHovered}
                animate={animate}
                active={{
                  activeLink,
                  setActiveLink,
                  activeCollapse,
                  setActiveCollapse
                }}
              />
            );
          })}
        </VStack>
      </VStack>
    </Flex>
  );
}
