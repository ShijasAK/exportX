import { Flex, Icon, IconButton, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_ICONS from "../../../config/constants/icons";
// import { useDeleteClientSocial } from "../../../config/query/clientQuery";

const SocialMediaCard = ({ account }) => {
  const { colorMode } = useColorMode();
  // const deleteSocialMedia = useDeleteClientSocial();
  // const onDelete = () => {
  //   deleteSocialMedia
  //     .mutateAsync(account?.id)
  //     .catch((err) => console.warn(err));
  // };
  return (
    <Flex
      rounded="md"
      border="0.5px solid #ececec"
      align={"center"}
      justify={"space-between"}
      px="4"
      h="50px"
      w="full"
      // onClick={onDelete}
    >
      <Text color="#828282" fontSize={"14px"}>
        {account.media}
      </Text>
      <IconButton
        bg={getColor(colorKeys.lightBackgroundFill, colorMode)}
        as="a"
        href={account.mediaToken}
        icon={
          <Icon
            as={APP_ICONS.LINK}
            color={getColor(colorKeys.primary, colorMode)}
          />
        }
      />
    </Flex>
  );
};

export default SocialMediaCard;
