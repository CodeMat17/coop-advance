import { Box, Text, chakra } from "@chakra-ui/react";
import dayjs from "dayjs";
import Image from "next/image";

const ApprovedLoanCard = ({ amount, approved_on }) => {
  const intAmount = parseInt(amount)
  
  const formattedAmount = intAmount.toLocaleString("en-US",
    {
     style: "currency",
     currency: "NGN",
    }
  );
 
  return (
    <Box
      maxW='md'
      mx='auto'
      border='1px'
      mt='8'
      borderColor='gray.300'
      rounded='lg'
      shadow='md'
      overflow='hidden'>
      <Box pos='relative' display='flex' flexDir='column' alignItems='center'>
        <Image alt='' width={250} height={250} src='/approved.svg' />
        <Text pos='absolute' bottom='2' textAlign='center'>
          APPROVED!
        </Text>
      </Box>
      <Box bg='green.500' p='4' color='white'>
        <Text>Amount: {formattedAmount}</Text>
        <Text>Approved On: {dayjs(approved_on).format(" MMM D, YYYY")}</Text>
        <Text>Loan Duration: 3 Months from approval date</Text>
        <Text textAlign='center' mt=''>
          😋{" "}
          <chakra.span fontStyle='italic' color='pink.700'>
            Enjoy!
          </chakra.span>
        </Text>
      </Box>
    </Box>
  );
};

export default ApprovedLoanCard;
