import {
  Button,
  Card,
  Center,
  HStack,
  SimpleGrid,
  Spinner,
  Text
} from "@chakra-ui/react";
import RecipientCard from "@neoWeb/components/Beneficiary/RecipientCard";
import GoBack from "@neoWeb/components/Button";
import { useGetBeneficiary } from "@neoWeb/services/service-beneficiary";
import { PageParams } from "@neoWeb/services/Support/service-faq";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ISendMoneyForm } from "./SendMoney";

interface IReceipientAccountProps extends ISendMoneyForm {
  setBeneficiaryId: Dispatch<SetStateAction<number | null>>;
  setNewTransfer: Dispatch<SetStateAction<boolean>>;
}
const Recipient = ({
  setPageName,
  setBeneficiaryId,
  setNewTransfer
}: IReceipientAccountProps) => {
  const [pageParams] = useState<PageParams>({
    pageIndex: 0,
    pageSize: 30
  });

  const { data, mutateAsync, isPending } = useGetBeneficiary();
  useEffect(() => {
    mutateAsync({ pageParams, filterParams: {} });
  }, [pageParams]);
  return (
    <Card padding={"24px"} gap={"16px"}>
      <Text fontSize={"17px"} fontWeight={700} color={colorScheme.gray_700}>
        Select Receipient
      </Text>
      {isPending ? (
        <Center height={"50vh"}>
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <SimpleGrid columns={2} gap={4}>
          {data?.data?.data?.beneficiaryDetailList.map((item, index) => {
            return (
              <RecipientCard
                setBeneficiaryId={setBeneficiaryId}
                setPageName={setPageName}
                id={item?.id}
                fullName={item?.fullName}
                address={item?.address}
                mobileNumber={item?.mobileNumber}
                profileImage={item?.profileImage}
                relationship={item?.relationship?.name}
                key={index}
              />
            );
          })}
        </SimpleGrid>
      )}
      <HStack justifyContent={"space-between"}>
        <GoBack onClick={() => setPageName("sendMoney")} />

        <Button
          onClick={() => {
            setNewTransfer(true);
            setPageName("paymentDetails");
          }}
          variant="send_money"
        >
          Make New Transfer
        </Button>
      </HStack>
    </Card>
  );
};

export default Recipient;
