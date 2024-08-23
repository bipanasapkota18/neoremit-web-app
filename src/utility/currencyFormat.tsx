import { Text } from "@chakra-ui/react";

export const currencyFormat = (value: number, returnValue?: boolean) => {
  const currency = Number(value?.toFixed(2));
  const toNepaliFormat = currency.toLocaleString("hi-IN");
  const formattedCurrency = toNepaliFormat.includes(".")
    ? toNepaliFormat.split(".")[1].length === 1
      ? toNepaliFormat.concat("0")
      : toNepaliFormat
    : toNepaliFormat.concat(".00");

  return returnValue ? (
    formattedCurrency
  ) : (
    <>
      <Text textAlign={"right"}>{formattedCurrency}</Text>{" "}
    </>
  );
};
//format amount to send with float
export const formatAmount = (amount: number | string) => {
  return Math.trunc(Number(amount) * Math.pow(10, 2)) / Math.pow(10, 2);
};
