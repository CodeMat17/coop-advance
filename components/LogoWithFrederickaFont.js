import { Box, Text } from "@chakra-ui/react";
import { fredericka } from "./FrederickaFont";

const LogoWithFrederikaFont = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgGradient='linear(to-l, green , #ffa101, #f32ac2)'
      px='1'
      py='1'
      rounded='full'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        bg='white'
        rounded='full'
        px='1'
        py='0'>
        <div className={fredericka.className}>
          <Text
            bgGradient='linear(to-l, #f32ac2, #ffa101, green)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='bold'
            textAlign='center'>
            CA
          </Text>
        </div>
        {/* <Text color='black'>CA</Text> */}
      </Box>
    </Box>
  );
};

export default LogoWithFrederikaFont;
