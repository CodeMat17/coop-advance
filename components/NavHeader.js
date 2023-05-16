import { Box, Button } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import LogoWithFrederikaFont from "../components/LogoWithFrederickaFont";
import MobileDrawer from "./MobileDrawer";
import PaystackModal from "./PaystackModal";

const NavHeader = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <Box bg='#161f6d' p='4'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        color='white'>
        <LogoWithFrederikaFont />
        <MobileDrawer />
        <Box display={{ base: "none", sm: "flex" }}>
          <Button
            // onClick={onOpen}
            mr='4'
            rounded='full'
            // fontSize='lg'
            // fontWeight='light'
            bg='#00abe1'
            color='white'
            _hover={{ bg: "blue.600" }}>
            Admin
          </Button>
          <Box mr='4'>
            <PaystackModal />
          </Box>
          {user && (
            <Button
              onClick={signOut}
              variant='outline'
              border='2px'
              rounded='full'
              // fontWeight='light'
              // fontSize='lg'
              color='red'
              borderColor='red'
              _hover={{ bg: "red", color: 'white' }}>
              Sign out
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NavHeader;
