import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

const Repay = () => {
  const [email, setEmail] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  let amount = parseInt(repayAmount);

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100,
    publicKey: "pk_test_01fc1183b5664f5c293f2f729aa4c876f0bfffd6",
    metadata: {
      email,
      amount: amount * 100,
      //   images: JSON.stringify(items.map((item) => item.name)),
    },
  };

  const onSuccess = (reference) => {
    console.log("reference", reference);
    //    router.push("/order-received");
  };

  const onClose = () => {
    console.log("Payment Closed");
    alert("Opps, Payment not completed. Please try again");
  };

  const PayStackHook = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <Box>
        <Button
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
          w='full'
          py='6'
          mt='8'
          rounded='full'
          fontWeight='light'
          color='#ffa101'
          shadow='md'
          bgGradient='linear(to-l, #ffa101, green, green)'
          _hover={{
            color: "white",
            bgGradient: "linear(to-l, #ffa101, #ffa101, green)",
          }}
          //   isLoading={loading}
        >
          REPAY NOW
        </Button>
      </Box>
    );
  };

  return (
    <Box maxW='sm' mx='auto' py='20' px='8'>
      <Text textAlign='center' fontSize='xl'>
        You want to repay your loan?
      </Text>
      <Text textAlign='center'>...that&apos;s a good move.</Text>
      <Box mt='8' pb='4'>
        <FormLabel fontSize='sm' mb='0'>
          Email
        </FormLabel>
        <FormControl>
          <Input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            rounded='full'
            placeholder='Enter your email address'
          />
        </FormControl>
      </Box>
      <Box pb='4'>
        <FormLabel fontSize='sm' mb='0'>
          Amount
        </FormLabel>
        <FormControl>
          <InputGroup rounded='full'>
            <InputLeftAddon children='₦' />
            <Input
              type='tel'
              onChange={(e) => setRepayAmount(e.target.value)}
              rounded='full'
              placeholder='Enter repayment amount'
            />
          </InputGroup>
        </FormControl>
      </Box>
      <PayStackHook />
    </Box>
  );
};

export default Repay;
