import { extendTheme } from "@chakra-ui/react";
import { FormComponent } from "./Form/Form";
import { RadioTheme } from "./Form/Radio";
import { colorScheme } from "./colorScheme";
import { ButtonConfig } from "./components/Button";
import { CardConfig } from "./components/Card";
import { CheckboxConfig } from "./components/Checkbox";
import { ContainerConfig } from "./components/Container";
import Input from "./components/Input";
import { modalConfig } from "./components/Modal";

import { CustomSteps } from "./components/Steps";
import Switch from "./components/Switch";
import { TableConfig } from "./components/Table";
import { TextStyles } from "./components/Text";
export { globalStyles } from "./global";

export const theme = extendTheme(
  {
    colors: {
      primary: {
        50: "#EFEAF4",
        100: "#CCBFDC",
        200: "#B39FCB",
        300: "#7B59A4",
        400: "#5A2F8D",
        500: "#5A2F8D",
        600: "#522B80",
        700: "#402164",
        800: "#321A4E",
        900: "#26143B"
      }
    },
    fonts: {
      heading: "Mulish",
      body: "Mulish"
    },
    textStyles: TextStyles,
    shadows: { outline: "0 0 0 3px var(--chakra-colors-purple-100)" },
    components: {
      Button: ButtonConfig,
      Input: Input,
      Table: TableConfig,
      Switch: Switch,
      Radio: RadioTheme,
      Container: ContainerConfig,
      Checkbox: CheckboxConfig,
      Card: CardConfig,
      Modal: modalConfig,
      Steps: CustomSteps
    },
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
      "2xl": "1536px"
    },
    styles: {
      global: {
        scrollbarGutter: "stable",
        "&::-webkit-scrollbar": {
          width: "0.2rem",
          height: "0.6rem",
          position: "absolute"
        },
        "&::-webkit-scrollbar-track": {
          position: "absolute",
          background: "#fff",
          opacity: 0.1
        },
        "&::-webkit-scrollbar-thumb": {
          background: colorScheme.scrollBar_100,
          borderRadius: 20
        }
      }
    }
  },
  FormComponent
);
