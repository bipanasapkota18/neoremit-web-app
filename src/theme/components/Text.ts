import { colorScheme } from "../colorScheme";

// 2. Define the new text styles
export const TextStyles = {
  normalStyle: {
    color: colorScheme.normalTextColor,
    fontSize: "17px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal"
  },
  loginPageHeader: {
    fontSize: "29px",
    fontWeight: "800",
    color: colorScheme.gray_800
  },
  boldText: {
    color: colorScheme.gray_800,
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal"
  }
  //   h2: {
  //     fontSize: ["36px", "48px"],
  //     fontWeight: "semibold",
  //     lineHeight: "110%",
  //     letterSpacing: "-1%"
  //   }
};
