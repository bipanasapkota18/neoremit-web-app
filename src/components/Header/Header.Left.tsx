import { Flex, Image } from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { useNavigate } from "react-router-dom";

export const LeftHeader = () => {
  const navigate = useNavigate();

  return (
    <Flex align="center">
      <Image
        p={2}
        alt={"mofin-logo"}
        src={imageAssets.Logo}
        objectFit="contain"
        // ml="340px"
        cursor={"pointer"}
        onClick={() => navigate("/")}
      />
    </Flex>
  );
};
