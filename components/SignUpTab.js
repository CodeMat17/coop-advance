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
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Field, Formik } from "formik";
import { useState } from "react";

export default function App({ changeTab }) {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const toast = useToast();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      let { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) {
        setError(error);
        return;
      }
      toast({
        title: "Account created.",
        description: "We've created your account for you. You may now sign in.",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      setData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      switchTabs();
    }
  };

  console.log("data", data);

  const switchTabs = () => {
    if (changeTab) {
      changeTab(false);
    } else {
      changeTab(true);
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
            Sign Up
          </Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
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
                    Sign Up
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
          <Text pt='2' fontSize='sm'>
            <chakra.span color='red' fontSize='lg'>
              *
            </chakra.span>{" "}
            If you have signed up already,{" "}
            <chakra.span
              color='blue'
              cursor='pointer'
              onClick={switchTabs}
              _hover={{ color: "green" }}>
              Login
            </chakra.span>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
