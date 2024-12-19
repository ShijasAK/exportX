import {
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../config/constants/colors";
import Logo from "../../../components/SVGComponents/Logo";
import APP_IMAGES from "../../../config/constants/images";
import ResetForm from "./ResetForm";

const Login = () => {
  const { colorMode } = useColorMode();
  return (
    <SimpleGrid spacing={0} h="100vh" columns={{ base: 1, lg: 2 }}>
      <Box
        display={{ base: "none", lg: "block" }}
        bg="linear-gradient(28.85deg, #000000 0.52%, #303030 98.69%), linear-gradient(0deg, #FFFFFF, #FFFFFF);"
      >
        <Box
          h="calc(100vh - 60px)"
          w="calc(100% - 30px)"
          ml="30px"
          mt="30px"
          borderTopLeftRadius={"20px"}
          borderBottomLeftRadius={"20px"}
          p="1px"
          bg="linear-gradient(139deg, rgba(148,148,148,1) 10%, rgba(44,44,44,1) 66%)"
        >
          <Box
            borderTopLeftRadius={"20px"}
            borderBottomLeftRadius={"20px"}
            bg="#000"
          >
            <Box
              bg={
                "linear-gradient(139deg, rgba(21,21,21,1) 7%, rgba(36,36,36,1) 32%, rgba(50,50,50,1) 74%, rgba(61,61,61,1) 87%)"
              }
              h="calc(100vh - 60px)"
              p="50px"
              borderTopLeftRadius={"20px"}
              borderBottomLeftRadius={"20px"}
            >
              <Heading
                maxW="560px"
                color={getColor(colorKeys.white, colorMode)}
                fontSize="64px"
              >
                STRATEGIZE ORGANIZE & VISUALIZE.
              </Heading>
              <Text
                fontSize={"16px"}
                color={getColor(colorKeys.lightGray, colorMode)}
              >
                Navigate your projects with a dashboard so intuitive.
              </Text>
              <Flex mt={10}>
                <Box w="80px" h="2px" bg="white"></Box>
                <Box w="100px" h="2px" bg="white" opacity={"0.5"}></Box>
              </Flex>

              <Box>
                <Image
                  right="54%"
                  bottom={"185px"}
                  pos="absolute"
                  src={APP_IMAGES.RIGHT_WING}
                />
                <Image
                  right="62%"
                  bottom={"115px"}
                  pos="absolute"
                  src={APP_IMAGES.LEFT_WING}
                />
                <Image
                  pos="absolute"
                  right={"50%"}
                  bottom={30}
                  src={APP_IMAGES.LOGIN_HERO}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Flex
        display={{ base: "flex", lg: "none" }}
        h="80px"
        bg="linear-gradient(28.85deg, #000000 0.52%, #303030 98.69%), linear-gradient(0deg, #FFFFFF, #FFFFFF);"
        justify={"center"}
        align={"center"}
      >
        <Logo />
      </Flex>

      <Flex
        h={{ base: "calc(100vh - 80px)", lg: "auto" }}
        px={"30px"}
        justify={"center"}
        align={"center"}
        flexDirection={"column"}
      >
        <Box maxW="650px" w="full">
          <Box display={{ base: "none", lg: "block" }}>
            <Logo dark={true} />
          </Box>
          <ResetForm />
        </Box>

        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={1}
        >
          <Flex fontSize={"12px"} textColor={"#838383"}>
            Privacy policies | Terms and condition
          </Flex>
          <Flex fontSize={"12px"} textColor={"#838383"}>
            © 2024 Exportx
          </Flex>
        </Flex>
      </Flex>
    </SimpleGrid>
  );
};

export default Login;
