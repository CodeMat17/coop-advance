import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { fredericka } from "./FrederickaFont";
import PaystackModal from "./PaystackModal";

const MobileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <Box display={{ base: "flex", sm: "none" }}>
      <IconButton
        onClick={onOpen}
        icon={<HiOutlineMenuAlt3 size={30} />}
        bg='blue.900'
        _hover={{ bg: "blue.600" }}
      />

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            <div className={fredericka.className}>
              <Text
                bgGradient='linear(to-l, #f32ac2, #ffa101, green)'
                bgClip='text'
                fontSize='2xl'
                fontWeight='bold'>
                COOP Advance
              </Text>
            </div>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box my='4'>
                <PaystackModal />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={signOut} colorScheme='green'>
              Sign out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
