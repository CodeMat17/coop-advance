import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const SignIn = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [switchTab, setSwitchTab] = useState(true);

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${location.origin}/auth/callback`,
      // },
    });
    if (error) {
      setError(`${error.message}`);
    }
    if (!error) {
      setSubmitted(true);
    }
    setLoading(false);
    // router.reload();
  };

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(`${error.message}`);
    }
    if (!error) {
      router.reload();
      router.push("/");
    }
    setLoading(false);
  };

  const switchTabButt = () => {
    if (switchTab) {
      setSwitchTab(false);
    } else {
      setSwitchTab(true);
    }
  };

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
    <Box>
      <Text mt='8' textAlign='center' color='green' fontSize='lg'>
        {switchTab ? "Sign in " : "Sign up"}
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
          {error}
        </Box>
      )}

      <Box py='4'>
        <FormControl mb='4'>
          <FormLabel mb='0' color='gray.500' fontSize='sm' fontWeight='light'>
            Email address
          </FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            shadow='md'
            rounded='full'
            py='6'
            placeholder='Enter your email address here'
          />
        </FormControl>
        <FormControl mb='4'>
          <FormLabel mb='0' color='gray.500' fontSize='sm' fontWeight='light'>
            Password
          </FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            shadow='md'
            rounded='full'
            py='6'
            placeholder='Enter your password here'
          />
        </FormControl>
        {switchTab ? (
          <>
            <Button
              onClick={handleSignIn}
              w='full'
              py='6'
              mt='4'
              rounded='full'
              fontWeight='light'
              color='#ffa101'
              shadow='md'
              bgGradient='linear(to-l, #ffa101, green, green)'
              _hover={{
                color: "white",
                bgGradient: "linear(to-l, #ffa101, #ffa101, green)",
              }}
              isDisabled={!email.trim() || !password.trim()}
              isLoading={loading}
              loadingText='Signing in...'>
              Sign In
            </Button>

            {loading ? (
              <Text textAlign='center' mt='4'>
                Please wait...
              </Text>
            ) : (
              <Box mt='4' textAlign='center' fontSize='sm'>
                If you are new -{" "}
                <chakra.span
                  onClick={switchTabButt}
                  bg='blue.100'
                  rounded='full'
                  px='1'
                  cursor='pointer'>
                  Sign Up
                </chakra.span>
              </Box>
            )}
          </>
        ) : (
          <>
            <Button
              onClick={handleSignUp}
              w='full'
              py='6'
              mt='4'
              rounded='full'
              fontWeight='light'
              color='#ffa101'
              shadow='md'
              bgGradient='linear(to-l, #ffa101, green, green)'
              _hover={{
                color: "white",
                bgGradient: "linear(to-l, #ffa101, #ffa101, green)",
              }}
              isDisabled={!email.trim() || !password.trim()}
              isLoading={loading}
              loadingText='Signing up...'>
              Sign Up
            </Button>

            {loading ? (
              <Text textAlign='center' mt='4'>
                Please wait...
              </Text>
            ) : (
              <Box mt='4' textAlign='center' fontSize='sm'>
                If you have already signed up -{" "}
                <chakra.span
                  onClick={switchTabButt}
                  bg='blue.100'
                  rounded='full'
                  px='1'
                  cursor='pointer'>
                  Sign In
                </chakra.span>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SignIn;
