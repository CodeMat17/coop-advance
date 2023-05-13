import { Box, Button } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import LogoWithFrederikaFont from "../components/LogoWithFrederickaFont";
import MobileDrawer from "./MobileDrawer";
import PaystackModal from "./PaystackModal";

const NavHeader = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <Box bg='blue.700' p='4'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        color='white'>
        <LogoWithFrederikaFont />
        <MobileDrawer />
        <Box display={{ base: "none", sm: "flex" }}>
          <Box mr='4'>
            <PaystackModal />
          </Box>

          <Button
            onClick={signOut}
            variant='outline'
            rounded='full'
            fontWeight='light'
            fontSize='lg'
            borderColor='blue.900'
            _hover={{ bg: "blue.900" }}>
            Sign out
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NavHeader;
