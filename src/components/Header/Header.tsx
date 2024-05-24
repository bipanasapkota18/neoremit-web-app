import { Box, Container, HStack, Stack } from "@chakra-ui/react";

import * as React from "react";

import { colorScheme } from "@neoWeb/theme/colorScheme";
import { LeftHeader } from "./Header.Left";
import { RightHeader } from "./Header.Right";

export type HeaderAnchor = null | Element | ((element: Element) => Element);

const mobileMenuId = "primary-search-account-menu-mobile";

const Header = () => {
  // const { initData } = useStoreInitData();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<HeaderAnchor>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  return (
    <Box
      bg={colorScheme.white}
      py={4}
      boxShadow="0px 4px 28px 0px rgba(0, 0, 0, 0.06)"
    >
      <Container>
        <HStack>
          <LeftHeader />
          <Stack
            direction={"row"}
            sx={{ flexGrow: 1 }}
            px={3}
            justifyContent="flex-end"
            alignItems="center"
          ></Stack>
          <RightHeader
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            isMobileMenuOpen={isMobileMenuOpen}
            mobileMenuId={mobileMenuId}
            handleMobileMenuClose={handleMobileMenuClose}
          />
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
