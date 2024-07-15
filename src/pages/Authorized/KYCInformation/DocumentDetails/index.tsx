import { Button, Card, Center, Flex, Text, VStack } from "@chakra-ui/react";
import GoBack from "@neoWeb/components/Button";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { IStepProps } from "..";

const DocumentDetail = ({ stepProps }: IStepProps) => {
  return (
    <Flex direction={"column"}>
      <Card p={5} boxShadow={"none"}>
        <Text fontSize={"14px"} fontWeight={700} color={colorScheme.gray_700}>
          Document Details
        </Text>
        <Center height={"50vh"}> Document Details here</Center>
        <VStack spacing={10}>
          <Flex justifyContent={"space-between"} w={"100%"} mt={4}>
            <GoBack onClick={() => stepProps.prevStep()} />

            <Button colorScheme="teal" type="submit">
              Save and Continue
            </Button>
          </Flex>
        </VStack>
      </Card>
    </Flex>
  );
};
export default DocumentDetail;
