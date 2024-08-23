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
  },
  beneficiaryCardHeader: {
    fontSize: "14px",
    fontWeight: 600,
    color: colorScheme.gray_700,
    wordBreak: "break-all"
  },
  beneficiaryCardSubHeader: {
    fontSize: "14px",
    fontWeight: 400,
    color: colorScheme.normalTextColor
  },
  paymentDetailsHeader: {
    fontSize: "14px",
    fontWeight: 700,
    color: colorScheme.gray_700
  },
  cardText: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#F7FAFC"
  },
  transaction_date: {
    fontSize: "12px",
    fontWeight: 400,
    color: colorScheme.sideBar_text
  }
};
