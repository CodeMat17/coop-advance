import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/router";

const LoanRequestCard = ({
  id,
  file_no,
  phone_no,
  full_name,
  amount,
  created_at,
}) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [declining, setDeclining] = useState(false);
  const [approving, setApproving] = useState(false);
  
  const declineRequest = async () => {
    setDeclining(true);
    try {
      const { error } = await supabase
        .from("loans")
        .update({ status: "declined" })
        .eq("id", id);
      if (!error) {
       router.replace(router.asPath)
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setDeclining(false);
    }
  };

  const approveRequest = async () => {
    setApproving(true);
    try {
      const { error } = await supabase
        .from("loans")
        .update({
          status: "approved",
          approved_by: user.email,
          updated_at: new Date(),
        })
        .eq("id", id);
      if (!error) {
        router.replace(router.asPath);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setApproving(false);
    }
  };

  return (
    <Box
      maxW='md'
      mx='auto'
      mt='4'
      border='1px'
      rounded='lg'
      p='4'
      borderColor='gray.300'
      shadow='lg'>
      <Text>Name: {full_name}</Text>
      <Text>File No: {file_no}</Text>
      <Text>Phone No: {phone_no}</Text>
      <Text>Requested On: {dayjs(created_at).format(" MMM D, YYYY")}</Text>
      <Text fontWeight='semibold'>Loan Request Amount: ₦{amount}</Text>
      <HStack mt='6' alignItems='center' justifyContent='space-between'>
        <Button
          onClick={declineRequest}
          isLoading={declining}
          loadingText='Wait...'
          variant='outline'
          fontWeight='light'
          fontSize='lg'
          colorScheme='red'>
          Decline
        </Button>

        <Button
          onClick={approveRequest}
          isLoading={approving}
          loadingText='Wait...'
          fontWeight='light'
          fontSize='lg'
          colorScheme='green'>
          Approve
        </Button>
      </HStack>
    </Box>
  );
};

export default LoanRequestCard;
