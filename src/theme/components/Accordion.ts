import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { colorScheme } from "../colorScheme";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const custom = definePartsStyle({
  panel: {
    marginTop: "6px",
    padding: "8px 16px",
    background: `${colorScheme.gray_100}`,
    borderRadius: "full"
  },
  button: {
    padding: "16px",
    background: `${colorScheme.gray_50}`,
    borderRadius: "full",
    _hover: {
      background: "gray.100"
    },
    _expanded: {
      "& > svg": {
        transform: "rotate(90deg)"
      }
    }
  }
});

export const AccordionConfig = defineMultiStyleConfig({
  variants: { custom }
});
