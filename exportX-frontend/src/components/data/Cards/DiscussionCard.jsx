import React from "react";
import {
  Flex,
  HStack,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";
import DropdownSelect from "../../controls/Dropdowns/DropdownSelect";
import { formatDate } from "../../../config/utils/dateUtil";
import { getImageUrl } from "../../../config/utils/fileUtil";
import { useDeleteDiscussionItem } from "../../../config/query/projectDiscussionQuery";
import { useParams } from "react-router-dom";

const DiscussionCard = ({ message, time, date, userId, discussionId }) => {
  const firstName = userId ? userId.firstName : "Unknown";
  const lastName = userId ? userId.lastName : "User";
  const image = userId ? userId.userImage.path : "#";
  const { id } = useParams();

  const deleteDiscussion = useDeleteDiscussionItem(id);

  const { colorMode } = useColorMode();

  const onDelete = () => {
    deleteDiscussion.mutateAsync(discussionId).catch((error) => {
      console.error("error", error);
    });
  };

  return (
    <Flex gap={5} justify={"space-between"}>
      <HStack align={"start"}>
        <Avatar src={getImageUrl(image)} w="30px" h="30px" />
        <Box>
          <Flex align={"center"}>
            <Heading as="h3" fontSize={"12px"} color="#353535">
              {firstName} {lastName}
            </Heading>
            <Text ml={2} fontSize={"8px"} color="#707070">
              {time} : {formatDate(date)}{" "}
            </Text>
          </Flex>
          <Text
            fontSize={"14px"}
            color="#141414"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </Box>
      </HStack>

      <DropdownSelect
        options={[
          {
            id: 1,
            label: "Delete",
            onClick: onDelete
          },
        ]}
        buttonProps={{
          as: IconButton,
          w: "40px",
          h: "40px",
          variant: "unstyled",
          display: "flex",
          icon: (
            <Icon
              boxSize={4}
              color={getColor(colorKeys.gray, colorMode)}
              as={APP_ICONS.MORE_OPTIONS}
            />
          ),
        }}
        hideIcon={true}
      />
      {/* <Icon
        boxSize={4}
        color={getColor(colorKeys.gray, colorMode)}
        as={APP_ICONS.MORE_OPTIONS}
      /> */}
    </Flex>
  );
};

export default DiscussionCard;
