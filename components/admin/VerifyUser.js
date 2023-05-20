import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import VerifyUserCard from "./VerifyUserCard";

const VerifyUser = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [verifyUser, setVerifyUser] = useState(null);

  useEffect(() => {
    // async function getData() {
    //   const { data } = await supabase
    //     .from("profiles")
    //     .select("id, full_name, phone_no, email,file_no, role")
    //     .is("role", null);
    //   setVerifyUser(data);
    // }
    // Only run query once user is logged in.
     if (user) getData();
  }, [user]);

  async function getData() {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, phone_no, email,file_no, role")
      .is("role", null);
    setVerifyUser(data);
  }

  return (
    <Box>
      {!verifyUser ? (
        <Box display='flex' flexDir='column' alignItems='center' py='8'>
          <Spinner />
          <Text mt='2'>Loading</Text>
        </Box>
      ) : (
        <>
          {verifyUser && verifyUser.length <= 0 ? (
            <Text px='4' py='12' textAlign='center'>
              No pending user for verification.
            </Text>
          ) : (
            <>
              <Text
                textAlign='center'
                fontSize='2xl'
                mb='2'
                fontWeight='semibold'>
                VERIFY MEMBERS
              </Text>
              {verifyUser.map((user) => (
                <VerifyUserCard key={user.id} {...user} detData={getData()} />
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default VerifyUser;
