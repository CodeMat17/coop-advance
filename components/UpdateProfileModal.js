import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
  const [ippis_no, setIPPISno] = useState("");
  const [phone_no, setPhoneno] = useState("");
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ email, full_name, ippis_no, phone_no, location })
        .eq("id", userId);

      if (error) {
        console.log("err msg", error.message);
        throw error;
      }
      if (!error) {
        router.reload(window.location.pathname);
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
      // router.replace(router.asPath);
    }
  };

  return (
    <Box px='4' maxW='sm' mx='auto'>
      <FrederickaHeader />
      <Text textAlign='center' color='gray.400'>
        Complete your registration data to continue.
      </Text>
      <Button
        w='full'
        fontWeight='light'
        mt='8'
        bg='#00abe1'
        py='6'
        onClick={onOpen}>
        COMPLETE REGISTRATION
      </Button>
      <Modal
        isCentered
        motionPreset='slideInBottom'
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx='4' rounded='lg' overflow='hidden'>
          <ModalHeader bg='blue.900' color='white'>
            Update Your Profile
          </ModalHeader>
          <ModalCloseButton color='red' />
          <ModalBody>
            <Box py='4'>
              <FormControl mb='2'>
                <FormLabel fontSize='sm' mb='0'>
                  Email
                </FormLabel>
                <Input value={email} isDisabled />
              </FormControl>
              <FormControl mb='2' isRequired>
                <FormLabel fontSize='sm' mb='0'>
                  Fullname
                </FormLabel>
                <Input
                  type='text'
                  value={full_name}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder='Enter your fullname here'
                />
                {full_name.length < 6 && (
                  <FormHelperText mt='0' color='red.500' fontSize='xs'>
                    Name cannot be less than 6 characters
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl mb='2' isRequired>
                <FormLabel fontSize='sm' mb='0'>
                 Zone/Centre
                </FormLabel>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder='Enter your Zone/Centre here'
                />
              
              </FormControl>
              <FormControl mb='2' isRequired>
                <FormLabel fontSize='sm' mb='0'>
                  IPPIS No.
                </FormLabel>
                <Input
                  value={ippis_no}
                  onChange={(e) => setIPPISno(e.target.value)}
                  placeholder='Enter your IPPIS no, here'
                />
                {ippis_no.length < 6 && (
                  <FormHelperText mt='0' color='red.500' fontSize='xs'>
                    IPPIS no. cannot be less than 6 digits
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl mb='2' isRequired>
                <FormLabel fontSize='sm' mb='0'>
                  Phone No.
                </FormLabel>
                <Input
                  value={phone_no}
                  onChange={(e) => setPhoneno(e.target.value)}
                  placeholder='Enter your file no, here'
                />
                {phone_no.length < 11 && (
                  <FormHelperText mt='0' color='red.500' fontSize='xs'>
                    Standard phone no is 11 digits
                  </FormHelperText>
                )}
                {phone_no.length > 11 && (
                  <FormHelperText mt='0' color='red.500' fontSize='xs'>
                    Standard phone no is 11 digits
                  </FormHelperText>
                )}
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
                !ippis_no.trim() ||
                full_name.length < 6 ||
                ippis_no.length > 6 ||
                !phone_no.trim() ||
                phone_no.length < 11 ||
                phone_no.length > 11
              }
              variant='outline'
              color='blue.900'
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
