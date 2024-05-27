import { Box, Container, Flex, Image, Stack } from "@chakra-ui/react";
import AppBar from "@neoWeb/components/Header/AppBar";
import Header from "@neoWeb/components/Header/Header";
import { Suspense } from "react";

import { imageAssets } from "@neoWeb/assets/images";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundry";
import Sidebar from "../SideBar";

const sidebarAnimate = "all .25s ease";

const LayoutWrapper: React.FC = () => {
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
          <Container>
            <Box display={"flex"} gap={6} w="full">
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
                <Stack flex={1}>
                  <Outlet />
                </Stack>
              </Suspense>
            </Box>
          </Container>
        </Flex>
      </Flex>
    </ErrorBoundary>
  );
};

export default LayoutWrapper;
