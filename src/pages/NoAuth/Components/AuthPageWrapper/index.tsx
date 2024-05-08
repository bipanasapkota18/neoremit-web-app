import { Center, HStack, Image, Stack, VStack } from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import useWindowSize from "@neoWeb/hooks/useWindowResize";
import React from "react";

interface IChildrenType {
  children: React.ReactNode;
  hasSideDiv?: boolean;
  isPassword?: boolean;
  screen?: string;
}
const AuthPageWrapper = ({
  children,
  hasSideDiv = true,
  isPassword
}: IChildrenType) => {
  const window = useWindowSize();
  hasSideDiv = window.width > 768 ? hasSideDiv : false;
  return (
    <Center
      position="relative"
      backgroundColor="#F7FAFC"
      height="100vh"
      maxWidth={"100%"}
      // backgroundImage={hasSideDiv ? `url(${imageAssets.LoginBackground}) ` : ""}
      backgroundImage={hasSideDiv ? `url(${imageAssets.BgBackdropImage}) ` : ""}
      backgroundPosition={"100% 100%"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
    >
      <Stack
        zIndex={1}
        gap={0}
        direction="row"
        alignItems={hasSideDiv ? "center" : "flex-start"}
        justifyContent={hasSideDiv ? "center" : "left"}
        margin="0 auto"
        padding={"42px, 64px, 42px, 64px"}
        boxShadow={hasSideDiv ? "lg" : "none"}
        borderRadius={"16px"}
        maxWidth="1120px"
        bg="white"
      >
        {hasSideDiv ? (
          <>
            <HStack
              width="50%"
              py={16}
              px={{
                base: 14,
                "2xl": 20
              }}
            >
              <Image src={imageAssets.LoginBanner} />
            </HStack>
            <HStack>
              <svgAssets.Line height={"400px"} />
            </HStack>
            <VStack
              alignItems={"stretch"}
              gap={"32px"}
              width="50%"
              py={16}
              px={{
                base: 14,
                "2xl": 20
              }}
            >
              {!isPassword && (
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                >
                  <Image src={imageAssets.Logo} />
                </HStack>
              )}

              {children}
            </VStack>
          </>
        ) : (
          <Stack width="100%" p={16}>
            {children}
          </Stack>
        )}
      </Stack>
    </Center>
  );
};

export default AuthPageWrapper;
