import { Box, SimpleGrid, useColorMode } from "@chakra-ui/react";
import React from "react";
import TableHeaderOptions from "../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../config/constants/icons";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_IMAGES from "../../../config/constants/images";
import ToolCard from "../../../components/data/Cards/ToolCard";

const tools = [
  {
    title: "Single Social Media Post Generator",
    description: `Create a social media post with our single 
    social media generator tool to enhance your
    growth and business.`,
    image: APP_IMAGES.POST,
    link:"/dashboard/tools/single-social-media"
  },
  {
    title: "Campaign Ideas",
    description: `With this AI tool, Creating fresh ideas for
    social media campaign with in minutes. Bring
    your campaign  to next level.`,
    image: APP_IMAGES.NOTE,
    link: "/dashboard/tools/generate-campaign-ideas"
  },
  {
    title: "Email Draft",
    description: `Need a urgent email that too without any 
    grammar or spelling mistakes. Our tool got
    your back.`,
    image: APP_IMAGES.EMAIL,
    link: "/dashboard/tools/generate-email-draft"
  },
  {
    title: "Creative Idea Generator",
    description: `This tool is designed to help in creating creatives. 
    Boost your teams creativity by using creative 
    generator`,
    image: APP_IMAGES.IDEAS,
    link: "/dashboard/tools/creative-idea-generator"
  },
  {
    title: "Poster Generator",
    description: `Unleash Your Creativity with Our Poster Making AI Tool! Design stunning posters effortlessly and make your ideas come to life with ease. `,
    image: APP_IMAGES.PICTURE,
    link: "/dashboard/tools/poster-generator"  
  },
];

const Tools = () => {
  return (
    <Box>
      <TableHeaderOptions title={"Tools"} subtitle={"Tools"} />
      <SimpleGrid mt={5} columns={{ base: 1, md: 3 }} spacing={5}>
        {tools?.map((item, index) => (
          <ToolCard key={index} tool={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Tools;
