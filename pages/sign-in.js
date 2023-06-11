import { Box, Text } from "@chakra-ui/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Fredericka_the_Great } from "next/font/google";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";

const fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  weight: "400",
});

const SignIn = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  if (session) {
    router.push("/");
  }

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
          This service is strictly for the registered members of NFVCB
          Cooperative Soceity.
        </Text>

        <LoginForm />
      </Box>
    </Box>
  );
};

export default SignIn;
