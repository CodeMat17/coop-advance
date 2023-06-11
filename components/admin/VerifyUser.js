import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import VerifyUserCard from "./VerifyUserCard";

const VerifyUser = ({ profiles }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [verifyUser, setVerifyUser] = useState(null);

  return (
    <Box>
      {!profiles ? (
        <Box display='flex' flexDir='column' alignItems='center' py='8'>
          <Spinner />
          <Text mt='2'>Loading</Text>
        </Box>
      ) : (
        <>
          <Text textAlign='center' fontSize='2xl' mb='2' fontWeight='semibold'>
            VERIFY MEMBERS
          </Text>
          {profiles.map((user) => (
            <Box key={user.id}>
              <VerifyUserCard
                id={user.id}
                full_name={user.full_name}
                location={user.location}
                phone_no={user.phone_no}
                email={user.email}
              />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default VerifyUser;
