import { ComponentStyleConfig } from "@chakra-ui/react";

export const ContainerConfig: ComponentStyleConfig = {
  baseStyle: {
    margin: "auto",
    width: "1300px",
    maxW: { sm: "95vw", md: "85vw", lg: "80vw" },
    w: "100%",
    px: 8
  },
  variants: {},

  defaultProps: {
    variant: "default"
  }
};
