import { Box, Flex, Heading, Image, useColorMode } from "@chakra-ui/react";
import React from "react";
import TableHeaderOptions from "../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../config/constants/icons";
import APP_IMAGES from "../../../config/constants/images";
import SecondaryButton from "../../../components/controls/Buttons/SecondaryButton";

const SocialMediaPlanner = () => {
  return (
    <Box>
      <TableHeaderOptions
        action={() => {}}
        actionText={"Generate Plan"}
        title={"Social Media Planner"}
        subtitle={"Social Media Planner"}
        icon={APP_ICONS.ADD}
        // onQueryChange={() => {}}
        placeholder="Search by name, email or designation "
        actionButtonProps={{ minW: 130 }}
      />

      <Flex
        mt={5}
        flexDir={"column"}
        gap={5}
        h="calc(100vh - 250px)"
        bg={"#fff"}
        align={"center"}
        justify="center"
      >
        <Box h="125px" w="125px">
          <Image src={APP_IMAGES.MAGIC} />
        </Box>
        <Heading fontSize={"32px"}>You haven't generated the content plan</Heading>
        <SecondaryButton>Generate</SecondaryButton>
      </Flex>
    </Box>
  );
};

export default SocialMediaPlanner;
