import { Box, Button } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LogoWithFrederikaFont from "../components/LogoWithFrederickaFont";
import MobileDrawer from "./MobileDrawer";

const NavHeader = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const userId = user?.id;
  const router = useRouter();

  const [checkIsAdmin, setCheckIsAdmin] = useState([]);

  useEffect(() => {
    const checkIsAdmin = async () => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("isAdmin, id")
        .eq("id", userId);
      if (!error) {
        setCheckIsAdmin(data);
      }
    };
    if (user) checkIsAdmin();
  }, [user]);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <Box bg='#161f6d' py='4' pl='6' pr='3' pos='sticky' top='0' zIndex='60'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        color='white'>
        <LogoWithFrederikaFont />

        <MobileDrawer />
        <Box display={{ base: "none", sm: "flex" }}>
          <Button
            onClick={() => router.push("/")}
            ml='2'
            mr={{ base: "1", md: "4" }}
            rounded='full'
            fontWeight='light'
            bg='blue.600'
            color='white'
            borderBottom='0.5px'
            borderBottomColor='gray.800'
            _hover={{
              bg: "#00abe1",
              borderBottom: "2px",
              borderBottomColor: "gray.200",
            }}>
            HOME
          </Button>
          <>
            {checkIsAdmin &&
              checkIsAdmin.map((user) => (
                <div key={user.id}>
                  {user.isAdmin && (
                    <Button
                      onClick={() => router.push("/admin")}
                      mr={{ base: "1", md: "4" }}
                      rounded='full'
                      fontWeight='light'
                      bg='blue.600'
                      color='white'
                      borderBottom='0.5px'
                      borderBottomColor='gray.800'
                      _hover={{
                        bg: "#00abe1",
                        borderBottom: "2px",
                        borderBottomColor: "gray.200",
                      }}>
                      ADMIN
                    </Button>
                  )}
                </div>
              ))}
          </>

          <Button
            onClick={() => router.push("/repay")}
            mr={{ base: "1", md: "4" }}
            rounded='full'
            fontWeight='light'
            bg='blue.600'
            color='white'
            borderBottom='0.5px'
            borderBottomColor='gray.800'
            _hover={{
              bg: "#00abe1",
              borderBottom: "2px",
              borderBottomColor: "gray.200",
            }}>
            REPAY LOAN
          </Button>
          {/* <Box mr='4'>
            <PaystackModal />
          </Box> */}
          {user && (
            <Button
              onClick={signOut}
              variant='outline'
              border='2px'
              rounded='full'
              fontWeight='light'
              // fontSize='lg'
              color='red'
              borderColor='red.600'
              _hover={{ bg: "red.600", color: "white" }}>
              Sign out
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NavHeader;
