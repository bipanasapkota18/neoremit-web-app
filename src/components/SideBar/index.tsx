import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { useLogoutMutation } from "@neoWeb/services/service-auth";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { categorizedNavlinks } from "@neoWeb/utility/helper";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { navLinks } from "./navLinks";

interface SidebarProps {
  isCollapsed?: boolean;
  animate: string;
  onEnterSidebar?: () => void;
  onExitSidebar?: () => void;
  isHovered?: boolean;
  labelSideData?: string | number;
}

export const parentNavRoutes = {
  account: "/account"
};

export default function Sidebar({
  isCollapsed,
  animate,
  onEnterSidebar,
  onExitSidebar,
  isHovered
}: SidebarProps) {
  const [activeLink, setActiveLink] = useState("");
  const [activeCollapse, setActiveCollapse] = useState("");
  const { mutateAsync: logout, isPending } = useLogoutMutation();

  // const { initData } = useStoreInitData();

  // parentNavList includes the collapsable sidebar elements so that when reloading we can check for and highlight the parent of selected link
  const parentNavList = [{ nav: "Account", url: parentNavRoutes.account }];

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
  }, [window.location.pathname]);

  const labelData = [{ navName: "Example", value: 10 }];

  const pendingSidebarLabels = (barName: string) => {
    const navLabelValue = labelData?.find(item => item.navName == barName);
    if (navLabelValue) {
      return navLabelValue.value ?? null;
    }
  };

  const allNavlinks = categorizedNavlinks(navLinks);

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex
      w={"292px"}
      p={6}
      height={"88vh"}
      bg="white"
      borderRadius={"24px"}
      transition={animate}
      position={"sticky"}
      top={"73px"}
    >
      <VStack
        w="100%"
        as="nav"
        gap={3}
        transition="all 0.25s ease-in-out"
        onMouseEnter={onEnterSidebar}
        onMouseLeave={onExitSidebar}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <VStack
          w="100%"
          css={{
            scrollbarGutter: "stable",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.2rem",
              position: "absolute",
              transitionDuration: "all 2s"
            },
            "&::-webkit-scrollbar-track": {
              position: "absolute",
              background: colorScheme.white,
              opacity: 0.2
            },
            "&::-webkit-scrollbar-thumb": {
              background: colorScheme.purple_100,
              borderRadius: 20
            }
          }}
        >
          {allNavlinks.map((group, index) => {
            return (
              <HStack alignItems={"flex"} wrap={"wrap"} key={index}>
                <Text
                  textStyle={"normalStyle"}
                  fontSize={"14px"}
                  fontWeight={600}
                >
                  {group.header}
                </Text>
                {group?.links.map(nav => {
                  return (
                    <NavItem
                      {...nav}
                      labelSideData={
                        pendingSidebarLabels(nav.label ?? "") ?? null
                      }
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
              </HStack>
            );
          })}
        </VStack>
        <Box>
          <Button
            width={isCollapsed && !isHovered ? "" : "240px"}
            onClick={handleLogout}
            background={colorScheme.logout_button}
            _hover={{ background: colorScheme.logout_button }}
            borderRadius={"8px"}
            isDisabled={isPending}
          >
            <HStack>
              <HStack>
                <Icon as={svgAssets.Logout} height={"24px"} width={"24px"} />
                <HStack>
                  <Text
                    color={"#E53E3E"}
                    fontSize="12px"
                    fontWeight={400}
                    whiteSpace="nowrap"
                    display={isCollapsed && !isHovered ? "none" : "block"}
                    transition={animate}
                  >
                    LOGOUT
                  </Text>
                </HStack>
              </HStack>
            </HStack>
          </Button>
          <Text
            mt={2}
            color={colorScheme.sideBar_text}
            fontWeight={400}
            textAlign={"center"}
          >
            Copyright Neo Money Transfer
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
}
