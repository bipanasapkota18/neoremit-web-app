import { ComponentStyleConfig } from "@chakra-ui/react";

export const ContainerConfig: ComponentStyleConfig = {
  baseStyle: {
    margin: "auto",
    width: "1300px",
    maxW: { sm: "95vw", md: "90vw", lg: "85vw" },
    w: "100%",
    px: 8
  },
  variants: {},

  defaultProps: {
    variant: "default"
  }
};
