import {
  HStack,
  Icon,
  Text,
  Tooltip,
  useClipboard,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";

const CopyText = ({ text }) => {
  const { colorMode } = useColorMode();
  const { onCopy, hasCopied } = useClipboard(text);

  const isCopiedDisclosure = useDisclosure();

  useEffect(() => {
    if (hasCopied) {
      isCopiedDisclosure.onOpen();
      setTimeout(() => {
        isCopiedDisclosure.onClose();
      }, 1000);
    }
  }, [hasCopied]);

  return (
    <HStack>
      <Text>{text}</Text>
      <Tooltip label={"Copy"}>
        <Icon
          onClick={onCopy}
          boxSize={5}
          variant="Bold"
          color={
            isCopiedDisclosure.isOpen
              ? getColor(colorKeys.spanishYellow, colorMode)
              : getColor(colorKeys.lightGray, colorMode)
          }
          as={APP_ICONS.COPY}
          cursor={"pointer"}
        />
      </Tooltip>
      {isCopiedDisclosure.isOpen && <Text>Copied!</Text>}
    </HStack>
  );
};

export default CopyText;
