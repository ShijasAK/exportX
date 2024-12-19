import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, useForm } from "react-hook-form";
import DataDrawer from "../../../../components/data/Poppers/DataDrawer";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import ContentIdeas from "../../../../components/misc/ContentIdeas";
import ImageForm from "./ImageForm";

const englishContentIdeas = [
  {
    title: "Introducing our latest innovation",
    description: `The Nike Air Max 2022! Discover
     the cutting-edge features and sleek design of 
     our newest arrival that will elevate your 
     performance to new heights. Stay tuned for 
     the official release date.`,
  },
  {
    title: "Embrace the future of Style With Nike",
    description: `Embrace the future of style with the 
    Nike Air Jordan 1 High OG 'Royal Toe'. This iconic 
    sneaker combines timeless design with modern touches,
     making it a must-have for sneaker heads and fashion
      enthusiasts alike. Get ready to turn heads wherever
       you go.`,
  },
  {
    title: "Unleash your inner athlete with the Nike",
    description: `Unleash your inner athlete with the
     Nike React Infinity Run. Designed for maximum
      comfort and support, this new addition to our 
      lineup will revolutionise your running experience.
       Lace up and prepare to conquer the miles ahead.`,
  },
  {
    title: "Introducing our latest innovation",
    description: `The Nike Air Max 2022! Discover
     the cutting-edge features and sleek design of
      our newest arrival that will elevate your
       performance to new heights. Stay tuned for 
       the official release date.`,
  },
];
const arabicContentIdeas = [
  {
    title: "",
    description:
      "نقدم لكم إبتكارنا الأحدث: نايكي إير ماكس 2022! اكتشفوا المزايا المتقدمة والتصميم الأنيق لأحدث وصول لدينا الذي سيرتقي بأدائكم إلى آفاق جديدة. ترقبوا تاريخ الإصدار الرسمي",
  },
  {
    title: "نقدم لكم إبتكارنا الأحدث",
    description:
      "نقدم لكم إبتكارنا الأحدث: نايكي إير ماكس 2022! اكتشفوا المزايا المتقدمة والتصميم الأنيق لأحدث وصول لدينا الذي سيرتقي بأدائكم إلى آفاق جديدة. ترقبوا تاريخ الإصدار الرسمي",
  },
  {
    title: "",
    description:
      "نقدم لكم إبتكارنا الأحدث: نايكي إير ماكس 2022! اكتشفوا المزايا المتقدمة والتصميم الأنيق لأحدث وصول لدينا الذي سيرتقي بأدائكم إلى آفاق جديدة. ترقبوا تاريخ الإصدار الرسمي",
  },
  {
    title: "",
    description:
      "اعتنقوا مستقبل الأناقة مع نايكي إير جوردان 1 هاي أو جي 'رويال تو'. هذا الحذاء الأيقوني يجمع بين التصميم الخالد واللمسات الحديثة، مما يجعله لا غنى عنه لعشاق الأحذية وعشاق الموضة على حد سواء. استعدوا لجذب الأنظار أينما ذهبتم",
  },
];

function GenerateForm({ disclosure }) {
  const { colorMode } = useColorMode();
  const addImageDrawer = useDisclosure();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <DataDrawer disclosure={disclosure} heading={"Content Ideas"}>
      <Flex flexDir={"column"} justify={"space-between"}>
        <Box h="calc(100vh - 155px)" overflowY={"auto"}>
          <VStack align="stretch" spacing={6}>
            <ContentIdeas heading={"English"} list={englishContentIdeas} />

            <ContentIdeas heading={"Arabic"} list={arabicContentIdeas} />
          </VStack>
        </Box>

        <HStack justify={"flex-end"} mt={5}>
          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.lightGray, colorMode)}
            color={"#BFBFBF"}
          >
            Cancel
          </Button>

          <Button
            fontSize="14px"
            fontWeight={"400"}
            display={"flex"}
            alignItems={"center"}
            rounded={"full"}
            minW={"120px"}
            bg={getColor(colorKeys.secondary, colorMode)}
            color={getColor(colorKeys.primary, colorMode)}
            _hover={{ opacity: 0.8 }}
            onClick={addImageDrawer.onOpen}
          >
            Continue
          </Button>
        </HStack>
        <ImageForm disclosure={addImageDrawer} />
      </Flex>
    </DataDrawer>
  );
}

export default GenerateForm;
