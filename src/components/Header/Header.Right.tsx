import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  HStack,
  IconButton,
  keyframes,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { FC, useRef } from "react";

import { svgAssets } from "@neoWeb/assets/images/svgs";
import { BsCheck2Circle, BsChevronDown } from "react-icons/bs";
import { HeaderAnchor } from "./Header";

interface IRightHeader {
  mobileMoreAnchorEl: HeaderAnchor;
  isMobileMenuOpen: boolean;
  mobileMenuId: string;
  handleMobileMenuClose: () => void;
}
const shake = keyframes({
  "0%": {
    transform: "rotate(0)"
  },
  "15%": {
    transform: "rotate(15deg)"
  },
  "30%": {
    transform: "rotate(-15deg)"
  },
  "45%": {
    transform: "rotate(14deg)"
  },
  "60%": {
    transform: "rotate(-14deg)"
  },

  "100%": {
    transform: "rotate(0)"
  }
});
export const RightHeader: FC<IRightHeader> = () => {
  const initialFocusRef = useRef();
  // const { initData } = useStoreInitData();

  return (
    <HStack gap={8}>
      <Popover initialFocusRef={initialFocusRef.current} placement="bottom">
        <PopoverTrigger>
          <Box position={"relative"}>
            <IconButton
              variant={"light"}
              aria-label="notification"
              border={"1px solid #E2E8F0"}
              borderRadius={"full"}
              bg={"white"}
              _hover={{
                animation: `${shake} 1s `
              }}
              _expanded={{
                transform: "rotate(15deg)"
              }}
              icon={<svgAssets.NotificationIcon />}
            />
            <Badge
              position={"absolute"}
              height={"10px"}
              w={"10px"}
              background={"red"}
              zIndex={1}
              top={"8%"}
              borderRadius={"120%"}
              right={"1%"}
              border={"1px solid #E2E8F0"}
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          color={colorScheme.gray_800}
          borderColor="blue.800"
          mx={8}
          w={"500px"}
        >
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            <HStack justifyContent={"space-between"}>
              <HStack gap={4}>
                <Text>Notification</Text>
                <HStack color={colorScheme.gray_400}>
                  <Text fontWeight={"normal"}>All</Text>
                  <BsChevronDown />
                </HStack>
              </HStack>
              <HStack>
                <Text color={colorScheme.blue_700}>Mark as read</Text>
                <BsCheck2Circle />
              </HStack>
            </HStack>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverBody>
            <HStack
              alignItems={"flex-start"}
              py={4}
              borderBottom={"1px solid"}
              borderTop={"1px solid"}
              borderColor={colorScheme.gray_200}
            >
              <Avatar>
                <AvatarBadge
                  sx={{
                    boxSize: "1.25em",
                    bg: "orange",
                    position: "absolute",
                    top: -2,
                    left: -2,
                    height: "1rem",
                    width: "1rem"
                  }}
                />
              </Avatar>
              <Stack>
                <Text fontWeight={"500"}>
                  Dear Shyam, transaction done with amount 1000 for NTC Prepaid
                  Top-up
                </Text>
                <Text color={colorScheme.gray_600}>Today at 9:42 AM</Text>
              </Stack>
            </HStack>
            <HStack
              alignItems={"flex-start"}
              py={4}
              borderBottom={"1px solid"}
              borderColor={colorScheme.gray_200}
            >
              <Avatar>
                <AvatarBadge
                  sx={{
                    boxSize: "1.25em",
                    bg: "orange",
                    position: "absolute",
                    top: -2,
                    left: -2,
                    height: "1rem",
                    width: "1rem"
                  }}
                />
              </Avatar>
              <Stack>
                <Text fontWeight={"500"}>
                  Dear Shyam, transaction done with amount 1000 for NTC Prepaid
                  Top-up
                </Text>
                <Text color={colorScheme.gray_600}>Today at 9:42 AM</Text>
              </Stack>
            </HStack>
            <HStack
              alignItems={"flex-start"}
              py={4}
              borderBottom={"1px solid"}
              borderColor={colorScheme.gray_200}
            >
              <Avatar>
                <AvatarBadge
                  sx={{
                    boxSize: "1.25em",
                    bg: "orange",
                    position: "absolute",
                    top: -2,
                    left: -2,
                    height: "1rem",
                    width: "1rem"
                  }}
                />
              </Avatar>
              <Stack>
                <Text fontWeight={"500"}>
                  Dear Shyam, transaction done with amount 1000 for NTC Prepaid
                  Top-up
                </Text>
                <Text color={colorScheme.gray_600}>Today at 9:42 AM</Text>
              </Stack>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Tooltip label="View Profile">
        <Avatar
          cursor={"pointer"}
          // onClick={() => navigate("/user-profile")}
          src={""}
          // src={
          //   initData?.profileImage &&
          //   `${baseURL}document/internal-user/profile?image=${initData?.profileImage}`
          // }
        >
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </Tooltip>
    </HStack>
  );
};
