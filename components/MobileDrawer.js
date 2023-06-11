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
  useDisclosure,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

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
        bg='blue.700'
        color='#ec6d25'
        shadow='2xl'
        _hover={{ bg: "blue.600" }}
      />

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color='red' bg='red.100' />
          <DrawerHeader borderBottomWidth='1px' bg='gray.100'>
            <Image alt='' width={80} height={0} src='/logo.webp' />
          </DrawerHeader>

          <DrawerBody bg='blue.100'>
            <Stack spacing='24px' pt='6'>
              <Button
                onClick={gotoHome}
                w='full'
                size='lg'
                bg='blue.700'
                _hover={{ bg: "blue.800" }}
                color='#ec6d25'>
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
                        bg='blue.700'
                        _hover={{ bg: "blue.800" }}
                        color='#ec6d25'>
                        ADMIN
                      </Button>
                    )}
                  </div>
                ))}

              <Button
                onClick={gotoRepay}
                w='full'
                size='lg'
                bg='blue.700'
                _hover={{ bg: "blue.800" }}
                color='#ec6d25'>
                REPAY LOAN
              </Button>
            </Stack>
          </DrawerBody>

          <DrawerFooter
            borderTopWidth='1px'
            bg='gray.100'
            justifyContent='space-between'>
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
