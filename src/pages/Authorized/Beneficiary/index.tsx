import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { imageAssets } from "@neoWeb/assets/images";
import { useState } from "react";
import AddBeneficiary from "./AddBeneficiary";
const Beneficiary = () => {
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);

  const handleAddBeneficiaryClick = () => {
    setShowAddBeneficiary(true);
  };

  return (
    <Flex direction={"column"}>
      {!showAddBeneficiary ? (
        <Card borderRadius="24px" alignItems={"center"}>
          <CardBody>
            <Box
              style={{
                backgroundImage: `url(${imageAssets.BenificiaryImage})`
              }}
              backgroundRepeat={"no-repeat"}
              backgroundSize={"cover"}
              borderRadius={"24px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"343px"}
              height={"287px"}
              flexDir={"column"}
              gap={50}
              py={12}
            ></Box>

            <Flex flexDir={"column"} gap={2} alignItems={"center"}>
              <Text fontSize={"17px"} fontWeight={"700"}>
                No Data Available
              </Text>
              <Text fontSize={"14px"} fontWeight={"400"}>
                It seems there is no content here yet.
              </Text>
            </Flex>
            <Button
              size={"2xl"}
              mt={6}
              ml={"8"}
              width={"100%"}
              height={"50px"}
              onClick={handleAddBeneficiaryClick}
            >
              Add Beneficiary
            </Button>
          </CardBody>
        </Card>
      ) : (
        <AddBeneficiary />
      )}
    </Flex>
  );
};

export default Beneficiary;
