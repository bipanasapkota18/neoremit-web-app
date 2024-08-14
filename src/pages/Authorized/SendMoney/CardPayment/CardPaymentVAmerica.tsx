import {
  Button,
  Card,
  Center,
  HStack,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import GoBack from "@neoWeb/components/Button";
import SendMoneyView from "@neoWeb/components/MoneyView";
import {
  useAddFundingAccount,
  useGetAllFundingAccount
} from "@neoWeb/services/service-funding-account";
import { useFundingAccountStore } from "@neoWeb/store/SendMoney";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { toastFail, toastSuccess } from "@neoWeb/utility/Toast";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ISendMoneyForm } from "../SendMoney";

const CardPaymentVAmerica = ({ setPageName }: ISendMoneyForm) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending, refetch } = useGetAllFundingAccount();

  const { data: addData } = useAddFundingAccount();
  const { setFundingData } = useFundingAccountStore();

  useEffect(() => {
    if (searchParams?.get("status") === "error") {
      toastFail("Failed to add account. Please try again later.");
    } else {
      toastSuccess("Account added successfully.");
      refetch();
    }
  }, [searchParams]);

  const addCardDetails = (paymentId: string) => {
    const selectedAccount = data?.find(item => item?.idPayment === paymentId);
    setFundingData(selectedAccount);
    searchParams.delete("page");
    searchParams.delete("status");
    setSearchParams(searchParams);
    setPageName("paymentConfirmation");
  };

  window.onfocus = function () {
    refetch();
  };
  return (
    <>
      <Card as={"form"} padding={"24px"} gap={"16px"}>
        <Text fontSize={"17px"} fontWeight={700} color={colorScheme.gray_700}>
          Account Details
        </Text>
        <SendMoneyView />
        {isPending ? (
          <Center height={"50vh"}>
            <Spinner size={"xl"} />
          </Center>
        ) : (
          <HStack wrap={"wrap"} gap={4}>
            {data?.map((item, index) => {
              return (
                <Stack
                  key={index}
                  width={"280px"}
                  borderRadius={"16px"}
                  background={colorScheme.gray_100}
                  padding={"24px"}
                  position={"relative"}
                  overflow={"hidden"}
                  zIndex={1}
                  cursor={"pointer"}
                  onClick={() => {
                    addCardDetails(item?.idPayment);
                  }}
                >
                  <Stack gap={4} zIndex={1}>
                    <HStack justifyContent={"space-between"}>
                      <Text color={colorScheme.gray_500}>Bank Name</Text>
                      <Text
                        color={colorScheme.gray_700}
                        fontSize={"14px"}
                        fontWeight={600}
                      >
                        {item?.BankName}
                      </Text>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                      <Text color={colorScheme.gray_500}>Account Name</Text>
                      <Text
                        color={colorScheme.gray_700}
                        fontSize={"14px"}
                        fontWeight={600}
                      >
                        {item?.name}
                      </Text>
                    </HStack>
                  </Stack>
                </Stack>
              );
            })}
          </HStack>
        )}{" "}
        <HStack justifyContent={"space-between"}>
          <GoBack
            onClick={() => {
              searchParams.delete("page");
              searchParams.delete("status");
              setSearchParams(searchParams);
              setPageName("paymentDetails");
            }}
          />

          <HStack>
            <Button
              variant="send_money"
              // onClick={onOpen}
              onClick={() => window.open(addData?.redirectUrl, "_self")}
            >
              Add Payment Account
            </Button>

            {/* <Button onClick={addCardDetails} variant="send_money">
            Proceed to Payment
          </Button> */}
          </HStack>
        </HStack>
      </Card>
      {/* <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent maxW={"1200px"}>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              src={addData?.redirectUrl}
              title="W3Schools Free Online Web Tutorials"
              style={{ width: "100%", height: "700px", border: "none" }}
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default CardPaymentVAmerica;
