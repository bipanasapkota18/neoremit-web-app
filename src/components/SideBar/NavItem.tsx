/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  chakra,
  Collapse,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { sidebarSvg } from "@neoWeb/assets/images/svgs/Sidebar";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { NavLink } from "react-router-dom";

export interface NavItemProps {
  header: string;
  icon?: any;
  href: string;
  code?: string;
  label: string;
  animate: string;
  collapsed?: boolean;
  isNotLink?: boolean;
  accessor: string[];
  childNav?: NavItemProps[];
  isChild?: boolean;
  parentNav?: string;
  labelSideData?: number | null;
  active?: {
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
    activeCollapse: string;
    setActiveCollapse: Dispatch<SetStateAction<string>>;
  };
}

const notActiveLink = {
  background: colorScheme.white,
  "& p": {
    color: "gray.500"
  },
  "& div": {
    "& > svg > path": {
      fillOpacity: "gray.500"
    },
    "& > div > svg > path": {
      stroke: "none"
    }
  },
  "& > div:first-of-type": {
    visibility: "hidden"
  },
  "&:hover": {
    background: colorScheme.primary_400,
    color: colorScheme.white,
    "& p": {
      color: colorScheme.white
    },
    "svg > *": {
      filter: "brightness(10)"
    },
    "& > div:first-of-type": {
      visibility: "visible"
    }
  }
};

export default function NavItem({
  icon,
  href,
  label,
  labelSideData,
  animate,
  collapsed,
  isNotLink,
  childNav,
  parentNav,
  isChild,
  active
}: NavItemProps) {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const Link = chakra(NavLink);

  useEffect(() => {
    if (label != active?.activeCollapse && active?.activeCollapse != "") {
      onClose();
    } else if (isNotLink && label == active?.activeCollapse) onOpen();
  }, [active?.activeCollapse]);

  const handleNavLinkClick = (e: React.MouseEvent) => {
    if (isNotLink) {
      e.preventDefault();
      onToggle();
    } else {
      if (isChild) {
        active?.setActiveCollapse(parentNav ?? "");
      } else {
        active?.setActiveCollapse("");
      }
      active?.setActiveLink(label);
    }
  };

  const isLinkActive =
    isNotLink &&
    ((isOpen && active?.activeCollapse !== label) ||
      (!isOpen && active?.activeCollapse !== label));

  return (
    <Fragment>
      <Link
        as={NavLink}
        end={!isNotLink}
        to={isNotLink ? "#" : href}
        onClick={handleNavLinkClick}
        __css={
          active?.activeLink == label &&
          (window.location.pathname == "/"
            ? false
            : window.location.href.includes(href))
            ? {
                // background: colorScheme.primary_500,
                "& p": {
                  color: colorScheme.white
                },
                "svg > *": {
                  filter: "brightness(10)"
                }
              }
            : {
                "&:hover": {
                  borderRadius: 10,
                  fontWeight: 700,
                  background: isChild ? "white" : colorScheme.primary_500,
                  color: isChild ? colorScheme.primary_500 : colorScheme.white,
                  "& p": {
                    color: isChild ? colorScheme.primary_500 : colorScheme.white
                  },
                  "svg > *": {
                    filter: isChild ? "inherit" : "brightness(10)"
                  }
                }
              }
        }
        _activeLink={
          isLinkActive
            ? notActiveLink
            : {
                borderRadius: 10,
                background: isChild ? "white" : colorScheme.primary_500,
                "& p": {
                  color: isChild ? colorScheme.primary_500 : colorScheme.white,
                  fontWeight: 700
                },
                "svg > *": {
                  transform: isChild ? "scale(1.1)" : "none",
                  filter: isChild ? "inherit" : "brightness(10)",
                  ...(isChild ? { fill: colorScheme.primary_500 } : {})
                }
              }
        }
        pos="relative"
        px={4}
        py={3}
        w="100%"
        _hover={{
          textDecoration: "none"
        }}
      >
        <Box
          visibility="hidden"
          pos="absolute"
          h="100%"
          w={1}
          top={0}
          right={0}
          bg={colorScheme.purple_100}
          borderTopLeftRadius={10}
          borderBottomLeftRadius={10}
        />

        <HStack justifyContent="space-between">
          <HStack alignItems="center" flex={1}>
            {icon && <Icon as={icon} fontSize="xl" />}
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
            >
              <Text
                color={colorScheme.gray_500}
                textStyle={"normalStyle"}
                fontSize={"14px"}
                whiteSpace="nowrap"
                visibility={collapsed ? "hidden" : "visible"}
                transition={animate}
              >
                {label}
              </Text>
              {labelSideData && (
                <Box
                  sx={{
                    w: "30px",
                    h: "25px",
                    textAlign: "center",
                    background: colorScheme.yellow_400,
                    color: colorScheme.purple_800,
                    fontWeight: "bold",
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {labelSideData}
                </Box>
              )}
            </HStack>
          </HStack>
          {isNotLink && (
            <Icon
              as={sidebarSvg.ArrowRight}
              height={"20px"}
              width={"20px"}
              color="gray.500"
              transform={isOpen ? "rotate(90deg)" : ""}
            />
          )}
        </HStack>
      </Link>
      <Collapse
        animate
        in={isOpen && !collapsed}
        style={{
          width: "100%",
          overflow: "visible",
          margin: "0px",
          padding: "10px 0px"
        }}
      >
        <VStack m="auto">
          {childNav?.map((child, index) => (
            <NavItem
              {...child}
              key={`child-nav${index}`}
              isChild
              active={active}
              parentNav={label}
            />
          ))}
        </VStack>
      </Collapse>
    </Fragment>
  );
}
