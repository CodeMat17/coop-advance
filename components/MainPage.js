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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ApprovedLoanCard from "./ApprovedLoanCard";
import FrederickaHeader from "./FrederickaHeader";

const MainPage = ({ id, role, full_name, phone_no, file_no, status }) => {
  const supabase = useSupabaseClient();

  const toast = useToast();
  const router = useRouter();
  const format = (val) => `₦` + val;
  const parse = (val) => val.replace(/^\₦/, "");
  const [amount, setAmount] = useState(0.0);
  const [fileno, setFileno] = useState("");
  const [notMatch, setNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loanData, setLoanData] = useState();

  useEffect(() => {
    const loanProfile = async () => {
      let { data: loans } = await supabase
        .from("loans")
        .select("*")
        .eq("user_id", id);
      setLoanData(loans);
    };
    // Only run query once status === approved.
    if (status === "approved") loanProfile();
  }, [status]);

  console.log("loan data", loanData);

  const loanRequest = async () => {
    setLoading(true);
    setNotMatch(false);

    if (fileno != file_no) {
      setNotMatch(true);
      setLoading(false);
    }

    if (fileno === file_no) {
      try {
        const { error } = await supabase.from("loans").upsert([
          {
            user_id: id,
            amount,
            file_no: fileno,
            full_name,
            phone_no,
            status: "processing",
          },
        ]);
        await supabase
          .from("profiles")
          .update({ status: "processing" })
          .eq("id", id);

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
          {role === null && (
            <>
              <Text key={id} textAlign='center'>
                Welcome {full_name}, to be eligible for a loan request, kindly
                contact the Admin for verification.
              </Text>
            </>
          )}
          {role === "verified" && (
            <Box maxW='xs' mx='auto'>
              <Text textAlign='center'>
                Please enter your loan request details below.
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
                  <Text>File No. mismatch</Text>
                  <Text>Check your file no. and try again</Text>
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
                  precision={2}
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
                  Enter File No.
                </FormLabel>
                <Input
                  placeholder='Enter your file No. here'
                  value={fileno}
                  onChange={(e) => setFileno(e.target.value)}
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
                isDisabled={!amount || !file_no || file_no.length < 3}
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
          shadow='lg'
          mt='4'
          py='6'
          px='4'
          bg='gray.50'
          border='1px'
          borderColor='gray.200'
          rounded='lg'>
          <Text textAlign='center' textTransform='uppercase'>
            application status: Processing
          </Text>
        </Box>
      )}
      {status === "approved" && (
        <>
          <Text textAlign='center' textTransform='uppercase'>
            application status: Approved
          </Text>
          {loanData &&
            loanData.map((data) => (
              <ApprovedLoanCard key={data.id} {...data} />
            ))}
        </>
        // <Box
        //   shadow='lg'
        //   mt='4'
        //   py='6'
        //   px='4'
        //   bg='gray.50'
        //   border='1px'
        //   borderColor='gray.200'
        //   rounded='lg'>
        //   <Text textAlign='center' textTransform='uppercase'>
        //     application status: Approved
        //   </Text>
        //   {loanData &&
        //     loanData.map((data) => (
        //       <ApprovedLoanCard key={data.id} {...data} />
        //     ))}
        // </Box>
      )}
    </Box>
  );
};

export default MainPage;
