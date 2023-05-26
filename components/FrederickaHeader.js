import { Text } from "@chakra-ui/react";
import { fredericka } from "./FrederickaFont";

const FrederickaHeader = () => {
  return (
    <div
      // className={fredericka.className}
    >
      <Text
        bgGradient='linear(to-l, #f32ac2, #ffa101, #161f6d)'
        bgClip='text'
        fontSize={{ base: "4xl", md: "5xl" }}
        fontWeight='bold'
        textAlign='center'>
        COOP Advance
      </Text>
    </div>
  );
};

export default FrederickaHeader;
