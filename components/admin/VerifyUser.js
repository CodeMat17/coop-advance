import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import VerifyUserCard from "./VerifyUserCard";

const VerifyUser = ({ profiles }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [verifyUser, setVerifyUser] = useState(null);

  // useEffect(() => {
  //     getData();
  // }, []);

  // async function getData() {
  //   const { data } = await supabase
  //     .from("profiles")
  //     .select("id, full_name, phone_no, email,file_no, role")
  //     .is("role", null);
  //   setVerifyUser(data);
  // }

  return (
    <Box>
      {!profiles ? (
        <Box display='flex' flexDir='column' alignItems='center' py='8'>
          <Spinner />
          <Text mt='2'>Loading</Text>
        </Box>
      ) : (
        <>
          {profiles && profiles.length <= 0 ? (
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
              {profiles.map((user) => (
                <Box key={user.id}>
                  {user.role === null &&
                    <VerifyUserCard
                      id={user.id}
                      full_name={user.full_name}
                      file_no={user.file_no}
                      phone_no={user.phone_no}
                      email={user.email}
                    />
                  }
                </Box>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default VerifyUser;
