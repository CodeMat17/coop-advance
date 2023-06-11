import { Box, Spinner, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import LoanRequestCard from "./LoanRequestCard";

const LoanRequest = ({ loans }) => {
  const supabase = useSupabaseClient();

  return (
    <Box>
      {!loans ? (
        <Box display='flex' flexDir='column' alignItems='center' py='8'>
          <Spinner />
          <Text mt='2'>Loading</Text>
        </Box>
      ) : (
        <>
          {loans && loans.length <= 0 ? (
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
              {loans.map((loan) => (
                <Box key={loan.id}>
                  {loan.status === "processing" && (
                    <LoanRequestCard
                      user_id={loan.user_id}
                      full_name={loan.full_name}
                      location={loan.location}
                      phone_no={loan.phone_no}
                      ippis_no={loan.ippis_no}
                      amount={loan.amount}
                      created_at={loan.created_at}
                    />
                  )}
                </Box>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default LoanRequest;
