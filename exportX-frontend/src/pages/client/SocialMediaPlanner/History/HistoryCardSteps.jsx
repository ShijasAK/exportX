import { useColorMode } from "@chakra-ui/react";
import React from "react";
import { Box, Divider, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import { Briefcase, ProfileCircle, Timer, UserOctagon } from "iconsax-react";
import { BiQuestionMark } from "react-icons/bi";

const getStepIcon = (index) => {
  switch (index) {
    case 0:
      return ProfileCircle;
    case 1:
      return UserOctagon;
    case 2:
      return Briefcase;
    default:
      return BiQuestionMark;
  }
};

const HistoryCardSteps = ({
  stepsArray = [],
  activeIndex = 0,
  dividerProps,
  textProps,
  hstackProps,
  iconProps,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Flex flexDir={"column"} justify={"center"} align={"center"}>
      <HStack
        spacing={"0"}
        divider={<Divider h="2px" bg={"#ECECEC"} w="150px" {...dividerProps} />}
      >
        {stepsArray.map((item, index) => (
          <Box
            p="2"
            rounded={"full"}
            bg={index <= activeIndex ? "#000000" : "#D4D4D4"}
            // border={index >= activeIndex && "2px solid #D2D2D2"}
            key={index}
          >
            <Flex
              align={"center"}
              justify={"center"}
              w="23.27px"
              h="23.27px"
              rounded="full"
              //   bg={index <= activeIndex ? "#232323" : "#DCDCDC"}
              color={"#fff"}
              fontSize={"9px"}
              {...iconProps}
            >
              {index <= activeIndex ? (
                <Flex key={index} flexDir={"column"} alignItems={"center"}>
                  <Box mt={3}>
                    <Icon
                      color={"#FF5017"}
                      as={getStepIcon(index)}
                      w="23.27px"
                      h="23.27px"
                      rounded={"full"}
                    />
                  </Box>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    mt={"-4px"}
                    w="14px"
                    h="14px"
                    rounded={"full"}
                    bg={"#B8FFDE"}
                  >
                    <Icon
                      as={APP_ICONS.CHECK}
                      boxSize={3}
                      p="2px"
                      bg="#0D894F"
                      rounded={"full"}
                    />
                  </Flex>
                </Flex>
              ) : (
                <Flex key={index} flexDir={"column"} alignItems={"center"}>
                  <Box mt={3}>
                    <Icon
                      color={"#fff"}
                      as={getStepIcon(index)}
                      w="23.27px"
                      h="23.27px"
                      rounded={"full"}
                    />
                  </Box>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    mt={"-4px"}
                    w="14px"
                    h="14px"
                    rounded={"full"}
                    bg={"#FFECD0"}
                  >
                    <Icon
                      boxSize={3}
                      p="2px"
                      as={Timer}
                      bg="#FBC068"
                      rounded={"full"}
                    />
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Box>
        ))}
      </HStack>
    </Flex>
  );
};

export default HistoryCardSteps;
