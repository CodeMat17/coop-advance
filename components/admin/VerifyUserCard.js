import { Box, Button, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

const VerifyUserCard = ({
  full_name,
  id,
  email,
  file_no,
  phone_no,
  getData,
}) => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const verifyUser = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "verified" })
        .eq("id", id);
      if (!error) {
        getData();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
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
      <Text>Email: {email}</Text>
      <Text>File No: {file_no}</Text>
      <Text>Phone No: {phone_no}</Text>
      <Button
        onClick={verifyUser}
        isLoading={loading}
        loadingText='Verifying'
        w='full'
        mt='4'
        colorScheme='green'>
        Verify
      </Button>
    </Box>
  );
};

export default VerifyUserCard;
