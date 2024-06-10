import {
  Box,
  Card,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import FilterButton from "@neoWeb/components/Button/filterButton";
import SearchInput from "@neoWeb/components/Form/SearchInput";
import { useState } from "react";
import AddFilterModal from "./AddFilterModal";

const Transaction = () => {
  const {
    isOpen: isOpenAddFilterButtonModalOpen,
    onOpen: onOpenAddFilterButtonModal,
    onClose: onCloseAddFilterButtonModal
  } = useDisclosure();
  const [searchText, setSearchText] = useState<string>("");
  const [isDesktop] = useMediaQuery("(min-width:1000px)");
  // for static data in transactions  historyyyy
  const staticTransactions = [
    {
      id: "1",
      name: "Alina Shrestha ",
      data: "july 2 , 2024"
    }
  ];

  return (
    <Flex direction={"column"}>
      <Text>Transaction history</Text>
      <Card borderRadius={"24px"} mt={5}>
        <Text fontSize={17} fontWeight={700} color={"#2D3748"} mt={8} pl={4}>
          Transaction History
        </Text>

        <HStack justifyContent={"space-between"}>
          <HStack
            display="flex"
            alignItems={"center"}
            padding="24px 20px"
            gap={"8px"}
            alignSelf={"stretch"}
          >
            {isDesktop ? (
              <SearchInput
                width={"824px"}
                label="Search"
                name="search"
                onSearch={setSearchText}
                type="text"
              />
            ) : null}

            <FilterButton onClick={onOpenAddFilterButtonModal} />
          </HStack>
        </HStack>
        <Box pl={4} fontSize={17} color={"#2D3748"}>
          <Text>Latest Transactions</Text>
        </Box>
        <AddFilterModal
          isOpen={isOpenAddFilterButtonModalOpen}
          onClose={onCloseAddFilterButtonModal}
        />
      </Card>
    </Flex>
  );
};

export default Transaction;
