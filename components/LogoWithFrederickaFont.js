import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const LogoWithFrederikaFont = () => {
  return (
    <>
      <Box display='flex' alignItems='center'>
       <Box rounded='full'>
          <Image alt='' width={80} height={0} src='/logo.webp' />
         </Box>
        <Box fontWeight='semibold' lineHeight='none' bgClip='text' bgGradient='linear(to-tl, #ec6d25, #086daf)' >
          <Text>COOP</Text>
          <Text>Advance</Text>
        </Box>
      </Box>
    </>
  );
};

export default LogoWithFrederikaFont;
