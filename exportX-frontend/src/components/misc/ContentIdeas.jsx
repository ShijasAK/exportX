import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../config/constants/colors";
import ContentCard from "../data/Cards/ContentCard";
import TopHeading from "../../components/data/Headings/TopHeading";
import APP_IMAGES from "../../config/constants/images";

function ContentIdeas({
  heading,
  list,
  onSelect,
  selectedAiTool,
  onChangeAiTool,
  onGenerateMore,
  isGeneatingMore,
  onEdit,
  onRegenerate,
  editable,
  onChange,
  onSave,
  loading,
}) {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <TopHeading heading={heading} />

      <HStack justify={"space-between"} mt={5}>
        <HStack>
          <Button
            border={selectedAiTool === "openai" ? "1px solid #A4C5F5" : ""}
            h="55px"
            variant="outline"
            bg="white !important"
            onClick={() => onChangeAiTool("openai")}
          >
            <Box>
              <Image h="37px" src={APP_IMAGES.OPEN_AI} />
            </Box>
            <Text ml={2}> Open AI</Text>
          </Button>
          <Button
            border={selectedAiTool === "googleai" ? "1px solid #A4C5F5" : ""}
            h="55px"
            variant="outline"
            bg="white !important"
            onClick={() => onChangeAiTool("googleai")}
          >
            <Box>
              <Image h="37px" src={APP_IMAGES.GOOGLE_AI} />
            </Box>
            <Text ml={2}>Google AI</Text>
          </Button>
        </HStack>
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
          onClick={onGenerateMore}
          isDisabled={isGeneatingMore}
        >
          Generate More Ideas
        </Button>
      </HStack>

      {loading ? (
        <Flex minH={"550px"} w="full" justify={"center"} align={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <SimpleGrid mt={5} p={"20px"} columns={{ base: 1, md: 2 }} spacing={5}>
          {list?.map((item, index) => (
            <ContentCard
              isSelected={item.selected}
              isEditable={editable?.id === item.id}
              editable={editable}
              key={index}
              tool={item}
              onClick={() => onSelect(item)}
              onEdit={() => onEdit(item)}
              onRegenerate={() => onRegenerate(item)}
              onChange={onChange}
              onSave={()=>onSave(item)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default ContentIdeas;
