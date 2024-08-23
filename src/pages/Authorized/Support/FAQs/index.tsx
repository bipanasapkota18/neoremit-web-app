import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import BreadCrumbs from "@neoWeb/components/BreadCrumbs";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { PageParams, useGetAllFaq } from "@neoWeb/services/Support/service-faq";
import parse from "html-react-parser";
import { useState } from "react";

const FAQs = () => {
  const [pageParams] = useState<PageParams>({
    pageIndex: 0,
    pageSize: 100
  });
  const { data: faqData, isLoading } = useGetAllFaq({
    pageIndex: pageParams.pageIndex,
    pageSize: pageParams.pageSize
  });
  const pages = [
    {
      pageName: "FAQ",
      href: NAVIGATION_ROUTES.FAQS,
      isCurrentPage: true
    }
  ];
  return (
    <Stack>
      <BreadCrumbs pages={pages} />
      <Card>
        <CardBody display={"flex"} flexDirection={"column"} gap={6}>
          <Text fontWeight={700} fontFamily={"17px"}>
            Frequently asked questions
          </Text>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Stack>
              <Stack>
                <Accordion variant="custom" allowMultiple gap={4}>
                  <Flex gap={4} direction={"column"}>
                    {faqData?.faqList.map((item, index) => (
                      <AccordionItem border="none" key={index}>
                        <AccordionButton justifyContent={"space-between"}>
                          <HStack>
                            <Icon as={svgAssets.MessageIcon} />
                            <Text
                              as="span"
                              textAlign="left"
                              noOfLines={2}
                              wordBreak={"break-all"}
                            >
                              {parse(item.question)}
                            </Text>
                          </HStack>
                          <AccordionIcon as={svgAssets.ArrowRightIcon} />
                        </AccordionButton>
                        <AccordionPanel wordBreak={"break-all"}>
                          {parse(item.answer)}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Flex>
                </Accordion>
              </Stack>
            </Stack>
          )}
        </CardBody>
      </Card>
    </Stack>
  );
};

export default FAQs;
