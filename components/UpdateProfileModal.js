import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import FrederickaHeader from "./FrederickaHeader";

const UpdateProfileModal = ({ userEmail, userId }) => {
  const toast = useToast();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState(userEmail);
  const [full_name, setFullname] = useState("");
  const [file_no, setFileno] = useState("");
  const [phone_no, setPhoneno] = useState("");
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ email, full_name, file_no, phone_no })
        .eq("id", userId);

      if (error) {
        console.log("err msg", error.message);
        throw error;
      }

      toast({
        title: "Done!",
        description: "Profile updated!",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error!",
        description: `Something went wrong: ${error.message}`,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
      router.replace(router.asPath)
      // router.reload(window.location.pathname);
    }
  };

  return (
    <Box px='4'>
      <FrederickaHeader />
      <Text textAlign='center' color='gray.400'>
        Update your profile data to continue.
      </Text>
      <Button
        w='full'
        fontWeight='light'
        mt='8'
        bg='#00abe1'
        py='6'
        onClick={onOpen}>
        UPDATE PROFILE
      </Button>
      <Modal
        isCentered
        motionPreset='slideInBottom'
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx='4' rounded='lg' overflow='hidden'>
          <ModalHeader bg='green' color='white'>
            Update Your Profile
          </ModalHeader>
          <ModalCloseButton color='red' />
          <ModalBody>
            <Box py='4'>
              <FormControl mb='4'>
                <FormLabel fontSize='sm' mb='0'>
                  Email
                </FormLabel>
                <Input value={email} isDisabled />
              </FormControl>
              <FormControl mb='4' isRequired>
                <FormLabel fontSize='sm' mb='0'>
                  Fullname
                </FormLabel>
                <Input
                  value={full_name}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder='Enter your fullname here'
                />
              </FormControl>
              <FormControl mb='4' isRequired>
                <FormLabel fontSize='sm' mb='0'>
                  File No.
                </FormLabel>
                <Input
                  value={file_no}
                  onChange={(e) => setFileno(e.target.value)}
                  placeholder='Enter your file no, here'
                />
              </FormControl>
              <FormControl mb='4' isRequired>
                <FormLabel fontSize='sm' mb='0'>
                  Phone No.
                </FormLabel>
                <Input
                  value={phone_no}
                  onChange={(e) => setPhoneno(e.target.value)}
                  placeholder='Enter your file no, here'
                />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent='space-between'>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={updateProfile}
              isLoading={loading}
              isDisabled={
                !full_name.trim() ||
                !file_no.trim() ||
                full_name.length < 3 ||
                file_no.length > 3 ||
                !phone_no.trim() ||
                phone_no.length < 11 ||
                phone_no.length > 11
              }
              variant='outline'
              color='green'
              borderColor='green.200'>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UpdateProfileModal;
