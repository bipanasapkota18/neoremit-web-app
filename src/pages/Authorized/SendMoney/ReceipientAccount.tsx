import { Card, HStack, Text } from "@chakra-ui/react";
import RecipientAccountCard from "@neoWeb/components/Beneficiary/RecipientAccountCard";
import GoBack from "@neoWeb/components/Button";
import { useGetBeneficiaryById } from "@neoWeb/services/service-beneficiary";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Dispatch, SetStateAction } from "react";
import { ISendMoneyForm } from "./SendMoney";

interface IReceipientAccountProps extends ISendMoneyForm {
  beneficiaryId: number;
  setBeneficiaryAccountId: Dispatch<SetStateAction<number | undefined>>;
}
const ReceipientAccount = ({
  setPageName,
  beneficiaryId,
  setBeneficiaryAccountId
}: IReceipientAccountProps) => {
  const { data } = useGetBeneficiaryById(beneficiaryId);
  return (
    <Card padding={"24px"} gap={"16px"} width={"100%"}>
      <Text fontSize={"17px"} fontWeight={700} color={colorScheme.gray_700}>
        Select Receipient
      </Text>
      <RecipientAccountCard
        data={data}
        setPageName={setPageName}
        setBeneficiaryAccountId={setBeneficiaryAccountId}
      />
      <HStack justifyContent={"space-between"}>
        <GoBack onClick={() => setPageName("selectRecipient")} />
      </HStack>
    </Card>
  );
};

export default ReceipientAccount;
