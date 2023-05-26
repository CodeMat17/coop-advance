import { Box, Text } from "@chakra-ui/react";
import { fredericka } from "./FrederickaFont";

const LogoWithFrederikaFont = () => {
  return (
    <>
      <Box pos='relative'>
        <Box
          bg='yellow.600'
          color='yellow.600'
          w='15'
          fontSize='3xl'
          transform='rotate(135deg)'
          p='1'
          rounded='lg'>
          CA
        </Box>
        <Box
          pos='absolute'
          top='0'
          bg='green.500'
          opacity='0.6'
          color='green.500'
          w='15'
          fontSize='3xl'
          p='1'
          rounded='lg'>
          CA
        </Box>
        <Box
          pos='absolute'
          top='0'
          fontSize='3xl'
          display='flex'
          justifyContent='center' color=''
          p='1'>
          <div
            // className={fredericka.className}
          >CA</div>
        </Box>
      </Box>
    </>
  );
};

export default LogoWithFrederikaFont;
