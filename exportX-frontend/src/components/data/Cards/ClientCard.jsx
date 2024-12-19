import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_IMAGES from "../../../config/constants/images";
import APP_ICONS from "../../../config/constants/icons";
import IconValuePair from "../Information/IconValuePair";
import { getImageUrl } from "../../../config/utils/fileUtil";

const ClientCard = ({ data }) => {
  const { colorMode } = useColorMode();
  const disclosure = useDisclosure();
  return (
    <Box
      rounded="xl"
      bg="linear-gradient(28.85deg, #000000 0.52%, #303030 98.69%)"
      w={disclosure.isOpen ? "60px" : "350px"}
      p={4}
      h="full"
    >
      {disclosure.isOpen ? (
        <VStack spacing={3}>
          <IconButton
            rounded="full"
            bg={"#000"}
            w={"30px"}
            h={"30px"}
            minW="unset"
            onClick={disclosure.onToggle}
            color={getColor(colorKeys.primary, colorMode)}
            icon={
              <Icon as={APP_ICONS.ARROW_RIGHT} color={"#fff"} boxSize={"4"} />
            }
            _hover={{ opacity: 0.8 }}
            border={`0.4px solid ${getColor(colorKeys.primary, colorMode)}`}
          />
          <Avatar
            src={getImageUrl(data?.clientImage?.path)}
            w="30px"
            h="30px"
          />
          <Box>
            <Box border={`1px solid #626262`} rounded="full" p="2px">
              <Flex
                justify={"center"}
                align={"center"}
                w="30px"
                h="30px"
                bg="#292929"
                rounded="full"
                as={"a"}
                href={`tel:+${data?.primaryIsdCode}${data?.primaryContactNo}`}
              >
                <Icon
                  as={APP_ICONS.CALL}
                  variant="Bold"
                  color={"#fff"}
                  boxSize={"14px"}
                />
              </Flex>
            </Box>
          </Box>
          <Box>
            <Box border={`1px solid #626262`} rounded="full" p="2px">
              <Flex
                justify={"center"}
                align={"center"}
                w="30px"
                h="30px"
                bg="#292929"
                rounded="full"
                as="a"
                href={`mailto:${data[0]?.email}`}
              >
                <Icon
                  as={APP_ICONS.MAIL}
                  variant="Bold"
                  color={"#fff"}
                  boxSize={"14px"}
                />
              </Flex>
            </Box>
          </Box>
        </VStack>
      ) : (
        <>
          <Flex justify={"space-between"} align="center">
            <Text
              display={disclosure.isOpen ? "none" : "inline-block"}
              color={"#fff"}
            >
              Client Details
            </Text>
            <IconButton
              rounded="full"
              bg={"#000"}
              onClick={disclosure.onToggle}
              color={getColor(colorKeys.primary, colorMode)}
              icon={
                <Icon as={APP_ICONS.ARROW_RIGHT} color={"#fff"} boxSize={"5"} />
              }
              _hover={{ opacity: 0.8 }}
              border={`0.4px solid ${getColor(colorKeys.primary, colorMode)}`}
            />
          </Flex>

          <Flex mt={2} w="full" flexDir={"column"} align={"center"}>
            <Avatar
              src={getImageUrl(data[0]?.clientImage?.path)}
              w="60px"
              h="60px"
            />
            <Text
              mt={2}
              color={getColor(colorKeys.primary, colorMode)}
              fontWeight={"500"}
              fontSize={"15.72px"}
              lineHeight={"19.2px"}
            >
              {`${data[0]?.firstName} ${data[0]?.lastName}`}
            </Text>
            <Text
              mt={2}
              bg="#4b4b4b"
              color={"#EEEEEE"}
              fontWeight={"400"}
              fontSize={"8.7px"}
              lineHeight={"19.2px"}
              px="3"
              py="1"
              rounded="xl"
            >
              {`${data[0]?.brandName}`}
            </Text>
          </Flex>

          <VStack mt={5} align="stretch" spacing={2}>
            <Box
              as={"a"}
              href={`tel:+${data[0]?.primaryIsdCode}${data[0]?.primaryContactNo}`}
            >
              <IconValuePair
                icon={APP_ICONS.CALL}
                value={`+${data[0]?.primaryIsdCode}${data[0]?.primaryContactNo}`}
              />
            </Box>
            <Box as="a" href={`mailto:${data[0]?.email}`}>
              <IconValuePair icon={APP_ICONS.MAIL} value={data[0]?.email} />
            </Box>
          </VStack>

          <Box
            mt={5}
            mx={2}
            h="1px"
            w="full"
            bg="linear-gradient(90deg, rgba(21,21,21,1) 13%, rgba(255,255,255,1) 50%, rgba(21,21,21,1) 80%);"
          ></Box>

          <VStack
            spacing={3}
            align={"stretch"}
            justifyContent={"center"}
            mt={3}
          >
            <Text
              textAlign={"center"}
              lineHeight={"15px"}
              fontSize={"12.23px"}
              color={"#fff"}
            >
              Client Co-Ordinator
            </Text>

            <HStack
              spacing={2}
              bg="rgba(125, 125, 125, 0.3)"
              rounded="full"
              p="1"
            >
              <Avatar
                name={"Kadin Schleifer"}
                w="26px"
                h="26px"
                src={getImageUrl(data[1]?.clientUserImage?.path)}
                border={"1px solid #fff"}
              />
              <Text fontSize={"11.35px"} color={"#fff"}>
                {`${data[1]?.clientUserName}`}
              </Text>
            </HStack>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default ClientCard;
