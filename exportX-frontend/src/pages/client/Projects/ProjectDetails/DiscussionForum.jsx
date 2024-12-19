import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DropdownSelect from "../../../../components/controls/Dropdowns/DropdownSelect";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import DiscussionCard from "../../../../components/data/Cards/DiscussionCard";
import FormRichTextEditor from "../../../../components/forms/FormRichTextEditor";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useProjectDiscussion } from "../../../../config/query/projectQuery";
import { useCreateProjectDiscussion } from "../../../../config/query/projectDiscussionQuery";

const DiscussionForum = () => {
  const { id } = useParams();
  const { control, getValues, setValue,watch } = useForm();

  const discussions = useProjectDiscussion({ id });
  const createDiscussion = useCreateProjectDiscussion(id);

  const onSend = () => {
    const { output } = getValues();
    createDiscussion
      .mutateAsync({ message: output })
      .then(() => setValue("output", ""))
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <Text fontSize={"15px"}>Notes</Text>
      <Box px="2" py={2} rounded={"md"} border={"1px solid #e1e1e1"}>
        <Flex w="full" justify={"center"}>
          <Text fontSize={"12px"}>23 Sep 2023</Text>
        </Flex>

        <VStack align={"stretch"} spacing={3} mt={5}>
          {discussions.data?.data?.messages?.map((item, index) => (
            <DiscussionCard key={index} discussionId={item?._id} {...item}  />
          ))}
          <FormRichTextEditor
            id={"output"}
            control={control}
            height={"550px"}
            containerProps={{
              fontSize: "14px",
              height: "580px",
              borderWidth: "15px",
              borderColor: "#F5EEEE80",
              borderRadius: "10px",
            }}
          />

          <Button zIndex="1" isLoading={createDiscussion.isPending} onClick={onSend}>
            Send
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default DiscussionForum;
