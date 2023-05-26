import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useState } from "react";
import FrederickaHeader from "./FrederickaHeader";

const SignIn = () => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setError(null);
    if (!email) {
      toast({
        title: "No Email!",
        description: "Please fill the email field.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
    if (email) {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
      });
      if (error) {
        console.log({ error });
        setError(error.error_description || error.message);
        toast({
          title: "Sent!",
          description: 'Something went wrong!',
          status: "error",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Sent!",
          // description: '',
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setSubmitted(true);
      }
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <Box py='32' px='4' display='flex' flexDir='column' alignItems='center'>
        <Image
          alt='check email'
          width={200}
          height={200}
          src='/new-message.svg'
        />
        <Text pt='2' textAlign='center' maxW='md' mx='auto'>
          Please check your email for a magic link to log in.
        </Text>
      </Box>
    );
  }

  return (
    <Box px='4' py='12' maxW='md' mx='auto'>
      <Box>
        <FrederickaHeader />
        <Text
          textAlign='center'
          color='gray'
          maxW='xs'
          mx='auto'
          fontSize='sm'>
          This service is strictly for the registered members of NFVCB
          Cooperative Soceity.
        </Text>
        <Text mt='12' textAlign='center' color='green' fontSize='lg'>
          Sign in / Sign up
        </Text>

        {error && (
          <Box
            textAlign='center'
            p='4'
            mt='4'
            rounded='lg'
            bg='red.100'
            color='red.500'
            fontSize='sm'
            fontWeight='light'>
            {error.error_description || error.message}
          </Box>
        )}

        <Box py='6' maxW='xs' mx='auto'>
          <FormControl mb='4'>
            <FormLabel mb='0' color='gray.500' fontSize='sm' fontWeight='light'>
              Email address
            </FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              shadow='md' rounded='full'
              placeholder='Enter your email address here'
            />
          </FormControl>
          <Button
            onClick={() => signIn()}
            w='full'
            py='6'
            mt='8' rounded='full'
            fontWeight='light'
            color='#ffa101'
            shadow='md'
            bgGradient='linear(to-l, #ffa101, green, green)'
            _hover={{
              color: "white",
              bgGradient: "linear(to-l, #ffa101, #ffa101, green)",
            }}
            isLoading={loading}>
            Get Login Link
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
