import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "24px",
    backfroundColor: "#FEFEFE"
  }
});

// const sizes = {
//   md: definePartsStyle({
//     container: {
//       borderRadius: "0px"
//     }
//   })
// };

export const CardConfig = defineMultiStyleConfig({ baseStyle });
