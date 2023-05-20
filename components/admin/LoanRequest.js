import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import LoanRequestCard from "./LoanRequestCard";

const LoanRequest = () => {
  const supabase = useSupabaseClient();

  const [request, setRequest] = useState(null);

  useEffect(() => {
    getRequest();
  }, []);

  async function getRequest() {
    const { data } = await supabase
      .from("loans")
      .select("id, full_name, phone_no, file_no, amount, created_at, status")
      .eq("status", "processing");
    setRequest(data);
  }

  return (
    <Box>
      {!request ? (
        <Box display='flex' flexDir='column' alignItems='center' py='8'>
          <Spinner />
          <Text mt='2'>Loading</Text>
        </Box>
      ) : (
        <>
          {request && request.length <= 0 ? (
            <Text px='4' py='12' textAlign='center'>
              No pending loan request at the moment.
            </Text>
          ) : (
            <>
              <Text
                textAlign='center'
                fontSize='2xl'
                mb='2'
                fontWeight='semibold'>
                LOAN REQUESTS
              </Text>
              {request.map((loan) => (
                <LoanRequestCard
                  key={loan.id}
                  {...loan}
                  getRequest={getRequest()}
                />
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default LoanRequest;
