import MainPage from "@/components/MainPage";
import SignIn from "@/components/SignIn";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { Box } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const userId = user?.id;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", userId);
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  if (!user) return <SignIn />;

  return (
    <>
      <Head>
        <title>Coop Loan</title>
        <meta name='description' content='NFVCB Cooperative Loan App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Box w='full' minH='80vh'>
          <Box maxW='sm' mx='auto' pt='12'>
            <Box>
              <>
                {data &&
                  data.map((item) => (
                    <div key={item.id}>
                      {item.full_name === null ? (
                        <UpdateProfileModal
                          userEmail={user.email}
                          userId={user.id}
                        />
                      ) : (
                        <MainPage {...item} />
                      )}
                    </div>
                  ))}
              </>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}

// export const getServerSideProps = async (ctx) => {
//   // Create authenticated Supabase Client
//   const supabase = createServerSupabaseClient(ctx);

//   // Check if we have a session
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const userId = user?.id;

//   const { data } = await supabase.from("profiles").select("*").eq("id", userId);

//   return {
//     props: {
//       user,
//       profile: data ?? [],
//     },
//   };
// };
