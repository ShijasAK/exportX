import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import APP_IMAGES from "../../../config/constants/images";
import SecondaryButton from "../../controls/Buttons/SecondaryButton";
import { Link, useParams } from "react-router-dom";

const ContentPlannerEmptyCard = () => {
  const { id } = useParams(); 
   return (
    <Flex
      mt={5}
      flexDir={"column"}
      gap={5}
      h="calc(100vh - 350px)"
      bg={"#fff"}
      align={"center"}
      justify="center"
    >
      <Box h="125px" w="125px">
        <Image src={APP_IMAGES.MAGIC} />
      </Box>
      <Heading fontSize={"32px"} textColor={"#676767"}>
        You haven't generated the content plan
      </Heading>
      <SecondaryButton
        as={Link}
        to={`/dashboard/projects/${id}/social-media-planner`}
      >
        Generate
      </SecondaryButton>
    </Flex>
  );
};

export default ContentPlannerEmptyCard;
