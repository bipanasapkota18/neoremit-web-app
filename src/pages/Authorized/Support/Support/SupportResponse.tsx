import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import GoBack from "@neoWeb/components/Button";
import TextInput from "@neoWeb/components/Form/TextInput";
import {
  useCreateComment,
  useGetCommentByFeedBack
} from "@neoWeb/services/Support/service-support";
import { useStoreInitData } from "@neoWeb/store/initData";
import { useFirstCommentStore } from "@neoWeb/store/store";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface SupportResponseProps {
  setFlag: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  feedBackId: number | null;
  setFeedBackId: Dispatch<SetStateAction<number | null>>;
}
const defaultValues = {
  content: ""
};
const SupportResponse = ({
  setFlag,
  feedBackId,
  setFeedBackId
}: SupportResponseProps) => {
  const { data: commentData, refetch } = useGetCommentByFeedBack(
    feedBackId ?? 0
  );
  const { comment } = useFirstCommentStore();
  const { initData } = useStoreInitData();
  const { mutateAsync } = useCreateComment();
  useEffect(() => {
    refetch();
  }, [commentData, feedBackId]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues
  });

  const addComment = async (data: typeof defaultValues) => {
    if (data.content === "") return;
    await mutateAsync({
      feedbackId: feedBackId ?? 0,
      data: {
        ...data,
        commentImage: ""
      }
    });
    reset();
  };
  return (
    <Stack gap={6} as={"form"}>
      <Box>
        <GoBack
          onClick={() => {
            setFlag.off();
            setFeedBackId(null);
          }}
        />
      </Box>
      <Stack
        maxH={"70vh"}
        overflowY={"scroll"}
        sx={{
          "&::-webkit-scrollbar-thumb": {
            background: "primary.300",
            borderRadius: "full"
          }
        }}
      >
        <Stack>
          <Text
            color={"#2D3748"}
            fontWeight={700}
            fontSize={"14px"}
            textAlign={"start"}
          >
            {initData?.firstName}
          </Text>

          <Text
            padding={"8px 12px"}
            bg={colorScheme.gray_100}
            borderRadius={"12px 12px 12px 0px"}
            color={"#2D3748"}
            wordBreak={"break-all"}
            fontWeight={400}
            fontSize={"14px"}
            width={"fit-content"}
          >
            {comment}
          </Text>
        </Stack>
        {commentData?.map((item, index) => {
          const isCurrentUser =
            item?.userId + "" === localStorage.getItem("userID");
          return (
            <Stack
              key={index}
              gap={1}
              alignItems={isCurrentUser ? "flex-start" : "flex-end"}
              pr={2}
              pb={1}
            >
              <Text
                color={"#2D3748"}
                fontWeight={700}
                fontSize={"14px"}
                textAlign={isCurrentUser ? "start" : "end"}
              >
                {item.commentUserName}
              </Text>

              <Text
                padding={"8px 12px"}
                bg={
                  isCurrentUser ? colorScheme.gray_100 : colorScheme.primary_300
                }
                borderRadius={
                  isCurrentUser ? "12px 12px 12px 0px" : "12px 12px 0px 12px"
                }
                color={isCurrentUser ? "#2D3748" : colorScheme?.white}
                fontWeight={400}
                fontSize={"14px"}
              >
                {item.content}
              </Text>
            </Stack>
          );
        })}
      </Stack>
      <TextInput
        label={
          commentData
            ? commentData.length > 0
              ? "Reply..."
              : "Start Conversation"
            : ""
        }
        noFloating
        control={control}
        type="text"
        name="content"
        endIcons={
          <IconButton
            background={"none"}
            aria-label="Send Chat"
            cursor={"pointer"}
            type="submit"
            onClick={handleSubmit(addComment)}
            icon={<svgAssets.SendChatIcon />}
            _hover={{
              background: "none"
            }}
            _focus={{
              background: "none"
            }}
            _active={{
              background: "none"
            }}
          />
        }
      />
    </Stack>
  );
};

export default SupportResponse;
