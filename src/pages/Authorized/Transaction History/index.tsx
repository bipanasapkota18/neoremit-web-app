import {
  Avatar,
  Card,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { svgAssets } from "@neoWeb/assets/images/svgs";
import SearchInput from "@neoWeb/components/Form/SearchInput";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import AddFilterModal from "./AddFilterModal";

const TransactionCards = ({ transactions }: any) => {
  return (
    <SimpleGrid columns={2} gap={4}>
      {transactions.map((transaction: any) => (
        <Card
          key={transaction.id}
          padding={4}
          borderRadius={"8px"}
          boxShadow={"4px 0px 26px 0px rgba(0, 0, 0, 0.06)"}
        >
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Avatar name={transaction.name} />
              <Stack gap={0}>
                <Text textStyle={"paymentDetailsHeader"}>
                  {transaction.name}
                </Text>
                <Text textStyle={"transaction_date"}>{transaction.date}</Text>
              </Stack>
            </HStack>
            <Stack gap={0}>
              <Text textStyle={"cardText"} color={"#38A169"}>
                {transaction.amount}
                <Text
                  as={"sup"}
                  fontSize={"10px"}
                  fontWeight={400}
                  color={colorScheme.gray_700}
                >
                  {"USD"}
                </Text>
              </Text>
              <Text textStyle={"transaction_date"}>{transaction.time}</Text>
            </Stack>
          </HStack>
        </Card>
      ))}
    </SimpleGrid>
  );
};
const Transaction = () => {
  const {
    isOpen: isOpenAddFilterButtonModalOpen,
    onOpen: onOpenAddFilterButtonModal,
    onClose: onCloseAddFilterButtonModal
  } = useDisclosure();
  // const [searchText, setSearchText] = useState<string>("");
  // for static data in transactions  historyyyy

  const staticTransactions = [
    {
      id: 1,
      name: "Alina Shrestha ",
      date: "12th June, 2024",
      time: "12:00 PM",
      amount: "$5000"
    },
    {
      id: 2,
      name: "Ali Khan ",
      date: "13th June, 2024",
      time: "1:00 AM",
      amount: "$1000"
    },
    {
      id: 3,
      name: "Sara Khan",
      date: "14th June, 2024",
      time: "2:00 PM",
      amount: "$2000"
    },
    {
      id: 4,
      name: "Rahul Shrestha",
      date: "15th June, 2024",
      time: "3:00 PM",
      amount: "$3000"
    },
    {
      id: 5,
      name: "Alina Shrestha ",
      date: "12th June, 2024",
      time: "12:00 PM",
      amount: "$5000"
    },
    {
      id: 6,
      name: "Ali Khan ",
      date: "13th June, 2024",
      time: "1:00 AM",
      amount: "$1000"
    },
    {
      id: 7,
      name: "Sara Khan",
      date: "14th June, 2024",
      time: "2:00 PM",
      amount: "$2000"
    },
    {
      id: 8,
      name: "Rahul Shrestha",
      date: "15th June, 2024",
      time: "3:00 PM",
      amount: "$3000"
    }
  ];

  return (
    <Flex direction={"column"}>
      <Card padding={6} display={"flex"} gap={4}>
        <Text textStyle={"paymentDetailsHeader"}>Transaction History</Text>

        <HStack display="flex" alignItems={"center"} gap={"8px"} width={"50%"}>
          <SearchInput
            label="Search"
            name="search"
            // onSearch={setSearchText}
            type="text"
          />
          <IconButton
            mt={2}
            aria-label="Search"
            icon={<svgAssets.Filter width={"24px"} height={"24px"} />}
            width={"36px"}
            height={"36px"}
            borderRadius={"8px"}
            onClick={onOpenAddFilterButtonModal}
          />
        </HStack>
        <Stack mt={3}>
          <Text textStyle={"paymentDetailsHeader"}>Latest Transactions</Text>

          <TransactionCards transactions={staticTransactions} />
        </Stack>
        <AddFilterModal
          isOpen={isOpenAddFilterButtonModalOpen}
          onClose={onCloseAddFilterButtonModal}
        />
      </Card>
    </Flex>
  );
};

export default Transaction;
