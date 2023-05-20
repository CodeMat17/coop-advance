import ApprovedLoans from "@/components/admin/ApprovedLoans";
import DeclinedLoans from "@/components/admin/DeclinedLoans";
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
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Admin = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const userId = user?.id;

  const [profiles, setProfiles] = useState(null);
  const [verifyData, setVerifyData] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, isAdmin")
        .eq("id", userId);
      setProfiles(data);
    }
    // Only run query once user is logged in.
    if (user) getProfile();
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Box px='4' py='8'>
      {profiles === "null" && (
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
      {profiles &&
        profiles?.map((profile) => (
          <Box key={profile.id}>
            {!profile.isAdmin ? (
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
                  if you are not or contact the admin if you are and cannot have
                  access to admin content.
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
                      <Tab>Declined</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <VerifyUser />
                      </TabPanel>
                      <TabPanel>
                        <LoanRequest />
                      </TabPanel>
                      <TabPanel>
                        <ApprovedLoans />
                      </TabPanel>
                      <TabPanel>
                        <DeclinedLoans />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
};

export default Admin;
