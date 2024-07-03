import { Button, Card, Center, Flex, Heading, VStack } from "@chakra-ui/react";
import GoBack from "@neoWeb/components/Button";
import { IStepProps } from "..";

const DocumentDetail = ({ stepProps }: IStepProps) => {
  return (
    <Flex direction={"column"}>
      <Card borderRadius={"16px"} p={5}>
        <Heading size={"lg"}>Document Details</Heading>
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
