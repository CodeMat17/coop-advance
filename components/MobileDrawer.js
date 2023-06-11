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
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { fredericka } from "./FrederickaFont";

const MobileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const gotoHome = () => {
    router.push("/");
    onClose();
  };

  const gotoAdmin = () => {
    router.push("/admin");
    onClose();
  };

  const gotoRepay = () => {
    router.push("/repay");
    onClose();
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    onClose();
    router.push("/");
  };

  const [checkIsAdmin, setCheckIsAdmin] = useState([]);

  useEffect(() => {
    const checkIsAdmin = async () => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("isAdmin, id")
        .eq("id", user.id);
      if (!error) {
        setCheckIsAdmin(data);
      }
    };
    if (user) checkIsAdmin();
  }, [user]);

  return (
    <Box display={{ base: "flex", md: "none" }}>
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
            <Stack spacing='24px' pt='6'>
              <Button onClick={gotoHome} w='full' size='lg' color='green'>
                HOME
              </Button>
              {checkIsAdmin &&
                checkIsAdmin.map((user) => (
                  <div key={user.id}>
                    {user.isAdmin && (
                      <Button
                        onClick={gotoAdmin}
                        w='full'
                        size='lg'
                        color='green'>
                        ADMIN
                      </Button>
                    )}
                  </div>
                ))}

              <Button onClick={gotoRepay} w='full' size='lg' color='green'>
                REPAY LOAN
              </Button>
            
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            {user && (
              <Button onClick={signOut} colorScheme='red'>
                Sign out
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
