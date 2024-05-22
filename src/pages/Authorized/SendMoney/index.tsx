import { Box, Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";

const SendMoney = () => {
  return (
    <SimpleGrid columns={3} gap={6}>
      <GridItem colSpan={2} rowSpan={1}>
        <Box
          style={{}}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          maxWidth={"609px"}
          boxShadow="0px 4px 28px 0px rgba(0, 0, 0, 0.06)"
          borderRadius={"24px"}
          py={12}
        >
          <Flex flexDir={"column"} gap={2} alignItems={"center"}>
            <Text textAlign={"center"} fontSize={"17px"} fontWeight={600}>
              SendingAmount
            </Text>
            <Text textAlign={"center"} fontSize={"20px"}>
              $500
            </Text>
          </Flex>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};
export default SendMoney;
