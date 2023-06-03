import SignIn from "@/components/SignIn";
import { Box } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ session, profiles, loans }) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const userId = user?.id;
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", userId);
      setProfile(data);
    }

    const timer = setTimeout(() => {
      setSpinner(false);
      if (!user) {
        return <SignIn />;
      }
      if (user) loadData();
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <>
      <Head>
        <title>Coop Advance</title>
        <meta name='description' content='NFVCB Cooperative Loan Advance App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Box w='full' minH='80vh'>
          <Box
            px='8'
            py='20'
            maxW='md'
            mx='auto'
            textAlign='center'
            fontSize='lg'>
            This page is on maintenance. Kindly sit back and wait for the next
            announcement.
          </Box>
          {/* <Box maxW='sm' mx='auto' pt='12'>
            {spinner ? (
              <Loader />
            ) : (
              <>
                {!user ? (
                  <SignIn />
                ) : (
                  <>
                    {profile &&
                      profile.map((item) => (
                        <div key={item.id}>
                          {item.full_name === null ? (
                            <UpdateProfileModal
                              userEmail={user.email}
                              userId={user.id}
                            />
                          ) : (
                            <MainPage {...item} loans={loans} />
                          )}
                        </div>
                      ))}
                  </>
                )}
              </>
            )}
          </Box> */}
        </Box>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);
  const { data: loans } = await supabase
    .from("loans")
    .select("*")
    .eq("user_id", userId);

  return {
    props: {
      session,
      user,
      profiles,
      loans,
    },
  };
};
