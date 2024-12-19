import {
  Flex,
  Text,
  Icon,
  chakra,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import React from "react";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_IMAGES from "../../../config/constants/images";

export const dropZoneParentStyles = {
  w: "full",
  minH: "150px",
  rounded: "lg",
  border: "2px dashed #ececec",
  bg: "#F8F9FF !important",
  src: "",
};

const DropzoneCard = ({
  textProps,
  subTextProps,
  src,
  name,
  heading = "Drag & drop your logo here",
}) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      w="full"
      bg={"#F8F9FF"}
      align="center"
      justify={"center"}
      flexDir={"column"}
    >
      {!src && !name && (
        <Text fontSize={"12px"} color="#C8C8C8">
          <Icon boxSize={"50px"} color={"#E2E2E2"} as={APP_ICONS.GALLERY} />
          <Text fontSize={"18px"} color="#90A2F8" {...textProps}>{heading}</Text>
          or{" "}
          <chakra.span
            color={getColor(colorKeys.primary, colorMode)}
            {...subTextProps}
          >
            Browse File
          </chakra.span>{" "}
          on your computer
        </Text>
      )}
      {src && <Image maxW="150px" src={src} objectFit={"fill"} />}
      {name && (
        <Text fontSize={"18px"} color="#C8C8C8">
          {" "}
          {name} selected
        </Text>
      )}
    </Flex>
  );
};

export default DropzoneCard;
