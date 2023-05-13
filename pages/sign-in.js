import { Box, Text, useToast } from "@chakra-ui/react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Fredericka_the_Great } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import SignInTab from "../components/SignInTab";
import SignUpTab from "../components/SignUpTab";

const fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  weight: "400",
});

const SignIn = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authTabs, setAuthTabs] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("session", session);
  console.log("user", user);

  return (
    <Box px='4' py={{ base: 6, sm: 8, md: 12 }} bg='gray.50'>
      <Box maxW='sm' mx='auto'>
        <div className={fredericka.className}>
          <Text
            bgGradient='linear(to-l, #f32ac2, #ffa101, green)'
            bgClip='text'
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight='bold'
            textAlign='center'>
            COOP Loan
          </Text>
        </div>
        <Text textAlign='center' color='gray' maxW='xs' mx='auto' fontSize='sm'>
          This service is strickly for the registered members of NFVCB
          Cooperative Soceity.
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
            {error.message}
          </Box>
        )}

        {authTabs ? (
          <SignUpTab changeTab={setAuthTabs} />
        ) : (
          <SignInTab changeTab={setAuthTabs} />
        )}
        {/* {loginTabs ? (
          <Box py='6'>
            <Text mb='6' textAlign='center' color='green' fontSize='lg'>
              Sign in
            </Text>
            <FormControl mb='4'>
              <FormLabel
                mb='0'
                color='gray.500'
                fontSize='sm'
                fontWeight='light'>
                Email address
              </FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                shadow='md'
                placeholder='Enter your email address here'
              />
            </FormControl>
            <FormControl mb='4'>
              <FormLabel
                mb='0'
                color='gray.500'
                fontSize='sm'
                fontWeight='light'>
                Password
              </FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type='text'
                shadow='md'
                placeholder='Enter your password here'
              />
            </FormControl>
            <Button
              onClick={() => signInFn()}
              w='full'
              py='6'
              mt='6'
              fontWeight='light'
              color='#ffa101'
              shadow='md'
              bgGradient='linear(to-l, #ffa101, green, green)'
              _hover={{
                color: "white",
                bgGradient: "linear(to-l, #ffa101, #ffa101, green)",
              }}
              isLoading={loading}>
              Sign In
            </Button>
            <Text pt='2' fontSize='sm'>
              <chakra.span color='red' fontSize='lg'>
                *
              </chakra.span>{" "}
              If you have not signed up already,{" "}
              <chakra.span color='blue' cursor='pointer' onClick={switchTabs}>
                Sign Up
              </chakra.span>
            </Text>
          </Box>
        ) : (
          <Box py='6'>
            <Text mb='6' textAlign='center' color='green' fontSize='lg'>
              Sign up
            </Text>
            <FormControl mb='4'>
              <FormLabel
                mb='0'
                color='gray.500'
                fontSize='sm'
                fontWeight='light'>
                Email address
              </FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                shadow='md'
                placeholder='Enter your email address here'
              />
            </FormControl>
            <FormControl mb='4'>
              <FormLabel
                mb='0'
                color='gray.500'
                fontSize='sm'
                fontWeight='light'>
                Password
              </FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type='text'
                shadow='md'
                placeholder='Enter your password here'
              />
            </FormControl>
            <Button
              onClick={() => signUpFn()}
              w='full'
              py='6'
              mt='6'
              // fontSize='sm'
              fontWeight='light'
              color='#ffa101'
              shadow='md'
              bgGradient='linear(to-l, #ffa101, green, green)'
              _hover={{
                color: "white",
                bgGradient: "linear(to-l, #ffa101, #ffa101, green)",
              }}
              isLoading={loading}>
              Sign Up
            </Button>
            <Text pt='2' fontSize='sm'>
              <chakra.span color='red' fontSize='lg'>
                *
              </chakra.span>{" "}
              If you have signed up already,{" "}
              <chakra.span color='blue' cursor='pointer' onClick={switchTabs}>
                LOGIN
              </chakra.span>
            </Text>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default SignIn;
