import ApprovedLoans from "@/components/admin/ApprovedLoans";
import LoanRequest from "@/components/admin/LoanRequest";
import VerifyUser from "@/components/admin/VerifyUser";
import {
  Box,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  chakra,
} from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Admin = ({ session, profile, profiles, loans }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const userId = user?.id;

  // const [profile, setProfile] = useState(null);

  return (
    <Box px='4' py='8'>
      <>
        {profile === "null" && (
          <Box
            my='16'
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='center'>
            <Spinner />
            <Text mt='2'>Please wait</Text>
          </Box>
        )}

        {profile &&
          profile?.map((item) => (
            <Box key={item.id}>
              {!item.isAdmin ? (
                <Box
                  py='16'
                  px='4'
                  maxW='md'
                  mx='auto'
                  display='flex'
                  flexDir='column'
                  justifyContent='center'
                  textAlign='center'>
                  <Text fontSize='xl'>
                    Are you sure you are an Administrator here?
                  </Text>
                  <Text pt='4'>
                    I doubt if you are. Please{" "}
                    <chakra.span
                      color='blue'
                      cursor='pointer'
                      bg='blue.100'
                      rounded='full'
                      px='1'
                      onClick={() => router.push("/")}>
                      go back
                    </chakra.span>{" "}
                    if you are not or contact the admin if you are and cannot
                    have access to admin content.
                  </Text>
                </Box>
              ) : (
                <Box>
                  <Text textAlign='center' fontSize='2xl'>
                    Admin Dashboard
                  </Text>
                  <Box mt='4'>
                    <Tabs
                      display='flex'
                      flexDir='column'
                      alignItems='center'
                      justifyContent='center'>
                      <TabList>
                        <Tab>Verify</Tab>
                        <Tab>Request</Tab>
                        <Tab>Approved</Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel>
                          <VerifyUser profiles={profiles} />
                        </TabPanel>
                        <TabPanel>
                          <LoanRequest loans={loans} />
                        </TabPanel>
                        <TabPanel>
                          <ApprovedLoans  />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
      </>
    </Box>
  );
};

export default Admin;

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .is("verify", null);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);

  const { data: loans } = await supabase
    .from("loans")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    props: {
      session,
      user,
      profiles,
      profile,
      loans,
    },
  };
};
