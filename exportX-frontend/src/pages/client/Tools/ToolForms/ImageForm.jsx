import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  UnorderedList,
  ListItem,
  VStack,
  Text,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import DataDrawer from "../../../../components/data/Poppers/DataDrawer";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import EnglishTab from "./EnglishTab";
import ArabicTab from "./ArabicTab";
import {
  useCreative,
  useDeleteGeneratedImage,
  useDeleteUploadedImage,
  useEditCreative,
  useGenerateCreatives,
  useGenerateImage,
  useRegenerateDallePrompt,
  useRegenerateImageIdeas,
  useRegenerateSinglePost,
  useSaveCreative,
  useUploadImage,
  useViewPlanner,
} from "../../../../config/query/projectContentPlannerQuery";
import { useNavigate, useParams } from "react-router-dom";
import {
  getImageName,
  getImageUrl,
  toDataURL,
} from "../../../../config/utils/fileUtil";

const AddImageForm = ({ disclosure, creative, language }) => {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState(creative?.itemId);
  const { id } = useParams();
  const [query, setQuery] = useState({
    platform: "facebook",
    language: language ?? "english",
  });
  const { colorMode } = useColorMode();

  const [poster, setPoster] = useState(null);
  const [creativeData, setCreativeData] = useState(null);

  useEffect(() => {
    if (disclosure?.isOpen) {
      !itemId && setItemId(creative?.itemId);
    }
  }, [disclosure?.isOpen, creative]);

  const postObj = useMemo(() => {
    const posts = {};
    creativeData?.posts?.forEach((item) => {
      posts[item.platform] = item;
    });

    return posts;
  }, [query?.platform, creativeData]);

  const getPosts = (data) => {
    const posts = {};
    data?.posts?.forEach((item) => {
      posts[item.platform] = item;
    });
    return posts;
  };

  const generateCreatives = useGenerateCreatives(id, language);
  const creativeById = useCreative();
  const saveCreative = useSaveCreative(id);
  const updateCreative = useEditCreative();
  const viewPlanner = useViewPlanner();

  const creativeId = creative?._id || creative?.planId;
  // const itemId = creative?.itemId || saveCreative.data?.data?.plan?._id;

  //image queries
  const generateImage = useGenerateImage(id);
  const deleteGeneratedImage = useDeleteGeneratedImage();
  const uploadImage = useUploadImage();
  const deleteImage = useDeleteUploadedImage();

  //regenerate

  const regenerateDallePrompt = useRegenerateDallePrompt();
  const regenerateImageIdeas = useRegenerateImageIdeas();
  const regenerateSinglePost = useRegenerateSinglePost();

  const getCreative = (currentItemId) => {
    if (creative?.planId && creative?.itemId && creative?.projectId) {
      viewPlanner
        .mutateAsync({
          projectId: creative?.projectId,
          planId: creative?.planId,
          itemId: creative?.itemId,
        })
        .then((res) => {
          setCreativeData(res?.data?.item);
          const quertData = {
            platform: res?.data?.item?.posts[0]?.platform,
            language: language ?? "english",
          };
          onQueryChange(quertData);
        })
        .catch((error) => console.warn(error));

      return;
    }
    //get existing resource
    if (currentItemId || itemId) {
      creativeById
        .mutateAsync({ creativeId, imageId: itemId ? itemId : currentItemId })
        .then((res) => setCreativeData(res?.data?.post?.items))
        .catch((error) => console.warn(error));
      return;
    }
    //generate new resource
    generateCreatives
      .mutateAsync(creativeId)
      .then((res) => setCreativeData(res?.data))
      .catch((error) => console.warn(error));
  };

  const onRegenerateDallePrompt = () => {
    regenerateDallePrompt
      .mutateAsync({
        projectId: id,
        creativeId,
        dallePrompt: creativeData?.dallePrompt,
        // tool: "openai",
        // language: "english",
      })
      .then((res) => {
        setCreativeData((prev) => ({
          ...prev,
          dallePrompt: res?.data?.dallePrompt,
        }));
      })
      .catch((error) => console.warn(error));
  };

  const onRegenerateImageIdeas = () => {
    regenerateImageIdeas
      .mutateAsync({
        projectId: id,
        creativeId,
        imageIdeas: creativeData?.imageIdeas,
        // tool: "openai",
        // language: "english",
      })
      .then((res) => {
        setCreativeData((prev) => ({
          ...prev,
          imageIdeas: res?.data?.imageIdeas,
        }));
      })
      .catch((error) => console.warn(error));
  };

  const onRegenerateSinglePost = () => {
    regenerateSinglePost
      .mutateAsync({
        projectId: id,
        creativeId,
        platform: query?.platform,
        imageIdeas: creativeData?.imageIdeas,
        post: postObj?.[query?.platform]?.post,
        // tool: "openai",
        // language: "english",
      })
      .then((res) => {
        setCreativeData((prev) => {
          const _posts = prev?.posts?.map((item) => {
            if (item?.platform === res?.data?.platform) {
              return {
                ...item,
                post: res?.data?.post,
              };
            }
            return item;
          });
          return {
            ...prev,
            posts: _posts,
          };
        });
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    if (disclosure?.isOpen) {
      if (creativeId !== undefined && creativeData === null) {
        getCreative();
      }
    } else {
      setCreativeData(null);
    }
  }, [disclosure?.isOpen, creativeId]);

  const onQueryChange = (updatedQuery) => {
    setQuery((prev) => ({ ...prev, ...updatedQuery }));
  };

  const onGenerateImage = () => {
    // if (!creativeId || !creativeData?._id) return;
    if (!itemId) {
      saveCreative
        .mutateAsync({ creativeId, body: creativeData })
        .then((res) => {
          setCreativeData(res?.data?.plan);
          generateImage
            .mutateAsync({
              creativeId,
              body: { dallePrompt: creativeData?.dallePrompt },
              imageId: res?.data?.plan?._id,
            })
            .then((res) => {
              // setDalleImages((prev) => [...prev, res?.data])
              // getCreative();
            })
            .catch((error) => console.warn(error));
          setItemId(res?.data?.plan?._id);
          // getCreative(res?.data?.plan?._id);
        })
        .catch((error) => console.warn(error));
      return;
    }
    generateImage
      .mutateAsync({
        creativeId,
        body: { dallePrompt: creativeData?.dallePrompt },
        imageId: creativeData?._id,
      })
      .then((res) => {
        // setDalleImages((prev) => [...prev, res?.data])
        getCreative();
      })
      .catch((error) => console.warn(error));
  };

  const onDeleteGeneratedImage = (index, item) => {
    const _dalleGeneratedImages = creativeData?.dalleGeneratedImages?.filter(
      (_, i) => i !== index
    );
    setCreativeData((prev) => ({
      ...prev,
      dalleGeneratedImages: _dalleGeneratedImages,
    }));
    deleteGeneratedImage
      .mutateAsync({
        projectId: id,
        creativeId,
        imageId: itemId,
        generatedImageId: item?._id,
      })
      .then(() => {})
      .catch((error) => console.warn(error));
  };

  const onSaveCreative = async ({ navigateTo }) => {
    //updating existing resource
    if (itemId) {
      updateCreative
        .mutateAsync({ creativeId, imageId: itemId, body: creativeData })
        .then(() => {
          if (navigateTo) {
            navigate(navigateTo);
          } else {
            getCreative();
          }
        })
        .catch((error) => console.warn(error));
      return;
    }
    //saving and creative a new resource
    saveCreative
      .mutateAsync({ creativeId, body: creativeData })
      .then((res) => {
        console.log(res, "ashdjakshda");
        setItemId(res?.data?.plan?._id);
        if (navigateTo) {
          navigate(navigateTo);
        } else {
          getCreative(res?.data?.plan?._id);
        }
      })
      .catch((error) => console.warn(error));
  };

  const onGeneratePoster = () => {
    onSaveCreative({
      navigateTo: `/dashboard/projects/${id}/poster-generator`,
    });
  };

  const onDownloadImage = async (imageItem) => {
    const a = document.createElement("a");
    a.href = await toDataURL(getImageUrl(imageItem?.path));
    a.download = getImageName(imageItem?.path);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onUploadImage = (file) => {
    setPoster(file);
    const body = new FormData();
    body.append("image", file?.file);

    const payload = {
      projectId: id,
      creativeId: creativeData?._id || creativeData?.planId,
      imageId: itemId,
      postId: postObj?.[query?.platform]?._id,
      body,
    };

    console.log(payload, "Payload");

    if (!itemId || !payload.postId) {
      saveCreative
        .mutateAsync({ creativeId, body: creativeData })
        .then((res) => {
          setCreativeData(res?.data?.plan);
          setItemId(res?.data?.plan?._id);
          const _postObj = getPosts(res?.data?.plan);

          payload.imageId = res?.data?.plan?._id;
          payload.postId = _postObj?.[query?.platform]?._id;

          uploadImage
            .mutateAsync(payload)
            .then((res) => {
              // getCreative();
            })
            .catch((error) => console.warn(error));
        })
        .catch((error) => console.warn(error));
      return;
    }

    uploadImage
      .mutateAsync(payload)
      .then((res) => {
        // getCreative();
      })
      .catch((error) => console.warn(error));
  };

  const onDeleteUploadedImage = () => {
    setPoster(null);
    deleteImage.mutateAsync({
      projectId: id,
      creativeId,
      imageId: itemId,
      postId: postObj?.[query?.platform]?._id,
      uploadedImageId: postObj?.[query?.platform]?.images?.at(0)?._id,
    });
  };

  return (
    <DataDrawer
      disclosure={disclosure}
      heading={creative?.title || creativeById.data?.data?.post?.title}
    >
      <Flex flexDir={"column"} justify={"space-between"}>
        <Box boxShadow={"md"} h="calc(100vh - 155px)" overflowY={"auto"}>
          <VStack align="stretch" spacing={6}>
            <Box
              borderTopRadius={"xl"}
              h={"50px"}
              bg={"#000000"}
              borderTop={"0"}
              pt={"12px"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <UnorderedList
                  color={"white"}
                  listStyleType={"none"}
                  display={"flex"}
                  gap={5}
                >
                  {creativeData?.posts?.map((item, index) => {
                    return (
                      <ListItem
                        cursor={"pointer"}
                        onClick={() =>
                          onQueryChange({ platform: item?.platform })
                        }
                        opacity={
                          query?.platform === item?.platform ? "1" : "0.7"
                        }
                      >
                        {item?.platform}
                      </ListItem>
                    );
                  })}

                  {/* <ListItem
                    cursor={"pointer"}
                    onClick={() => onQueryChange({ platform: "facebook" })}
                    opacity={query?.platform === "facebook" ? "1" : "0.7"}
                  >
                    Facebook
                  </ListItem>
                  <ListItem
                    cursor={"pointer"}
                    onClick={() => onQueryChange({ platform: "linkedin" })}
                    ml={"15px"}
                    opacity={query?.platform === "linkedin" ? "1" : "0.7"}
                  >
                    LinkedIn
                  </ListItem>
                  <ListItem
                    cursor={"pointer"}
                    onClick={() => onQueryChange({ platform: "instagram" })}
                    ml={"15px"}
                    opacity={query?.platform === "instagram" ? "1" : "0.7"}
                  >
                    Instagram
                  </ListItem> */}
                </UnorderedList>
              </Box>
              <Box p={"10px"}>
                <VStack align="stretch" spacing={6}>
                  <EnglishTab
                    query={query}
                    data={creativeData}
                    isLoading={generateCreatives.isPending}
                    poster={poster?.file}
                    onDeleteImage={onDeleteGeneratedImage}
                    onDownloadImage={onDownloadImage}
                    dalleImages={creativeData?.dalleGeneratedImages}
                    selectedCreative={creative}
                    //
                    onGenerateImage={onGenerateImage}
                    isGeneratingImage={generateImage.isPending}
                    //
                    onGeneratePoster={onGeneratePoster}
                    //
                    onRegenerateDallePrompt={onRegenerateDallePrompt}
                    isDallePromptLoading={regenerateDallePrompt.isPending}
                    //
                    onRegenerateImageIdeas={onRegenerateImageIdeas}
                    isImageIdeasLoading={regenerateImageIdeas.isPending}
                    //
                    onRegenerateSinglePost={onRegenerateSinglePost}
                    isSinglePostLoading={regenerateSinglePost.isPending}
                    //
                    onImageChange={(file) => {
                      onUploadImage(file);
                    }}
                    onRemoveImage={() => {
                      onDeleteUploadedImage();
                    }}
                    isRemovingImage={deleteImage.isPending}
                    itemId={itemId}
                  />
                </VStack>
              </Box>
            </Box>
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
            onClick={disclosure.onClose}
          >
            Go Back
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
            onClick={onSaveCreative}
            isLoading={
              saveCreative.isPending ||
              generateCreatives.isPending ||
              updateCreative.isPending
            }
          >
            Save
          </Button>
        </HStack>
      </Flex>
    </DataDrawer>
  );
};

export default AddImageForm;
