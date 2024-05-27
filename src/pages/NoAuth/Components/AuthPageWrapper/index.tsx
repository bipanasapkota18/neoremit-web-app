import { Center, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import useWindowSize from "@neoWeb/hooks/useWindowResize";
import React from "react";

interface IChildrenType {
  children: React.ReactNode;
  hasSideDiv?: boolean;
  screen?: string;
  isPassword?: boolean;
}
const AuthPageWrapper = ({ children, hasSideDiv = true }: IChildrenType) => {
  const window = useWindowSize();
  hasSideDiv = window.width > 768 ? hasSideDiv : false;
  return (
    <Center
      position="relative"
      height="100vh"
      maxWidth={"100%"}
      backgroundImage={hasSideDiv ? `url(${imageAssets.BgBackdropImage}) ` : ""}
      backgroundPosition={"100% 100%"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
    >
      <Stack
        zIndex={1}
        gap={0}
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        margin="0 auto"
        padding={"42px, 64px, 42px, 64px"}
        borderRadius={"16px"}
        minWidth="1240px"
      >
        {hasSideDiv ? (
          <>
            <HStack
              width="48%"
              py={16}
              px={{
                base: 14,
                "2xl": 20
              }}
              flexDir={"column"}
              gap={12}
            >
              <Stack gap={4} alignItems={"flex-start"}>
                <Image src={imageAssets.Logo} />
                <HStack flexDir={"column"} alignItems={"flex-start"}>
                  <Text textStyle={"boldText"}>
                    Fast and Secure Money Transfers
                  </Text>
                  <Text textStyle={"normalStyle"}>
                    Experience the speed and security of international money
                    transfers with Neo Money Transfer. Your money, your way its
                    that simple
                  </Text>
                </HStack>
              </Stack>
              <svgAssets.Banner />
            </HStack>

            <VStack
              borderRadius={24}
              boxShadow="4px 0px 26px 0px rgba(0, 0, 0, 0.06)"
              alignItems={"stretch"}
              gap={8}
              maxWidth={"500px"}
              p={10}
            >
              {children}
            </VStack>
          </>
        ) : (
          <Stack
            borderRadius={24}
            boxShadow="4px 0px 26px 0px rgba(0, 0, 0, 0.06)"
            alignItems={"stretch"}
            gap={8}
            maxWidth={"500px"}
            p={10}
          >
            {children}
          </Stack>
        )}
      </Stack>
    </Center>
  );
};

export default AuthPageWrapper;
