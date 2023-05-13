import { Box, Text, chakra } from "@chakra-ui/react";
import dayjs from "dayjs";

const ApprovedLoanCard = ({ amount, updated_at }) => {
  return (
    <Box
      mt='6'
      p='6'
      border='1px'
      borderColor='gray.100'
      shadow='lg'
      rounded='lg'>
      <Text>Amount: ₦{amount}</Text>
      <Text>Approved On: {dayjs(updated_at).format(" MMM D, YYYY")}</Text>
      <Text>Loan Duration: 3 Months</Text>
      <Text textAlign='center' mt='4'>
        😋{" "}
        <chakra.span fontStyle='italic' color='pink.500'>
          Enjoy!
        </chakra.span>
      </Text>
    </Box>
  );
};

export default ApprovedLoanCard;
