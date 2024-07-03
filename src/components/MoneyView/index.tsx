import { Box, Text } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import { useSendMoneyStore } from "@neoWeb/store/SendMoney";
import { useStoreInitData } from "@neoWeb/store/initData";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { currencyFormat, formatAmount } from "@neoWeb/utility/currencyFormat";

interface SendMoneyProps {
  amount?: number;
}

const SendMoneyView = ({ amount }: SendMoneyProps) => {
  const { initData } = useStoreInitData();
  const { sendMoneyData } = useSendMoneyStore();
  return (
    <Box
      w="full"
      pos="relative"
      backgroundColor={colorScheme.gray_100}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      overflow={"hidden"}
      gap={1}
      borderRadius={"8px"}
      padding={6}
    >
      <Text
        textStyle={"normalStyle"}
        color={colorScheme.sideBar_text}
        fontWeight={600}
      >
        Sending Amount
      </Text>
      <Text
        fontSize={"20px"}
        fontWeight={700}
        color={colorScheme.primary_500}
        display={"flex"}
        gap={1}
      >
        {initData?.sendingCountry?.currency?.symbol}
        {amount || amount === 0
          ? currencyFormat(+formatAmount(amount ?? 0))
          : sendMoneyData?.sendingAmount != undefined
            ? currencyFormat(+formatAmount(sendMoneyData?.sendingAmount ?? 0))
            : "0.00"}
      </Text>
      <Box sx={{ pos: "absolute", top: 7, right: -8 }}>
        <svgAssets.ArtifactFlower />
      </Box>
    </Box>
  );
};

export default SendMoneyView;
