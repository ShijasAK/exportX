import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Image as ChakraImage,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_ICONS from "../../../../config/constants/icons";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import DataTabs from "../../../../components/data/Poppers/DataTabs";
import Templates from "./Templates/Templates";
import TextTab from "./Text";
import Background from "./BackGround/Index";
import Logo from "./Logo";
import ImageUpload from "./Image";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import APP_IMAGES from "../../../../config/constants/images";
import { getInitialCanvasData } from "../../../../config/utils/canvasUtil";
import usePosterGenerator from "./PosterGeneratorContainer";

const reducer = (state, action) => {
  const initialState = getInitialCanvasData();
  switch (action.type) {
    case "text":
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          text: action.payload.value,
        },
      };
    case "color":
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          color: action.payload.value,
        },
      };
    case "font":
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          fontSize: Number(action.payload.value),
        },
      };
    case "background":
      return {
        ...state,
        images: { ...state.images, background: action.payload },
      };
    case "backgroundImage":
      return {
        ...state,
        images: { ...state.images, backgroundImage: action.payload },
      };
    case "pattern":
      return {
        ...state,
        images: { ...state.images, pattern: action.payload },
      };

    case "images":
      var { element, imageUrl } = action.payload;
      if (imageUrl) {
        return {
          ...state,
          images: {
            ...state.images,
            [element]: { ...state.images[element], url: imageUrl },
          },
          activeForm: {
            type: element,
            crop: state.images[element].crop,
            src: imageUrl,
            ratio:
              state.templates[state.activeTemplate.templateIndex][
                state.activeTemplate.sizeIndex
              ][element].width /
              state.templates[state.activeTemplate.templateIndex][
                state.activeTemplate.sizeIndex
              ][element].height,
          },
          modal: { ...state.modal, crop: { isActive: true } },
        };
      }
      return {
        ...state,
        images: {
          ...state.images,
          [element]: { ...state.images[element], url: null, croppedUrl: null },
        },
        modal: { ...state.modal, crop: { isActive: true } },
      };

    case "add-image":
      return {
        ...state,
        canvasImages: [...state.canvasImages, action.payload],
        activeForm: {
          type: action.payload.id,
          crop: {
            unit: "%",
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        },
          src: action.payload.url,
          ratio:1
        },
        modal: { ...state.modal, crop: { isActive: true } },
      };

      case "update-images":
        return{
          ...state,
          canvasImages: action.payload
        }
      

    case "clear-image":
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.field]: {
            ...state.images[action.payload.field],
            ...action.payload.value,
          },
        },
      };

    case "active-form":
      if (action.payload && state.images[action.payload].url) {
        return {
          ...state,
          activeForm: {
            ...state.activeForm,
            type: action.payload,
            crop: state.images[action.payload].crop,
            src: state.images[action.payload].url,
            ratio: 1 / 1,
          },
          modal: { ...state.modal, crop: { isActive: true } },
        };
      }
      return state;
    case "clear-active-form":
      return {
        ...state,
        activeForm: { ...initialState.activeForm },
      };

    case "image-crop":
      const { type, crop, croppedUrl } = action.payload;
      if (["logo", "watermark", "image"].includes(type)) {
        return {
          ...state,
          images: {
            ...state.images,
            [type]: { ...state.images[type], crop, croppedUrl },
          },
          modal: { ...state.modal, crop: { isActive: false } },
        };
      }
      else{
        return {
          ...state,
          canvasImages: state.canvasImages.map((image) =>
            image.id === type
              ? { ...image, crop: crop, croppedUrl: croppedUrl }
              : image
          ),
          modal: { ...state.modal, crop: { isActive: false } },
      }
    }

    // case 'active-form':
    //   return {
    //     ...state, form: { ...state.form, activeForm: action.payload.form, type: action.payload.type }
    //   }

    case "show-modal":
      var currentModal = action.payload;
      return {
        ...state,
        modal: { ...state.modal, [currentModal]: { isActive: true } },
      };
    case "hide-modal":
      var currentModal = action.payload;
      return {
        ...state,
        modal: { ...state.modal, [currentModal]: { isActive: false } },
      };

    case "template":
      return {
        ...state,
        activeTemplate: { ...state.activeTemplate, ...action.payload },
      };

    case "set-templates":
      return {
        ...state,
        templates: action.payload,
      };

    case "set-texts":
      return {
        ...state,
        texts: action.payload,
      };

    case "edit-text":
      return {
        ...state,
        texts: state.texts.map((text) =>
          text.id === action.payload.id
            ? { ...text, text: action.payload.newText }
            : text
        ),
      };

    case "edit-font":
      let texts = state.texts.map((text) => {
        if (text.id === action.payload.id) {
          if (text.fontStyle === action.payload.fontStyle) {
            return { ...text, fontStyle: "" };
          }
          return {
            ...text,
            fontStyle: action.payload.fontStyle,
          };
        }
        return text;
      });

      return {
        ...state,
        texts,
      };

    case "edit-fontSize":
      return {
        ...state,
        texts: state.texts.map((text) =>
          text.id === action.payload.id
            ? { ...text, fontSize: action.payload.fontSize }
            : text
        ),
      };

    case "edit-fontFamily":
      return {
        ...state,
        texts: state.texts.map((text) =>
          text.id === action.payload.id
            ? { ...text, font: action.payload.font }
            : text
        ),
      };

    case "edit-fontColor":
      return {
        ...state,
        texts: state.texts.map((text) =>
          text.id === action.payload.id
            ? { ...text, fontColor: action.payload.fontColor }
            : text
        ),
      };

    case "set-currentTextId":
      let stateClone = { ...state };
      stateClone.lastTextId = state.currentTextId;
      stateClone.currentTextId = action.payload;
      return stateClone;

    case "set-currentFontSize":
      return {
        ...state,
        selectedFontSize: action.payload,
      };
    
      case "set-selectedImageId":
      return {
        ...state,
        selectedImageId: action.payload,
      };

    case "set-currentFontFamily":
      return {
        ...state,
        selectedFontFamily: action.payload,
      };

    case "set-currentFontColor":
      return {
        ...state,
        selectedFontColor: action.payload,
      };

    case "undo":
      return {
        ...state,
        texts: state.history[state.history.length - 1],
      };

    case "overwrite-state":
      return action.payload;

    case "clear":
      return initialState;

    default:
      return state;
  }
};

const PosterGenerator = () => {
  const {
    canvasData,
    templates,
    canvasRef,
    handleExport,
    handleGenerate,
    handleTextChange,
    handleTextClick,
    handleTextFocus,
    handleOnBlur,
    colorMode,
    resetTemplates,
    dispatch,
    setTemplates,
    templateData,
  } = usePosterGenerator({ reducer });

  const tabData = [
    {
      label: (
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          flexDir={"column"}
        >
          <ChakraImage
            src={APP_IMAGES.GALLERY}
            alignSelf={"center"}
            flex={1}
            h={"22px"}
            w={"22px"}
          />
          <Text color={"#828282"} fontSize={"10px"}>
            Templates
          </Text>
        </Box>
      ),
      content: (
        <Templates
          templates={templates}
          action={handleGenerate}
          activeTemplate={canvasData.activeTemplate.templateIndex}
          state={canvasData}
          resetTemplates={resetTemplates}
          template={templates[canvasData.activeTemplate.templateIndex]}
          activeSize={canvasData.activeTemplate.sizeIndex}
          dispatch={dispatch}
        />
      ),
    },
    {
      label: (
        <Box>
          <Icon
            h={"22px"}
            w={"22px"}
            color="#828282"
            variant="Bold"
            as={APP_ICONS.TEXT}
          />
          <Text color={"#828282"} fontSize={"10px"}>
            Text
          </Text>
        </Box>
      ),
      content: (
        <TextTab
          handleOnBlur={handleOnBlur}
          handleTextChange={handleTextChange}
          handleTextFocus={handleTextFocus}
          setTemplates={setTemplates}
          currentTemplate={canvasData.activeTemplate}
          template={templateData}
          dispatch={dispatch}
          texts={canvasData?.texts}
        />
      ),
    },
    {
      label: (
        <Box>
          <Icon
            h={"22px"}
            w={"22px"}
            color="#828282"
            variant="Bold"
            as={APP_ICONS.FILL}
          />
          <Text color={"#828282"} fontSize={"10px"}>
            Background
          </Text>
        </Box>
      ),
      content: (
        <Background
          action={handleGenerate}
          state={canvasData}
          dispatch={dispatch}
        />
      ),
    },
    {
      label: (
        <Box>
          <Icon
            h={"22px"}
            w={"22px"}
            color="#828282"
            variant="Bold"
            as={APP_ICONS.BUBBLE}
          />
          <Text color={"#828282"} fontSize={"10px"}>
            Logo
          </Text>
        </Box>
      ),
      content: (
        <Logo action={handleGenerate} state={canvasData} dispatch={dispatch} />
      ),
    },
    {
      label: (
        <Box>
          <Icon
            h={"22px"}
            w={"22px"}
            color="#828282"
            variant="Bold"
            as={APP_ICONS.GALLERY}
          />
          <Text color={"#828282"} fontSize={"10px"}>
            Image
          </Text>
        </Box>
      ),
      content: (
        <ImageUpload
          action={handleGenerate}
          state={canvasData}
          dispatch={dispatch}
        />
      ),
    },
  ];

  return (
    <Box>
      <TableHeaderOptions
        action={() => {}}
        title={"Tools"}
        subtitle={"Tools/ Poster Generator"}
      />

      <Heading
        fontSize={"20px"}
        mt={"10"}
        color={getColor(colorKeys.whiteSmoke, colorMode)}
      >
        Poster Generator
      </Heading>

      <Flex>
        <Box
          style={{
            marginTop: 20,
            padding: "5px",
            boxShadow: "0px 0px 30px 0px #0000000D",
            borderRadius: "10px",
            minWidth: "1300px",
          }}
        >
          <Toolbar
            action={handleExport}
            state={canvasData}
            dispatch={dispatch}
            template={templates[canvasData.activeTemplate.templateIndex]}
            handleTextChange={handleTextChange}
            handleTextClick={handleTextClick}
            handleOnBlur={handleOnBlur}
            activeTemplate={templateData}
            currentTemplate={canvasData.activeTemplate}
            setTemplates={setTemplates}
          />
          <HStack mt={5} alignItems={"flex-start"}>
            <DataTabs
              tabsProps={{
                orientation: "vertical",
                padding: "10px",
                Height: "571px",
                borderColor: "transparent",
              }}
              tabListProps={{
                borderRadius: "10px",
                alignItems: "center",
                Height: "571px",
                bg: "#F4F7FF",
                borderColor: "#B8CCFD",
                borderWidth: "1px",
              }}
              tabProps={{
                p: 0,
                w: "full",
                p: "5px 35px",
                w: "55px",
                h: "59px",
              }}
              data={tabData}
              tabExtention={
                <Divider
                  m="5px"
                  bg="red"
                  h="2px"
                  w="calc(100% - 18px)"
                  mx="auto"
                  rounded="md"
                />
              }
              tabPanelsProps={{ w: "270px", h: "579px" }}
            />

            <Box>
              <Canvas
                state={canvasData}
                preview={true}
                template={templateData}
                canvasRef={canvasRef}
                setTemplates={setTemplates}
                {...canvasData}
                dispatch={dispatch}
                handleTextClick={handleTextClick}
                handleTextChange={handleTextChange}
                handleOnBlur={handleOnBlur}
              />
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default PosterGenerator;
