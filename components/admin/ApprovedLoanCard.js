import { Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

const ApprovedLoanCard = ({
  full_name,
  file_no,
  phone_no,
  amount,
  created_at,
  updated_at,
  approved_by,
}) => {
  return (
    <Box fontSize='sm' w='full' bg='green.100' rounded='lg' p='4' shadow='md'>
      <Text>Name: {full_name}</Text>
      <Text>File no: {file_no}</Text>
      <Text>Phone no: {phone_no}</Text>
      <Text>Amount: ₦{amount}</Text>
      <Text>Requested on: {dayjs(created_at).format(" MMM D, YYYY")}</Text>
      <Text>Approved on: {dayjs(updated_at).format(" MMM D, YYYY")}</Text>
      <Text>Approved by:  {approved_by}</Text>
    </Box>
  );
};

export default ApprovedLoanCard;
