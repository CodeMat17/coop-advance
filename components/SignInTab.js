import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Field, Formik } from "formik";
import { useState } from "react";

export default function App({ changeTab }) {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const toast = useToast();

  const session = useSession();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error);
      }
      if (data) {
        toast({
          title: "Done!",
          description: "You have successfully signed in.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        setData(data);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
      switchTabs();
    }
  };

  console.log("data", data);
  console.log("session", session);

  const switchTabs = () => {
    if (changeTab) {
      changeTab(true);
    } else {
      changeTab(false);
    }
  };

  return (
    <>
      {error && (
        <Box
          mx='auto'
          maxW='xs'
          textAlign='center'
          bg='red.100'
          color='red'
          rounded='lg'
          p='4'
          mt='2'
          fontSize='sm'
          fontWeight='light'>
          {error}
        </Box>
      )}
      <Flex align='center' justify='center'>
        <Box bg='white' p={6} rounded='md' maxW='xs' shadow='2xl' mt='4'>
          <Text mb='6' textAlign='center' color='green' fontSize='lg'>
            Sign In
          </Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            onSubmit={(values) => onSubmit(values)}>
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align='flex-start'>
                  <FormControl>
                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                    <Field
                      as={Input}
                      id='email'
                      name='email'
                      type='email'
                      variant='filled'
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Field
                      as={Input}
                      id='password'
                      name='password'
                      type='password'
                      variant='filled'
                      validate={(value) => {
                        let error;

                        if (value.length < 6) {
                          error = "Password must contain at least 6 characters";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button
                    type='submit'
                    width='full'
                    py='6'
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
                </VStack>
              </form>
            )}
          </Formik>
          <Text pt='2' fontSize='sm'>
            <chakra.span color='red' fontSize='lg'>
              *
            </chakra.span>{" "}
            If you have not signed up already,{" "}
            <chakra.span
              color='blue'
              cursor='pointer'
              onClick={switchTabs}
              _hover={{ color: "green" }}>
              Sign Up
            </chakra.span>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
