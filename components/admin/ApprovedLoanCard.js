import { Box, Button, Text } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

const ApprovedLoanCard = ({
  user_id,
  full_name,
  file_no,
  phone_no,
  amount,
  created_at,
  status,
  updated_at,
  approved_by,
  reload,
}) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const clearLoan = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("loans")
        .update({
          status: "repaid",
        })
        .eq("user_id", user_id)
        .select();

      if (data) {
        await supabase
          .from("profiles")
          .update({ status: "inactive" })
          .eq("id", user_id)
          .select();
        // router.replace(router.asPath);
        reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box fontSize='sm' w='full' bg='green.100' rounded='lg' p='4' shadow='md'>
      <Text>Name: {full_name}</Text>
      <Text>File no: {file_no}</Text>
      <Text>Phone no: {phone_no}</Text>
      <Text>Amount: ₦{amount}</Text>
      <Text>Requested on: {dayjs(created_at).format(" MMM D, YYYY")}</Text>
      <Text>Approved on: {dayjs(updated_at).format(" MMM D, YYYY")}</Text>
      <Text>Approved by: {approved_by}</Text>
      <Text>{status}</Text>
      <Box>
        <Button
          onClick={clearLoan}
          isDisabled={loading}
          loadingText='Clearing'
          w='full'
          mt='3'
          fontWeight='light'
          colorScheme='green'>
          Loan Repaid
        </Button>
      </Box>
    </Box>
  );
};

export default ApprovedLoanCard;
