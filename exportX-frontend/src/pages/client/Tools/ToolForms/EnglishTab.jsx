import React, { useMemo, useRef } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Icon,
  useColorMode,
  Heading,
  SimpleGrid,
  Avatar,
  HStack,
  IconButton,
  createStandaloneToast,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import APP_IMAGES from "../../../../config/constants/images";
import ImageIdeaContentHeadings from "../../../../components/data/Headings/ImageIdeaContentHeadings";
import DataAccordian from "../../../../components/data/Poppers/DataAccordian";
import {
  getFileExtention,
  getImageUrl,
} from "../../../../config/utils/fileUtil";
import MagicIcon from "../../../../components/Icons/MagicIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import DropdownSelect from "../../../../components/controls/Dropdowns/DropdownSelect";
import {
  ALLOWED_FILE_TYPES,
  DEFAULT_MAX_UPLOAD_SIZE,
  FILE_TYPES,
  MEGABYTE,
} from "../../../../config/constants/defaults";
import DalleImageCard from "../../../../components/data/Cards/DalleImageCard";
const { toast } = createStandaloneToast();

const English = ({
  query,
  data,
  isLoading,
  onImageChange,
  onRemoveImage,
  poster,
  onGenerateImage,
  dalleImages,
  isGeneratingImage,
  onDeleteImage,
  onDownloadImage,
  onGeneratePoster,
  selectedCreative,
  onRegenerateDallePrompt,
  isDallePromptLoading,
  onRegenerateImageIdeas,
  isImageIdeasLoading,
  onRegenerateSinglePost,
  isSinglePostLoading,
  isRemovingImage,
  itemId,
}) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { id } = useParams(); //Project id, if available it means its project detail page content planner

  const postObj = useMemo(() => {
    const posts = {};
    data?.posts?.forEach((item) => {
      posts[item.platform] = item.post;
    });
    return posts;
  }, [query?.platform, data]);

  const imageIdeaAccordianData = [
    {
      label: "Image Idea",
      content: (
        <Box
          bg={getColor(colorKeys.layoutBoxBackground, colorMode)}
          p={"20px"}
          mt={"20px"}
        >
          <VStack align="stretch" spacing={3}>
            <Flex justify={"space-between"}>
              <Box>
                {data?.imageIdeas?.map((item, index) => (
                  <ImageIdeaContentHeadings
                    key={index}
                    headingText={""}
                    content={item}
                  />
                ))}
              </Box>
              <IconButton
                bg={"#0D0D0D"}
                icon={<MagicIcon ml="4px" mt="3px" boxSize={6} />}
                onClick={onRegenerateImageIdeas}
                isLoading={isImageIdeasLoading}
              />
            </Flex>
          </VStack>
        </Box>
      ),
    },
  ];

  const imageGenerationAccordianData = [
    {
      label: "DELL-E Image Generation Prompt",
      content: (
        <VStack>
          <Box
            border={"2px solid #f6f6f6"}
            borderRadius={"5px"}
            p={"20px"}
            mt={"20px"}
          >
            <Flex justify={"space-between"}>
              <Text
                color={"#252525"}
                fontSize={"14"}
                fontFamily={"Helvetica"}
                fontWeight={"400"}
                wordWrap={"break-word"}
              >
                {data?.dallePrompt}
              </Text>
              <IconButton
                bg={"#0D0D0D"}
                icon={<MagicIcon ml="4px" mt="3px" boxSize={6} />}
                onClick={onRegenerateDallePrompt}
                isLoading={isDallePromptLoading}
              />
            </Flex>
          </Box>

          <Box
            border={"2px dashed #f6f6f6"}
            borderRadius={"5px"}
            py={"20px"}
            px={"10px"}
            mt={"20px"}
          >
            {/* {!itemId && (
              <Text textAlign={"center"} fontSize={"14px"} mb={5}>
                Please save first to generate image.
              </Text>
            )} */}
            <SimpleGrid w="full" spacing={3} columns={{ base: 1, md: 4 }}>
              {dalleImages?.map((item, index) => (
                <DalleImageCard
                  key={index}
                  image={item}
                  onDelete={() => onDeleteImage(index, item)}
                  onDownload={() => onDownloadImage(item)}
                />
              ))}

              <Flex
                w="160px"
                h="150px"
                justify={"center"}
                border="1px dashed #E8EFFA"
                align={"center"}
                flexDir={"column"}
                _hover={{
                  bg: getColor(colorKeys.lightBackgroundFill, colorMode),
                  cursor: "pointer",
                }}
                cursor={"pointer"}
                // onClick={!itemId ? onGenerateImage:}
                onClick={() => {
                  onGenerateImage();
                }}
                // pointerEvents={isGeneratingImage || !itemId ? "none" : "all"}
                // opacity={isGeneratingImage || !itemId ? "0.5" : "1"}
              >
                {isGeneratingImage ? (
                  <Spinner />
                ) : (
                  <>
                    <MagicIcon />
                    <Text
                      fontSize={"14px"}
                      color={getColor(colorKeys.primary, colorMode)}
                    >
                      Generate {dalleImages?.length !== 0 && "More"}
                    </Text>
                  </>
                )}
              </Flex>
            </SimpleGrid>
          </Box>
        </VStack>
      ),
    },
  ];

  return (
    <Box p={"10px"}>
      {isLoading && data === null ? (
        "Loading..."
      ) : (
        <VStack align="stretch" spacing={6}>
          <Box bg={"#F1F1F1"} p={"20px"}>
            <VStack align="stretch" spacing={6}>
              <Flex
                align="center"
                justify={"space-between"}
                rounded="full"
                h="50px"
              >
                <HStack>
                  <Avatar
                    h={"100%"}
                    src={getImageUrl(data?.client?.image)}
                    alt="avatar"
                  />
                  <Text>{data?.client?.name}</Text>
                </HStack>
                <IconButton
                  bg={"#0D0D0D"}
                  onClick={onRegenerateSinglePost}
                  isLoading={isSinglePostLoading}
                  icon={<MagicIcon ml="4px" mt="3px" boxSize={6} />}
                />
              </Flex>
              <Text ml={"15px"} fontSize={"15px"}>
                {postObj?.[query?.platform]}
              </Text>

              <Box bg={getColor(colorKeys.gray, colorMode)} pt={"12px"}>
                <Box display={"flex"} justifyContent={"end"}>
                  <DropdownSelect
                    options={[
                      {
                        value: "upload",
                        label: "Upload",
                        onClick: () => inputRef.current.click(),
                      },
                      {
                        value: "Generate",
                        label: "Generate Poster",
                        onClick: onGeneratePoster,
                      },
                    ]}
                    buttonProps={{
                      as: IconButton,
                      w: "30px",
                      minW: "30px",
                      h: "30px",
                      mt: "-3px",
                      mr: "5px",
                      bg: getColor(colorKeys.white, colorMode),
                      color: getColor(colorKeys.primary, colorMode),
                      icon: (
                        <Icon
                          boxSize={5}
                          color={getColor(colorKeys.primary, colorMode)}
                          as={APP_ICONS.ADD}
                        />
                      ),
                    }}
                  />

                  <Flex
                    mr={"10px"}
                    mt={"-4px"}
                    justifyContent={"center"}
                    align="center"
                    rounded="full"
                    h="30px"
                    w="30px"
                    bg={getColor(colorKeys.white, colorMode)}
                    color={getColor(colorKeys.primary, colorMode)}
                    onClick={onRemoveImage}
                    cursor={"pointer"}
                    pointerEvents={isRemovingImage ? "none" : "all"}
                    opacity={isRemovingImage ? "0.5" : "1"}
                  >
                    <Icon boxSize={4} as={APP_ICONS.BIN} />
                  </Flex>
                </Box>
                <Box
                  h={"100%"}
                  w={"100%"}
                  borderRadius={"2"}
                  p={"80px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    src={
                      poster ? URL.createObjectURL(poster) : APP_IMAGES.IMAGE
                    }
                    alt="gray image"
                  />
                </Box>
              </Box>
            </VStack>
          </Box>
          <DataAccordian data={imageIdeaAccordianData} />
          <DataAccordian data={imageGenerationAccordianData} />
        </VStack>
      )}

      <input
        type="file"
        multiple={false}
        onChange={(e) => {
          if (
            ALLOWED_FILE_TYPES[FILE_TYPES.IMAGE].join(", ") &&
            !ALLOWED_FILE_TYPES[FILE_TYPES.IMAGE]
              .join(", ")
              .includes(getFileExtention(e.target.files[0]))
          ) {
            toast({
              id: `File type not allowed. Allowed file types are ${FILE_TYPES.IMAGE}`,
              title: "Error!",
              description: `File type not allowed. Allowed file types are ${FILE_TYPES.IMAGE}`,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          if (e.target.files[0].size > DEFAULT_MAX_UPLOAD_SIZE * MEGABYTE) {
            toast({
              id: `File size should be less than ${DEFAULT_MAX_UPLOAD_SIZE}MB`,
              title: "Error!",
              description: `File size should be less than ${DEFAULT_MAX_UPLOAD_SIZE}MB`,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            return;
          }
          onImageChange({
            name: id,
            file: e.target.files[0],
          });
        }}
        fileType={FILE_TYPES.IMAGE}
        name={id}
        ref={inputRef}
        style={{ display: "none" }}
        disabled={false}
      />
    </Box>
  );
};

export default English;
