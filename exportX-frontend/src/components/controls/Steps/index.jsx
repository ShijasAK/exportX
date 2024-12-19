import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";

const Steps = ({
  stepsArray = [],
  activeIndex,
  dividerProps,
  textProps,
  hstackProps,
  iconProps,
}) => {
  const { colorMode } = useColorMode();
  //   const stepsArray = [
  //     "Project Details",
  //     "Output Set",
  //     "More About",
  //     "Content Ideas",
  //   ];

  //   const activeIndex = 1;
  return (
    <Flex flexDir={"column"} justify={"center"} align={"center"}>
      <HStack
        spacing={"0"}
        divider={
          <Divider
            h="2px"
            bg={getColor(colorKeys.primary, colorMode)}
            w="150px"
            {...dividerProps}
          />
        }
      >
        {stepsArray.map((item, index) => (
          <Box
            p="2"
            rounded={"full"}
            bg={
              activeIndex !== undefined && index <= activeIndex
                ? "#D2D2D2"
                : "#fff"
            }
            border={
              activeIndex !== undefined &&
              index >= activeIndex &&
              "2px solid #D2D2D2"
            }
            key={index}
          >
            <Flex
              align={"center"}
              justify={"center"}
              w="21px"
              h="21px"
              rounded="full"
              bg={
                activeIndex !== undefined && index <= activeIndex
                  ? "#232323"
                  : "#DCDCDC"
              }
              color={"#fff"}
              fontSize={"9px"}
              {...iconProps}
            >
              {activeIndex !== undefined && index <= activeIndex ? (
                <Icon
                  key={index}
                  color={"#fff"}
                  as={APP_ICONS.CHECK}
                  w="8px"
                  h="8px"
                  bg="#232323"
                  rounded={"full"}
                />
              ) : (
                index + 1
              )}
            </Flex>
          </Box>
        ))}
      </HStack>
      <HStack mt={1} spacing={"115px"} {...hstackProps}>
        {stepsArray.map((item, index) => (
          <Box key={index}>
            <Text fontSize={"14px"} {...textProps} color="#353535">
              {item}
            </Text>
          </Box>
        ))}
      </HStack>
    </Flex>
  );
};

export default Steps;
