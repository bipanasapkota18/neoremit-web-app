import { Box, Flex, Image } from "@chakra-ui/react";
import AppBar from "@neoWeb/components/Header/AppBar";
import Header from "@neoWeb/components/Header/Header";
import { Suspense } from "react";

import { imageAssets } from "@neoWeb/assets/images";
import useWindowSize from "@neoWeb/hooks/useWindowResize";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundry";
import Sidebar from "../SideBar";

const sidebarAnimate = "all .25s ease";

const LayoutWrapper: React.FC = () => {
  const window = useWindowSize();
  const noMarginWindow = window.width < 1920 ? "full" : "1240";
  return (
    <ErrorBoundary>
      <Flex direction="column" gap={5}>
        <AppBar p={0} position="sticky">
          <Header />
        </AppBar>
        <Flex
          // flexDir={"column"}
          gap={5}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box display={"flex"} maxW={noMarginWindow} gap={6}>
            <Sidebar animate={sidebarAnimate} />
            <Suspense
              fallback={
                <Flex
                  justifyContent={"center"}
                  alignItems="center"
                  height={"90vh"}
                >
                  <Image maxHeight={"50vh"} src={imageAssets.Loader} />
                </Flex>
              }
            >
              <Box width={"948px"}>
                <Outlet />
              </Box>
            </Suspense>
          </Box>
        </Flex>
      </Flex>
    </ErrorBoundary>
  );
};

export default LayoutWrapper;
