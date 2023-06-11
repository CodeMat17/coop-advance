import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import ApprovedLoanCard from "../../components/admin/ApprovedLoanCard";

const ApprovedLoans = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [approved, setApproved] = useState(null);

  useEffect(() => {
    getApprovedLoans();
  }, []);

  async function getApprovedLoans() {
    const { data } = await supabase
      .from("loans")
      .select()
      .range(0, 20)
      .order("created_at", { ascending: false })
      .eq("status", "approved");
    setApproved(data);
  }

  return (
    <Box>
      {!approved ? (
        <Box display='flex' flexDir='column' alignItems='center' py='8'>
          <Spinner />
          <Text mt='2'>Loading</Text>
        </Box>
      ) : (
        <>
          {approved && approved.length <= 0 ? (
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
                APPROVED LOANS
              </Text>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing='10'
                maxW='6xl'
                mx='auto'>
                {approved.slice(0, 20).map((item) => (
                  <ApprovedLoanCard
                    key={item.id}
                    {...item}
                    reload={getApprovedLoans}
                  />
                ))}
              </SimpleGrid>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ApprovedLoans;
