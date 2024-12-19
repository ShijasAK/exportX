import {
  Box,
  Flex,
  VStack,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import ContentIdeas from "../../../../../components/misc/ContentIdeas";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useContentPlannerSettings,
  useGenerateContent,
  useGenerateContentIdeas,
  useGenerateMore,
  useRegenerate,
  useSaveContentIdea,
} from "../../../../../config/query/projectContentPlannerQuery";
import { generateUniqueId } from "../../../../../config/utils/stringUtil";
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import { makeErrorToast } from "../../../../../config/utils/toastUtil";

const ContentIdeasList = ({ onNext, onPrev }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  //if id is avaialble means we are in project details page
  const { id } = useParams(); //projectId
  const [editable, setEditable] = useState(null);

  //content ideas array states
  const [englishContentIdeas, setEnglishContentIdeas] = useState([]);
  const [arabicContentIdeas, setArabicContentIdeas] = useState([]);

  //loading states
  const [englishLoading, setEnglishLoading] = useState(false);
  const [arabicLoading, setArabicLoading] = useState(false);

  // content planner settings query
  const contentPlannerSettings = useContentPlannerSettings(id);
  const cpsData = contentPlannerSettings.data?.data || null;

  //search queries
  const [englishQuery, setEnglishQuery] = useState({
    AiTool: "",
    language: "english",
  });
  const [arabicQuery, setArabicQuery] = useState({
    AiTool: "",
    language: "arabic",
  });

  //get all ideas

  //on mount mutating this query for initial data
  const generateContentIdeas = useGenerateContentIdeas();

  //on select tool
  const generateOnSelectTool = useGenerateContent();

  //on regenerate single idea
  const regenerate = useRegenerate(id);

  //using this to handle generate more
  const generateMore = useGenerateMore(id);

  //continue aka save data
  const saveContentIdea = useSaveContentIdea(id);

  //on click on generate more button
  const onGenerateMore = (params, data) => {
    //body is already fetched data and params is query params for english and arabic
    if (!data?.length) return;

    let body = {
      contentIdeas: data?.map((item) => ({
        title: item.title,
        content: item.content,
        selected: item.selected || false,
      })),
    };

    generateMore
      .mutateAsync({ body, params })
      .then((res) => {
        if (params.language === "english")
          setEnglishContentIdeas((prev) => {
            const newData = res?.data?.contentIdeas?.map((item) => {
              return {
                id: generateUniqueId(),
                title: item.title,
                content: item.content,
              };
            });
            return [...prev, ...newData];
          });
        else
          setArabicContentIdeas((prev) => {
            const newData = res?.data?.contentIdeas?.map((item) => {
              return {
                id: generateUniqueId(),
                title: item.title,
                content: item.content,
              };
            });
            return [...prev, ...newData];
          });
      })
      .catch((err) => console.warn(err));
  };

  //handles on click on any content ideas and adds into language group wise selected states
  const handleSelect = (item, languageGroup) => {
    const dataArray =
      languageGroup === "english"
        ? [...englishContentIdeas]
        : [...arabicContentIdeas];
    //adding selected state to the item
    const updatedEnglishIdeas = dataArray?.map((i) => {
      if (i.id === item.id) {
        i.selected = !i.selected;
      }
      return i;
    });

    //updating selected state
    languageGroup === "english"
      ? setEnglishContentIdeas(updatedEnglishIdeas)
      : setArabicContentIdeas(updatedEnglishIdeas);
  };

  //get content ideas on mount fn
  const getContentIdeas = () => {
    // TODO: enable this after api is fixed
    generateContentIdeas
      .mutateAsync({ id })
      .then((res) => {
        const englishContentIdeasFiltered = [];
        const arabicContentIdeasFiltered = [];

        res?.data?.englishContentIdeas?.forEach((item) => {
          if (item && item?.title && item?.content) {
            englishContentIdeasFiltered.push({
              id: generateUniqueId(),
              title: item.title,
              content: item.content,
            });
          }
        });

        res?.data?.arabicContentIdeas?.forEach((item) => {
          if (item && item?.title && item?.content) {
            arabicContentIdeasFiltered.push({
              id: generateUniqueId(),
              title: item.title,
              content: item.content,
            });
          }
        });

        setEnglishContentIdeas(englishContentIdeasFiltered);
        setArabicContentIdeas(arabicContentIdeasFiltered);

        //if no content ideas then generate automatically fetch from openai
        if (
          cpsData?.settings?.languages?.english &&
          !englishContentIdeasFiltered.length
        ) {
          onToolClick({ tool: "openAi", language: "english" });
        }

        if (
          cpsData?.settings?.languages?.arabic &&
          !arabicContentIdeasFiltered.length
        ) {
          onToolClick({ tool: "openAi", language: "arabic" });
        }
      })
      .catch((err) => console.warn(err));
  };

  //get content ideas on mount
  useEffect(() => {
    // TODO: handle empty state
    if (cpsData) {
      getContentIdeas();
    }
  }, [cpsData]);

  const { isEnglishLanguageSelected, isArabicLanguageSelected } =
    useMemo(() => {
      let isEnglishLanguageSelected = false;
      let isArabicLanguageSelected = false;
      if (cpsData?.settings?.languages?.english) {
        isEnglishLanguageSelected = true;
      }
      if (cpsData?.settings?.languages?.arabic) {
        isArabicLanguageSelected = true;
      }
      return { isEnglishLanguageSelected, isArabicLanguageSelected };
    }, [cpsData]);

  //Handle tool click api and data
  const onToolClick = ({ tool = "openAi", language }) => {
    if (language === "english") setEnglishLoading(true);
    else setArabicLoading(true);
    generateOnSelectTool
      .mutateAsync({
        id,
        params: { language, tool },
      })
      .then((res) => {
        if (language === "english") {
          setEnglishLoading(false);
          setEnglishContentIdeas(
            res?.data?.contentIdeas?.map((item) => {
              return {
                id: generateUniqueId(),
                title: item.title,
                content: item.content,
              };
            })
          );
        } else {
          setArabicLoading(false);
          setArabicContentIdeas(
            res?.data?.contentIdeas?.map((item) => {
              return {
                id: generateUniqueId(),
                title: item.title,
                content: item.content,
              };
            })
          );
        }
      })
      .catch((error) => console.warn(error));
  };

  const onRegenerate = (item, params) => {
    regenerate
      .mutateAsync({
        body: {
          title: item.title,
          content: item.content,
        },
        params,
      })
      .then((res) => {
        const contentIdea = res.data?.contentIdea;
        if (params.langague === "english") {
          setEnglishContentIdeas((prev) => {
            return prev.map((i) => {
              if (i.id === item.id) {
                i.content = contentIdea?.content;
                i.title = contentIdea?.title;
              }
              return i;
            });
          });
        } else {
          setArabicContentIdeas((prev) => {
            return prev.map((i) => {
              if (i.id === item.id) {
                i.content = contentIdea?.content;
                i.title = contentIdea?.title;
              }
              return i;
            });
          });
        }
      })
      .catch((error) => console.warn(error));
  };

  const onSaveContentIdeas = () => {
    const englishSelected = englishContentIdeas?.filter(
      (item) => item.selected
    );
    const arabicSelected = arabicContentIdeas?.filter((item) => item.selected);

    console.log("englishSelected", englishSelected, arabicContentIdeas);
    if (!englishSelected.length && !arabicSelected.length) {
      makeErrorToast("Please select at least one content idea");
      return;
    }
    saveContentIdea
      .mutateAsync({
        englishContentIdeas: englishContentIdeas?.map((item) => ({
          title: item.title,
          content: item.content,
          selected: item.selected || false,
        })),
        arabicContentIdeas: arabicContentIdeas?.map((item) => ({
          title: item.title,
          content: item.content,
          selected: item.selected || false,
        })),
      })
      .then((res) => {
        navigate(`/dashboard/projects/${id}/social-media-planner/finalize`);
      })
      .catch((error) => console.warn(error));
  };

  const onSaveOne = ({ item, language }) => {
    console.log("kjashdjshdka");
    console.log({ item, language });
    if (language === "english") {
      console.log("item", item);
      setEnglishContentIdeas((prev) => {
        return prev.map((i) => {
          if (i.id === item.id) {
            i.content = editable.content;
            i.title = editable.title;
          }
          return i;
        });
      });
      setEditable(null);
    } else {
      setArabicContentIdeas((prev) => {
        return prev.map((i) => {
          if (i.id === item.id) {
            i.content = editable.content;
            i.title = editable.title;
          }
          return i;
        });
      });
      setEditable(null);
    }
    setEditable(null);
  };

  return (
    <Flex flexDir={"column"} justify={"space-between"}>
      <Box overflowY={"auto"}>
        <VStack align="stretch" spacing={6}>
          {isEnglishLanguageSelected && (
            <ContentIdeas
              onEdit={(item) => setEditable(item)}
              onChange={(value, key) =>
                setEditable({
                  ...editable,
                  [key]: value,
                })
              }
              onRegenerate={(item) =>
                onRegenerate(item, {
                  aiTool:
                    englishQuery.AiTool === "openai" ? "openAi" : "googleAi",
                  langague: "english",
                })
              }
              onSelect={(e) => handleSelect(e, "english")}
              heading={"English"}
              list={englishContentIdeas}
              selectedAiTool={englishQuery.AiTool}
              onChangeAiTool={(value) => {
                setEnglishQuery({ ...englishQuery, AiTool: value });
                onToolClick({ tool: value, language: "english" });
              }}
              onGenerateMore={() =>
                onGenerateMore(englishQuery, englishContentIdeas)
              }
              isGeneatingMore={generateMore.isPending}
              editable={editable}
              loading={englishLoading || generateContentIdeas.isPending}
              onSave={(item) => onSaveOne({ item, language: "english" })}
            />
          )}
          {isArabicLanguageSelected && (
            <ContentIdeas
              onEdit={(item) => setEditable(item)}
              onRegenerate={(item) =>
                onRegenerate(item, {
                  aiTool:
                    englishQuery.AiTool === "openai" ? "openAi" : "googleAi",
                  langague: "arabic",
                })
              }
              onSelect={(e) => handleSelect(e, "arabic")}
              heading={"Arabic"}
              list={arabicContentIdeas}
              selectedAiTool={arabicQuery.AiTool}
              onChangeAiTool={(value) => {
                setArabicQuery({ ...arabicQuery, AiTool: value });
                onToolClick({ tool: value, language: "arabic" });
              }}
              onGenerateMore={() =>
                onGenerateMore(arabicQuery, arabicContentIdeas)
              }
              isGeneatingMore={generateMore.isPending}
              editable={editable}
              loading={arabicLoading || generateContentIdeas.isPending}
              onSave={(item) => onSaveOne({ item, language: "arabic" })}
            />
          )}
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
          onClick={onPrev}
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
          onClick={onSaveContentIdeas}
        >
          Continue
        </Button>
      </HStack>
    </Flex>
  );
};

export default ContentIdeasList;
