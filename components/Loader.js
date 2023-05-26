import {
  Box,
  Image,
  keyframes,
  Text,
  usePrefersReducedMotion,
} from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Loader = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return (
    <Box
      minH='80vh'
      display='flex'
      flexDir='column'
      pt='12'
      alignItems='center'>
      <Box
        pos='relative'
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'>
        <Image
          alt='loader'
          w='150px'
          h='150px'
          src='/loader.webp'
          animation={animation}
        />
        <Text pos='absolute' bottom='0' textAlign='center' fontSize='sm'>
          Please wait
        </Text>
      </Box>
    </Box>
  );
};

export default Loader;
