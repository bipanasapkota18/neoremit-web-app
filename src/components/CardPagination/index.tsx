import {
  Box,
  Center,
  HStack,
  IconButton,
  Stack,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import { Dispatch, SetStateAction, useMemo } from "react";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight
} from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ICardPagination {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  dataLength: number | undefined;
}

function CardPagination({
  pageIndex,
  setPageIndex,
  dataLength,
  pageSize
}: ICardPagination) {
  const totalPage = useMemo(() => {
    return Math.ceil((dataLength ?? 0) / pageSize);
  }, [dataLength]);
  const currentPage = useMemo(() => {
    return pageIndex ? pageIndex + 1 : 1;
  }, [pageIndex]);

  const PageNumberWrapper = (item: number, isActive?: boolean) => {
    return isActive ? (
      <Center
        h={9}
        w={9}
        bg={colorScheme.primary_500}
        borderRadius={20}
        color="white"
        cursor={"default"}
        fontSize={"md"}
        userSelect="none"
      >
        <Text color={colorScheme.white}>{item}</Text>
      </Center>
    ) : (
      <Center
        h={9}
        w={9}
        _hover={{ bg: colorScheme.primary_500, color: colorScheme.white }}
        borderRadius={20}
        cursor="pointer"
        userSelect="none"
        onClick={() => {
          setPageIndex(item - 1);
        }}
      >
        {item}
      </Center>
    );
  };

  return (
    <>
      <HStack
        justifyContent={"flex-end"}
        float={"right"}
        flexWrap="wrap"
        mt={3}
      >
        {/* <HStack>
            <FormControl variant={"floating"}>
              <Select
                icon={<MdArrowDropDown />}
                w="70px"
                colorScheme={MofinColor.color_scheme}
                value={pageSize}
                onChange={e => {
                  setPageSize(parseInt(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Select>
              <FormLabel
                marginInlineStart={"5% !important"}
                marginStart={"5% !important"}
              >
                Items
              </FormLabel>
            </FormControl>
          </HStack> */}
      </HStack>
      <Box
        display={"flex"}
        justifyContent="flex-end"
        alignItems={"center"}
        height={"50px"}
      >
        <Box marginX={"16px"}>
          <Stack direction={"row"} alignItems="center" columnGap={0}>
            <IconButton
              variant={"outline"}
              aria-label="First Page"
              borderRadius="10px"
              onClick={() => setPageIndex(0)}
              size="xs"
              fontSize={"lg"}
              border={"none"}
              icon={<HiOutlineChevronDoubleLeft />}
              isDisabled={currentPage === 1}
            />

            <IconButton
              variant={"outline"}
              aria-label="Previous Page"
              borderRadius="10px"
              onClick={() => setPageIndex(currentPage - 2)}
              size="xs"
              fontSize={"lg"}
              border={"none"}
              icon={<IoIosArrowBack />}
              isDisabled={currentPage === 1}
            />
            {totalPage <= 3 ? (
              // Render all page numbers
              Array.from({ length: totalPage }).map((_, index) =>
                PageNumberWrapper(index + 1, index + 1 === currentPage)
              )
            ) : (
              // Render page numbers based on the current page position
              <>
                {currentPage === 1 ? (
                  // Render initial 3
                  <>
                    {PageNumberWrapper(1, currentPage === 1)}
                    {PageNumberWrapper(2)}
                    {PageNumberWrapper(3)}
                  </>
                ) : currentPage === totalPage ? (
                  // Render last 3
                  <>
                    {PageNumberWrapper(totalPage - 2)}
                    {PageNumberWrapper(totalPage - 1)}
                    {PageNumberWrapper(totalPage, currentPage === totalPage)}
                  </>
                ) : (
                  // Render middle 3
                  <>
                    {PageNumberWrapper(currentPage - 1)}
                    {PageNumberWrapper(currentPage, true)}
                    {PageNumberWrapper(currentPage + 1)}
                  </>
                )}
              </>
            )}

            <IconButton
              aria-label="Next Page"
              variant={"outline"}
              onClick={() => setPageIndex(currentPage)}
              size="xs"
              fontSize={"lg"}
              border="none"
              icon={<IoIosArrowForward />}
              isDisabled={currentPage === totalPage}
            />

            <Tooltip label={`Last Page: ${totalPage}`} placement="top">
              <IconButton
                aria-label="Last Page"
                variant={"outline"}
                onClick={() => setPageIndex(totalPage - 1)}
                size="xs"
                fontSize={"lg"}
                border="none"
                icon={<HiOutlineChevronDoubleRight />}
                isDisabled={currentPage === totalPage}
              />
            </Tooltip>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default CardPagination;
