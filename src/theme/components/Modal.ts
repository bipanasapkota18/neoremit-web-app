import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: "rgba(0, 0, 0, 0.50)" //change the background
  },
  dialog: {
    borderRadius: "32px",
    padding: 4
  }
});

export const modalConfig = defineMultiStyleConfig({
  baseStyle
});
