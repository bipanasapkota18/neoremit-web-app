import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useBoolean
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import BeneficiaryCard from "@neoWeb/components/Beneficiary/BeneficiaryCard";
import { useGetBeneficiary } from "@neoWeb/services/service-beneficiary";
import { useState } from "react";
import AddBeneficiary from "./AddBeneficiary";
const Beneficiary = () => {
  const { data: benefeciaryData } = useGetBeneficiary();
  const [flag, setFlag] = useBoolean();
  const [editId, setEditId] = useState<number | null>(null);

  return (
    <Flex direction={"column"}>
      {!flag ? (
        <Card background={"#FEFEFE"} borderRadius="24px" alignItems={"center"}>
          <CardBody
            display={"flex"}
            flexDir={"column"}
            alignItems={benefeciaryData?.length === 0 ? "center" : "flex-end"}
            width={"100%"}
            gap={4}
          >
            {benefeciaryData?.length === 0 ? (
              <>
                {" "}
                <Stack
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={8}
                  padding={6}
                >
                  <Icon
                    as={svgAssets.NoBeneficiary}
                    height={"287px"}
                    w={"343px"}
                  />
                  <Flex flexDir={"column"} gap={2} alignItems={"center"}>
                    <Text fontSize={"17px"} fontWeight={"700"}>
                      No Data Available
                    </Text>
                    <Text fontSize={"14px"} fontWeight={"400"}>
                      It seems there is no content here yet.
                    </Text>
                  </Flex>
                </Stack>
              </>
            ) : (
              <VStack alignItems={"flex-start"} width={"100%"} gap={4}>
                <Heading fontSize={"24px"}>Beneficiary</Heading>
                <SimpleGrid
                  w={"100%"}
                  columns={{ base: 1, sm: 1, md: 1, lg: 2 }}
                  gap={4}
                >
                  {benefeciaryData?.map((item, index) => (
                    <BeneficiaryCard
                      setBeneficiaryEditId={setEditId}
                      setFlag={setFlag}
                      id={item?.id}
                      fullName={item?.fullName}
                      address={item?.address}
                      mobileNumber={item?.mobileNumber}
                      profileImage={item?.profileImage}
                      key={index}
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            )}
            <Button
              onClick={setFlag.on}
              minW={benefeciaryData?.length === 0 ? "45%" : "max-content"}
              py={"25px"}
            >
              Add Beneficiary
            </Button>
          </CardBody>
        </Card>
      ) : (
        <AddBeneficiary
          editBeneficiaryId={editId}
          setBeneficiaryEditId={setEditId}
          setFlag={setFlag}
        />
      )}
    </Flex>
  );
};

export default Beneficiary;
