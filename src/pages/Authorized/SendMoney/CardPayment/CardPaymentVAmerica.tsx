import {
  Box,
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
import { ISendMoneyForm } from "../SendMoney";

const CardPaymentVAmerica = ({ setPageName }: ISendMoneyForm) => {
  const { data, isPending, refetch } = useGetAllFundingAccount();

  const { data: addData } = useAddFundingAccount();
  const { setFundingData } = useFundingAccountStore();

  const addCardDetails = (paymentId: string) => {
    const selectedAccount = data?.find(item => item?.idPayment === paymentId);
    setFundingData(selectedAccount);
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
                  background="linear-gradient(251deg, #45187A 10.68%, #5A2F8D 49.45%, #6D4898 69.19%, #8465A9 100%)"
                  padding={"24px"}
                  position={"relative"}
                  overflow={"hidden"}
                  zIndex={1}
                  cursor={"pointer"}
                  onClick={() => {
                    addCardDetails(item?.idPayment);
                  }}
                >
                  <Stack gap={"26px"} zIndex={1}>
                    <HStack justifyContent={"space-between"}>
                      <Box>
                        <Text textStyle={"cardText"}>{item?.BankName}</Text>
                      </Box>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                      <Text textStyle={"cardText"}>{item?.name}</Text>
                    </HStack>
                  </Stack>
                </Stack>
              );
            })}
          </HStack>
        )}{" "}
        <HStack justifyContent={"space-between"}>
          <GoBack onClick={() => setPageName("paymentDetails")} />

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
