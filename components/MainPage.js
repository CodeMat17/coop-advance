import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ApprovedLoanCard from "./ApprovedLoanCard";
import FrederickaHeader from "./FrederickaHeader";

const MainPage = ({
  id,
  verify,
  full_name,
  phone_no,
  ippis_no,
  location,
  status,
  loan,
}) => {
  const supabase = useSupabaseClient();

  const toast = useToast();
  const router = useRouter();
  const format = (val) => `₦` + val;
  const parse = (val) => val.replace(/^\₦/, "");
  const [amount, setAmount] = useState(0.0);
  const [ippisno, setIPPISno] = useState("");
  const [notMatch, setNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loanData, setLoanData] = useState();

  // useEffect(() => {
  //   const loanProfile = async () => {
  //     let { data: loans } = await supabase
  //       .from("loans")
  //       .select("*")
  //       .eq("user_id", id);
  //     setLoanData(loans);
  //   };
  //   // Only run query once status === approved.
  //   if (status === "approved") loanProfile();
  // }, [status]);

  const loanRequest = async () => {
    setLoading(true);
    setNotMatch(false);

    if (ippisno != ippis_no) {
      setNotMatch(true);
      setLoading(false);
    }

    if (ippisno === ippis_no) {
      try {
        const { data, error } = await supabase
          .from("loans")
          .upsert({
            user_id: id,
            amount,
            ippis_no,
            location,
            phone_no,
            full_name,
          })
          .select();
        if (data) {
          await supabase
            .from("profiles")
            .update({ status: "processing" })
            .eq("id", id)
            .select();
        }

        if (error) {
          throw error;
        }

        toast({
          title: "SENT!!",
          description: "Loan request sent.",
          status: "success",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        router.reload("/");
      }
    }
  };

  return (
    <Box px='4' pb='20'>
      <FrederickaHeader />
      {status === "inactive" && (
        <>
          {verify === null && (
            <Box
              key={id}
              maxW='sm'
              mx='auto'
              display='flex'
              flexDir='column'
              justifyContent='center'
              alignItems='center'>
              <Box
                pos='relative'
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <Image alt='' width={250} height={250} src='/welcome.svg' />
                <Text
                  pos='absolute'
                  bottom='1'
                  bg='#a99edb'
                  px='4'
                  py='1'
                  rounded='full'
                  opacity='0.9'>
                  {full_name}
                </Text>
              </Box>
              <Text textAlign='center' mt='2'>
                Your registration is complete. To apply for advance, kindly
                contact the admin for membership verification.
              </Text>
            </Box>
          )}
          {verify === "verified" && (
            <Box maxW='xs' mx='auto'>
              <Text textAlign='center'>
                Enter your loan advance request details below.
              </Text>
              {notMatch && (
                <Box
                  fontSize='sm'
                  display='flex'
                  flexDir='column'
                  alignItems='center'
                  justifyContent='center'
                  color='red'
                  bg='red.100'
                  py='4'
                  mt='2'
                  rounded='lg'>
                  <Text>IPPIS No. mismatch</Text>
                  <Text>Check your IPPIS no. and try again</Text>
                </Box>
              )}
              <FormControl mt='8' mb='6'>
                <FormLabel fontSize='sm' mb='0' color='gray'>
                  Enter amount
                </FormLabel>
                <NumberInput
                  size='lg'
                  onChange={(amountString) => setAmount(parse(amountString))}
                  value={format(amount)}
                  step={5000}
                  // precision={2}
                  defaultValue={5000}
                  min={5000}
                  max={50000}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Box display='flex' justifyContent='space-between'>
                  <FormHelperText
                    fontWeight='light'
                    fontSize='xs'
                    color='red.400'>
                    Min. ₦5,000
                  </FormHelperText>
                  <FormHelperText
                    fontWeight='light'
                    fontSize='xs'
                    color='red.400'>
                    Max. ₦50,000
                  </FormHelperText>
                </Box>
              </FormControl>
              <FormControl mb='4'>
                <FormLabel fontSize='sm' mb='0' color='gray'>
                  IPPIS No.
                </FormLabel>
                <Input
                  placeholder='Enter your IPPIS No. here'
                  value={ippisno}
                  onChange={(e) => setIPPISno(e.target.value)}
                />
              </FormControl>
              <Text fontSize='xs' lineHeight='3' mb='2' fontWeight='light'>
                <chakra.span fontSize='lg' color='red'>
                  *
                </chakra.span>
                Admin charge of 5% of requested amount will be deducted from
                source.
              </Text>
              <Text fontSize='xs' lineHeight='3' fontWeight='light'>
                <chakra.span fontSize='lg' color='red'>
                  *
                </chakra.span>
                Loan MUST be repaid within 3 months from the date of approval.
              </Text>
              <Button
                onClick={loanRequest}
                isLoading={loading}
                isDisabled={
                  !amount ||
                  !ippis_no ||
                  ippis_no.length < 6 ||
                  ippis_no.length > 6
                }
                mt='8'
                py='6'
                fontWeight='light'
                colorScheme='green'
                w='full'
                rounded='full'>
                I accept terms, submit request
              </Button>
            </Box>
          )}
        </>
      )}
      {status === "processing" && (
        <Box
          maxW='sm'
          mx='auto'
          shadow='lg'
          mt='4'
          py='6'
          px='4'
          bg='gray.50'
          border='1px'
          borderColor='gray.200'
          rounded='lg'>
          <Box display='flex' flexDir='column' mb='4' alignItems='center'>
            <Image alt='' width={100} height={100} src='/thumbs.png' />
            <Text textAlign='center' fontSize=''>
              RECEIVED!
            </Text>
          </Box>
          <Text textAlign='center'>
            Check later to see if your loan advance request gets a green or red
            flag
          </Text>
        </Box>
      )}
      {status === "approved" && (
        <Box>
          {loan &&
            loan.map((item) => <ApprovedLoanCard key={item.id} {...item} />)}
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
