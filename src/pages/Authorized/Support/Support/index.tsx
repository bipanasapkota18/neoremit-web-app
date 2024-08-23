import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBoolean
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import BreadCrumbs from "@neoWeb/components/BreadCrumbs";
import { DropzoneComponentControlled } from "@neoWeb/components/Form/DropzoneComponent";
import Select from "@neoWeb/components/Form/SelectComponent";
import TextInput from "@neoWeb/components/Form/TextInput";
import { NAVIGATION_ROUTES } from "@neoWeb/pages/App/navigationRoutes";
import { baseURL } from "@neoWeb/services/service-axios";
import {
  IFeedBackResponse,
  useCreateFeedBack,
  useGetAllFeedBacks,
  useGetAllSupportReasons,
  useGetAllUserGuides
} from "@neoWeb/services/Support/service-support";
import { useFirstCommentStore } from "@neoWeb/store/store";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { formatSelectOptions, ISelectOptions } from "@neoWeb/utility/format";
import parse from "html-react-parser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import UserGuide from "../UserGuide";
import SupportResponse from "./SupportResponse";

interface CommonProps {
  setFlag: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  setFeedBackId: Dispatch<SetStateAction<number | null>>;
  data?: IFeedBackResponse[];
}

//Card shown in Support Request
const SupportCard = ({ setFlag, setFeedBackId, data }: CommonProps) => {
  const { setComment } = useFirstCommentStore();
  return (
    <>
      {data?.map(item => {
        return (
          <HStack
            key={item.id}
            p={4}
            justifyContent={"space-between"}
            bg={colorScheme.gray_50}
            borderRadius={"8px"}
            onClick={() => {
              setComment(item?.content);
              setFlag.on();
              setFeedBackId(item.id);
            }}
            cursor={"pointer"}
            width={"100%"}
          >
            <Stack gap={0}>
              <Text textStyle={"beneficiaryCardHeader"}>{item.content}</Text>
              <Text textStyle={"transaction_date"}>{item.createdDate}</Text>
            </Stack>
            <Stack>
              <Icon as={svgAssets.ArrowRightIcon} />
            </Stack>
          </HStack>
        );
      })}
    </>
  );
};

//Support Request Component
const SupportRequest = ({ setFlag, setFeedBackId }: CommonProps) => {
  const { data: allFeedBackData } = useGetAllFeedBacks();
  return (
    <Stack>
      <SupportCard
        setFlag={setFlag}
        setFeedBackId={setFeedBackId}
        data={allFeedBackData}
      />
    </Stack>
  );
};

const MyRequest = ({
  setTabIndex
}: {
  setTabIndex: Dispatch<SetStateAction<number>>;
}) => {
  const defaultFormValues = {
    content: "",
    supportReasonId: null as ISelectOptions<number> | null,
    feedBackImage: ""
  };
  const { data: supportReasons } = useGetAllSupportReasons();
  const { mutateAsync: mutateCreateFeedBack } = useCreateFeedBack();
  const reasonsOptions = formatSelectOptions<number>({
    data: supportReasons,
    labelKey: "name",
    valueKey: "id"
  });
  const validationSchema = z.object({
    content: z.string().min(1, { message: "Please enter your message" }),
    supportReasonId: z
      .object({
        label: z.string(),
        value: z.number()
      })
      .nullable()
      .refine(data => !!data?.label && !!data?.value, {
        message: "Please select a reason"
      }),
    feedBackImage: z.any()
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  });

  const submitData = async (data: typeof defaultFormValues) => {
    try {
      await mutateCreateFeedBack({
        ...data,
        supportReasonId: data?.supportReasonId?.value ?? null,
        feedBackImage: data?.feedBackImage ? data?.feedBackImage[0] : null
      });
      setTabIndex(0);
      reset();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Stack>
      <Stack>
        <Text fontStyle={"beneficiaryCardHeader"} fontSize={"17px"}>
          Share your suggestions, ask questions, or report concerns.
        </Text>
      </Stack>
      <Stack as={"form"} gap={3} onSubmit={handleSubmit(submitData)}>
        <Select
          control={control}
          name={"supportReasonId"}
          placeholder={"Select Reason"}
          options={reasonsOptions}
        />
        <TextInput
          control={control}
          name={"content"}
          placeholder={"Your Message Here"}
          type={"textarea"}
        />
        <DropzoneComponentControlled
          isSupport
          name="feedBackImage"
          control={control}
          options={{ maxSize: 2 }}
        />
        <Flex justifyContent={"flex-end"}>
          <Button colorScheme="primary" type="submit">
            Submit
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

//Main Component
const Support = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [flag, setFlag] = useBoolean();
  const [flag1, setFlag1] = useBoolean();
  const [feedBackId, setFeedBackId] = useState<number | null>(null);

  const { mutateAsync, data: userGuideData } = useGetAllUserGuides();
  const userGuideFirstData =
    userGuideData?.data?.data?.helpSetupResponseDtoList[0];
  const [pageIndex] = useState<number>(0);
  const [pageSize] = useState(9);
  useEffect(() => {
    mutateAsync({
      pageParams: { page: pageIndex, size: pageSize },
      filterParams: { searchParam: "" }
    });
  }, [pageIndex, pageSize]);
  const tabsList = [
    {
      title: "My Request",
      content: (
        <SupportRequest setFlag={setFlag} setFeedBackId={setFeedBackId} />
      )
    },
    {
      title: "Support Request",
      content: <MyRequest setTabIndex={setTabIndex} />
    }
  ];

  const pages = [
    ...(flag
      ? [
          {
            pageName: "Support",
            href: NAVIGATION_ROUTES.SUPPORT
          },
          {
            pageName: "Question and Answer",
            isCurrentPage: true
          }
        ]
      : [
          {
            pageName: "Support",
            href: NAVIGATION_ROUTES.SUPPORT,
            isCurrentPage: true
          }
        ])
  ];
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <HStack gap={6} maxWidth={"100%"} alignItems={"start"}>
      {flag1 ? (
        <UserGuide setFlag1={setFlag1} />
      ) : (
        <Stack gap={1}>
          <BreadCrumbs pages={pages} />
          <Box display={"flex"} gap={5}>
            <Card minHeight={"88vh"} minW={"584px"}>
              <CardBody
                display={"flex"}
                flexDirection={"column"}
                gap={6}
                padding={6}
              >
                {flag ? (
                  <SupportResponse
                    setFlag={setFlag}
                    feedBackId={feedBackId}
                    setFeedBackId={setFeedBackId}
                  />
                ) : (
                  <Tabs
                    index={tabIndex}
                    onChange={handleTabsChange}
                    variant="unstyled"
                  >
                    <TabList gap={3}>
                      {tabsList.map((tab, index) => (
                        <Tab
                          key={index}
                          border={`1px solid ${colorScheme.normalTextColor}`}
                          padding={"12px 24px"}
                          color={colorScheme.normalTextColor}
                          borderRadius={"32px"}
                          _selected={{
                            color: "white",
                            bg: colorScheme.primary_300
                          }}
                        >
                          {tab.title}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {tabsList.map((tab, index) => (
                        <TabPanel key={index}>{tab.content}</TabPanel>
                      ))}
                    </TabPanels>
                  </Tabs>
                )}
              </CardBody>
            </Card>
            <Stack gap={6} minW={"343px"}>
              <Card>
                <CardBody
                  display={"flex"}
                  flexDir={"column"}
                  padding={6}
                  gap={6}
                >
                  <Stack>
                    <HStack gap={"12px"}>
                      <Box
                        p={2}
                        bg={colorScheme.primary_50}
                        alignItems={"center"}
                        display={"flex"}
                        borderRadius={"full"}
                      >
                        <Icon
                          as={svgAssets.SupportMessageIcon}
                          height={"20px"}
                          width={"20px"}
                        />
                      </Box>
                      <Stack gap={0}>
                        <Text fontWeight={700} fontSize={"17px"}>
                          User Guides
                        </Text>
                        <Text color={colorScheme.search_icon} fontSize={"14px"}>
                          Self-Help Resources
                        </Text>
                      </Stack>
                    </HStack>
                  </Stack>
                  <Stack gap={3}>
                    <Image
                      src={`${baseURL}/document-service/master/help/setup/image?fileId=${userGuideFirstData?.thumbNail}`}
                      objectFit={"cover"}
                      height={"117px"}
                      borderRadius={"8px"}
                    />
                    <Stack gap={0}>
                      <Text
                        fontWeight={700}
                        fontSize={"17px"}
                        wordBreak={"break-all"}
                      >
                        {userGuideFirstData?.title}
                      </Text>
                      {userGuideFirstData?.link && (
                        <Link
                          color={colorScheme.primary_500}
                          fontWeight={600}
                          fontSize={"14px"}
                          cursor={"pointer"}
                          href={userGuideFirstData?.link}
                          isExternal
                          wordBreak={"break-all"}
                        >
                          Watch on Youtube <ExternalLinkIcon mb={"4px"} />
                        </Link>
                      )}
                      <Text
                        color={colorScheme.search_icon}
                        fontSize={"14px"}
                        fontWeight={400}
                        wordBreak={"break-all"}
                        noOfLines={2}
                      >
                        {parse(userGuideFirstData?.description ?? "")}
                      </Text>
                    </Stack>
                  </Stack>
                  <Stack alignItems={"flex-end"} fontWeight={500}>
                    <Text
                      color={colorScheme.primary_500}
                      cursor={"pointer"}
                      onClick={setFlag1.on}
                    >
                      View More
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card>
                <CardBody
                  display={"flex"}
                  flexDir={"column"}
                  padding={6}
                  gap={6}
                >
                  <Stack>
                    <Text fontWeight={700} fontSize={"17px"} gap={1}>
                      Contact us
                    </Text>
                    <Text
                      color={colorScheme.search_icon}
                      fontSize={"14px"}
                      fontWeight={400}
                    >
                      Get Help From Our Support Team
                    </Text>
                  </Stack>
                  <Stack gap={3}>
                    <HStack alignItems={"flex-start"}>
                      <Icon
                        as={svgAssets.SupportCall}
                        height={"20px"}
                        width={"20px"}
                      />
                      <Stack gap={0}>
                        <Text>9823123211</Text>
                        <Text>9823123211</Text>
                      </Stack>
                    </HStack>
                    <HStack alignItems={"flex-start"}>
                      <Icon as={svgAssets.SMS} height={"20px"} width={"20px"} />
                      <Stack gap={0}>
                        <Text>Neoremit@gmail.com</Text>
                        <Text>Neoremit@gmail.com</Text>
                      </Stack>
                    </HStack>
                    <HStack alignItems={"flex-start"}>
                      <Icon
                        as={svgAssets.SupportCall}
                        height={"20px"}
                        width={"20px"}
                      />
                      <Stack gap={0}>
                        <Text>017829128</Text>
                        <Text>017829128</Text>
                      </Stack>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </Box>
        </Stack>
      )}
    </HStack>
  );
};

export default Support;
