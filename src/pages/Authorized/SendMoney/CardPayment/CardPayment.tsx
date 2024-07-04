import {
  Box,
  Button,
  Card,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useBoolean
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import GoBack from "@neoWeb/components/Button";
import CheckBox from "@neoWeb/components/Form/Checkbox";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import SendMoneyView from "@neoWeb/components/MoneyView";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { ISelectOptions } from "@neoWeb/utility/format";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ISendMoneyForm } from "../SendMoney";

const defaultValues = {
  cardType: null as ISelectOptions<string> | null,
  nameOnCard: "",
  cardNumber: "",
  expiryDate: "",
  securityCode: "",
  postalCode: "",
  saveCard: false,
  primaryCard: false
};
const CardPayment = ({ setPageName }: ISendMoneyForm) => {
  const [flag, setFlag] = useBoolean();

  const schema = z.object({
    cardType: z
      .object({
        label: z.string().min(1),
        value: z.number().min(0)
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please Select Card Type"
      }),
    nameOnCard: z.string().min(1, { message: "Name on card is required" }),
    cardNumber: z.string().min(1, { message: "Card Number is required" }),
    expiryDate: z.string().min(1, { message: "Expiry date is required" }),
    securityCode: z.string().min(1, { message: "Security code is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
    saveCard: z.boolean().optional(),
    primaryCard: z.boolean().optional()
  });
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(schema)
  });
  const cardDetails = [
    {
      cardType: "Master Card",
      cardNumber: "1234 5678 9101 1121",
      cardHolderName: "Ram Prasad",
      expiryDate: "06/21"
    },
    {
      cardType: "Visa Card",
      cardNumber: "1234 5678 9101 1121",
      cardHolderName: "Bin Laden",
      expiryDate: "09/11"
    }
  ];

  const cardTypeOptions = [
    {
      label: "Master Card",
      value: "MASTER_CARD"
    },
    {
      label: "Visa Card",
      value: "VISA_CARD"
    }
  ];

  const addCardDetails = () => {
    setPageName("paymentConfirmation");
  };
  return (
    <Card
      as={"form"}
      onSubmit={handleSubmit(addCardDetails)}
      padding={"24px"}
      gap={"16px"}
    >
      <>
        <Text fontSize={"17px"} fontWeight={700} color={colorScheme.gray_700}>
          {flag ? "Card Details" : "Card Payment"}
        </Text>

        <SendMoneyView />
      </>
      {flag ? (
        <SimpleGrid columns={2} gap={6} p={2}>
          <GridItem>
            <Select
              name="cardType"
              control={control}
              placeholder="Select Card Type"
              options={cardTypeOptions}
            />
          </GridItem>
          <GridItem>
            <TextInput
              type="text"
              name="nameOnCard"
              control={control}
              label="Name on Card"
            />
          </GridItem>
          <GridItem>
            <TextInput
              type="text"
              name="cardNumber"
              control={control}
              label="Card Number"
            />
          </GridItem>{" "}
          <GridItem>
            <TextInput
              type="date"
              name="expiryDate"
              control={control}
              label="Expiry Date"
            />
          </GridItem>{" "}
          <GridItem>
            <TextInput
              type="text"
              name="securityCode"
              control={control}
              label="Security Code"
            />
          </GridItem>{" "}
          <GridItem>
            <TextInput
              type="text"
              name="postalCode"
              control={control}
              label="Postal Code"
            />
          </GridItem>
          <GridItem pl={2} display={"flex"} justifyContent={"space-between"}>
            <CheckBox
              control={control}
              name="saveCard"
              label="Save Card Detail"
              defaultChecked={false}
            />
            <CheckBox
              control={control}
              name="primaryCard"
              label="Make it Primary Card"
              defaultChecked={false}
            />
          </GridItem>
        </SimpleGrid>
      ) : (
        <>
          <HStack>
            {cardDetails?.map((item, index) => {
              return (
                <Stack
                  key={index}
                  width={"318px"}
                  borderRadius={"16px"}
                  background="linear-gradient(251deg, #45187A 10.68%, #5A2F8D 49.45%, #6D4898 69.19%, #8465A9 100%)"
                  padding={"24px"}
                  position={"relative"}
                  overflow={"hidden"}
                  zIndex={1}
                >
                  <Box
                    sx={{
                      zIndex: 0,
                      opacity: "90%",
                      background:
                        "linear-gradient(180deg, rgb(90, 47, 141) 0.01%, rgb(124, 90, 165) 100%)",
                      height: "200px",
                      width: "200px",
                      borderRadius: "full",
                      position: "absolute",
                      right: "-37px",
                      bottom: "-71px",
                      _after: {
                        content: "''",
                        opacity: 0.3,
                        position: "absolute",
                        width: "260px",
                        height: "260px",
                        borderRadius: "257px",
                        background:
                          "linear-gradient(180deg, rgb(62.84, 7.5, 128.56) 0%, rgb(129, 96, 168) 100%)",
                        right: "-57px",
                        bottom: "-10px"
                      }
                    }}
                  />
                  <Box
                    sx={{
                      opacity: "90%",
                      height: "70px",
                      width: "70px",
                      background:
                        " linear-gradient(220deg, rgba(90, 47, 141, 0.30) 22.97%, rgba(90, 47, 141, 0.15) 77.75%)",
                      borderRadius: "full",
                      position: "absolute",
                      left: "-7%",
                      bottom: "-9%",
                      _after: {
                        content: "''",
                        opacity: "10%",
                        position: "absolute",
                        width: "100px",
                        height: "100px",
                        borderRadius: "100px",
                        background:
                          "linear-gradient(208deg, #3F0781 17.19%, #8160A8 88.3%)",
                        left: "-32%",
                        bottom: "-8%"
                      }
                    }}
                  />
                  <Stack gap={"26px"} zIndex={1}>
                    <HStack justifyContent={"space-between"}>
                      <Box>
                        <Text textStyle={"cardText"}>{item?.cardType}</Text>
                      </Box>
                      <Icon
                        as={svgAssets.MasterCardLogo}
                        width={"50px"}
                        height={"30px"}
                      />
                    </HStack>
                    <Box textStyle={"cardText"}>{item?.cardNumber}</Box>
                    <HStack justifyContent={"space-between"}>
                      <Text textStyle={"cardText"}>{item?.cardHolderName}</Text>
                      <Text textStyle={"cardText"}>{item?.expiryDate}</Text>
                    </HStack>
                  </Stack>
                </Stack>
              );
            })}
            <Box
              padding={"55px"}
              background="#EDF2F7"
              borderRadius={"16px"}
              width={"318px"}
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Icon
                as={svgAssets.AddCircle}
                width={"50px"}
                height={"50px"}
                color={"#718096"}
              />
              <Text textStyle={"normalStyle"} fontWeight={500}>
                Add Card
              </Text>
            </Box>
          </HStack>
        </>
      )}
      <HStack justifyContent={"space-between"}>
        <GoBack onClick={() => setPageName("paymentDetails")} />

        <HStack>
          {!flag && (
            <Button
              bg={"white"}
              border={"1px solid #E2E8F0"}
              _hover={{ bg: "#EDF2F7" }}
              color={colorScheme.primary_500}
              onClick={() => setFlag.on()}
            >
              Add Card
            </Button>
          )}
          {flag ? (
            <Button type="submit" variant="send_money">
              Confirm
            </Button>
          ) : (
            <Button onClick={addCardDetails} variant="send_money">
              Proceed to Payment
            </Button>
          )}
        </HStack>
      </HStack>
    </Card>
  );
};

export default CardPayment;
