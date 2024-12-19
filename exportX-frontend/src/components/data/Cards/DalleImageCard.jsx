import { Box, Flex, Icon, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_ICONS from "../../../config/constants/icons";
import { getImageUrl } from "../../../config/utils/fileUtil";

const DalleImageCard = ({
  image ,
  onDownload,
  onDelete,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Box role="group" position="relative" overflow="hidden" width="fit-content">
      <Image src={getImageUrl(image?.path)} alt="Shoe Image" _hover={{ opacity: 0.5 }} />
      <Box
        position="absolute"
        top="10%"
        left="90%"
        transform="translate(-50%, -50%)"
        display="none"
        mt={"3px"}
        _groupHover={{ display: "block" }}
      >
        <Flex>
          <Flex
            mr={"6px"}
            mt={"8px"}
            justifyContent={"center"}
            align="center"
            rounded="full"
            h="30px"
            w="30px"
            bg={getColor(colorKeys.white, colorMode)}
            color={getColor(colorKeys.black, colorMode)}
            cursor={"pointer"}
            onClick={onDownload}
          >
            <Icon boxSize={5} fontSize={"10px"} as={APP_ICONS.DOWNLOAD} />
          </Flex>
          <Flex
            mr={"45px"}
            mt={"8px"}
            justifyContent={"center"}
            align="center"
            rounded="full"
            h="30px"
            w="30px"
            bg={getColor(colorKeys.white, colorMode)}
            color={getColor(colorKeys.primary, colorMode)}
            cursor={"pointer"}
            onClick={onDelete}
          >
            <Icon boxSize={4} fontSize={"10px"} as={APP_ICONS.BIN} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default DalleImageCard;
