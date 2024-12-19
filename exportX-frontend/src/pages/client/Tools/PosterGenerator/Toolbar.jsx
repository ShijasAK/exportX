import {
  Box,
  HStack,
  Text,
  IconButton,
  Icon,
  useColorMode,
  SimpleGrid,
  Button,
  useDisclosure,
  InputGroup,
  Input,
  Image,
  Flex
} from "@chakra-ui/react";
import APP_ICONS from "../../../../config/constants/icons";
import React, { useEffect, useRef, useState, useController } from "react";
import {
  colorKeys,
  colors,
  getColor,
} from "../../../../config/constants/colors";
import Resize from "./Resize";
import Canvas from "./Canvas";
import DropdownSelect from "../../../../components/controls/Dropdowns/DropdownSelect";
import APP_IMAGES from "../../../../config/constants/images";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addHistory,
  decreaseIndex,
  increaseIndex,
} from "../../../../config/redux/slices/historySlice";
import { SketchPicker } from "react-color";
import CustomPopover from "../../../../components/controls/Popovers/CustomPopover";
import { getUpdatedTemplate } from "../../../../config/utils/canvasUtil";

const modules = {
  toolbar: [
    ["bold", "italic"], // toggled buttons
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    ["clean"], // remove formatting button
  ],
};

const Fonts = [
  {
    id: 1,
    label: "Inter",
  },
  {
    id: 2,
    label: "Ariel",
  },
  {
    id: 3,
    label: "Helvetica",
  },
  {
    id: 4,
    label: "Calibri",
  },
  {
    id: 5,
    label: "Open Sans",
  },
  {
    id: 6,
    label: "Roboto",
  },
  {
    id: 7,
    label: "Georgia",
  },
];

const Toolbar = ({
  action,
  dispatch,
  template,
  state,
  activeTemplate,
  handleTextChange,
  handleTextClick,
  handleOnBlur,
  setTemplates,
  currentTemplate
}) => {
  const { history, currentIndex } = useSelector((state) => state.history);
  const dispatchState = useDispatch();
  const { colorMode } = useColorMode();
  const resizeDisclosure = useDisclosure();
  const canvasRef = useRef(null);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (canvasRef.current) {
      // convertCanvasToImage();
      setTimeout(convertCanvasToImage, 100);
    }
  }, [canvasRef]);

  const convertCanvasToImage = async () => {
    const canvas = await canvasRef.current.content.querySelector("canvas");
    const dataURL = await canvas.toDataURL("image/jpeg");

    const img = new Image();
    img.src = await dataURL;
    setSrc(img.src);
  };

  const handleBold = () => {
    const updatedTexts = activeTemplate.texts.map((text) => {
      if (text.id === Number(state.lastTextId)) {
        return {
          ...text,
          fontStyle: 'bold'
        };
      }
      return text;
    });

    setTemplates((prevState) => {
      const data = {
        texts: updatedTexts,
      };
      let template = activeTemplate
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: currentTemplate.templateIndex,
        template,
      });
      return updatedTemplates;
    });
  };


  const handleItalic = () => {
    const updatedTexts = activeTemplate.texts.map((text) => {
      if (text.id === Number(state.lastTextId)) {
        return {
          ...text,
          fontStyle: 'italic'
        };
      }
      return text;
    });

    setTemplates((prevState) => {
      const data = {
        texts: updatedTexts,
      };
      let template = activeTemplate
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: currentTemplate.templateIndex,
        template,
      });
      return updatedTemplates;
    });
  };

  const handleFontSize = (e) => {
    const updatedTexts = activeTemplate.texts.map((text) => {
      if (text.id === Number(state.lastTextId)) {
        return {
          ...text,
          fontSize: e.target.value
        };
      }
      return text;
    });

    setTemplates((prevState) => {
      const data = {
        texts: updatedTexts,
      };
      let template = activeTemplate
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: currentTemplate.templateIndex,
        template,
      });
      return updatedTemplates;
    });
    dispatch({ type: "set-currentFontSize", payload: e.target.value });
  };

  const onFontChange = (e) => {
    const updatedTexts = activeTemplate.texts.map((text) => {
      if (text.id === Number(state.lastTextId)) {
        return {
          ...text,
          font: e.label
        };
      }
      return text;
    });

    setTemplates((prevState) => {
      const data = {
        texts: updatedTexts,
      };
      let template = activeTemplate
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: currentTemplate.templateIndex,
        template,
      });
      return updatedTemplates;
    });
    dispatch({ type: "set-currentFontFamily", payload: e.label });
  };

  const onDeleteImage = () => {
    if(state.selectedImageId){
      dispatch({ type: 'images', payload: { element: state.selectedImageId, imageUrl: '' } })
      const updatedCanvasImages = state.canvasImages.filter((image) => image.id !== state.selectedImageId);
      console.log("updated:", state.canvasImages)
      dispatch({type: 'update-images', payload: updatedCanvasImages})
    }   
};

  const handleUndo = () => {
    dispatch({
      type: "overwrite-state",
      payload: history[history?.length - currentIndex - 2] || history[0] || state,
    });
    dispatchState(increaseIndex());
  };

  const handleRedo = () => {
    dispatch({
      type: "overwrite-state",
      payload: history[history?.length - currentIndex] || history[history?.length - 1] || state,
    });
    dispatchState(decreaseIndex());
  };

  const handleFontColor = (color) =>{
    const updatedTexts = activeTemplate.texts.map((text) => {
      if (text.id === Number(state.lastTextId)) {
        return {
          ...text,
          fontColor: color.hex
        };
      }
      return text;
    });

    setTemplates((prevState) => {
      const data = {
        texts: updatedTexts,
      };
      let template = activeTemplate
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: currentTemplate.templateIndex,
        template,
      });
      return updatedTemplates;
    });
    dispatch({ type: "set-currentFontColor", payload: color.hex });
  }


  return (
      <SimpleGrid spacing={10} flex={1} mt={3} columns={{ base: 1, md: 3 }} w={"1000px"}  >
      <HStack flex={1} alignItems={"flex-end"} justifyContent={"flex-end"}>
        <IconButton
          variant={"ghost"}
          flex={true}
          alignSelf={"flex-end"}
          icon={
            <Icon
              as={APP_ICONS.ARROW_LEFT}
              boxSize={7}
              color={getColor(colorKeys.danger, colorMode)}
            />
          }
        ></IconButton>
      </HStack>
      <HStack>
        {/* <ReactQuill
                value={
                    state.currentTextId
                        ? state.texts.find((text) => text.id === state.currentTextId)?.text || ''
                        : ''
                }
                modules={modules}
                onChange={handleTextChange}                
            /> */}
        <HStack
          alignSelf={"center"}
          justifySelf={"flex-end"}
          backgroundColor={"#EDF3FF"}
          borderRadius={5}
          padding={1}
          flex={1}
          w={"571px"}
          h={'32px'}
        >
          <Flex >
            <IconButton
            variant={"ghost"}
            boxSize={5}
            onClick={handleUndo}
            icon={<Icon as={APP_ICONS.UNDO} boxSize={5} color={"#292D32"} />}
          ></IconButton>

          <IconButton
            variant={"ghost"}
            boxSize={5}
            onClick={handleRedo}
            icon={<Icon as={APP_ICONS.REDO} boxSize={5} color={"#292D32"} />}
          ></IconButton>
          </Flex>

          <DropdownSelect
            value={state.selectedFontFamily}
            options={Fonts}
            onChange={onFontChange}
            buttonProps={{
              h: "26px",
              w: "136px",
              fonstSize: "12",
              bg: colors.light,
              color: "#828282",
              // paddingTop: "4",
              // paddingBottom: "4",
              borderRadius: "md",
              borderWidth: "0.5px",
              borderColor: "#1758FF",
            }}
          />

          <InputGroup width={"60px"}>
            <Input
              value={state.selectedFontSize}
              id={"fontSize"}
              onChange={handleFontSize}
              min={10}
              max={100}
              height={"26px"}
              type={"number"}
              // paddingTop={"4"}
              // paddingBottom={"4"}
              borderWidth={"0.5px"}
              borderColor={"#1758FF"}
              fontSize={'12px'}
            />
          </InputGroup>

          <IconButton
            variant={"ghost"}
            flex={true}
            h={'26px'}
            onClick={handleBold}
            icon={<Icon as={APP_ICONS.BOLD} boxSize={3} color={"#292D32"} />}
            style={{
              backgroundColor: state.lastTextId && activeTemplate.texts.find(text => text.id === state.lastTextId)?.fontStyle === 'bold' ? '#D4DAE8' : '#EDF3FF',
            }}
          ></IconButton>

          <IconButton
            variant={"ghost"}
            flex={true}
            h={'26px'}
            onClick={handleItalic}
            icon={<Icon as={APP_ICONS.ITALIC} boxSize={3} color={"#292D32"} />}
            style={{
              backgroundColor: state.lastTextId && activeTemplate .texts.find(text => text.id === state.lastTextId)?.fontStyle === 'italic' ? '#D4DAE8' : '#EDF3FF',
            }}
          ></IconButton>

          <HStack
            style={{
              backgroundColor: "#ffffff",
              marginRight: 10,
              borderRadius: 5,
            }}
            h={'26px'}
            w={'70px'}
          >

            <CustomPopover
              headingProps={{ display: "none" }}
              hideCloseButton={true}
              label={
                <Flex w="full" justifyContent={"space-between"} align="center">
                  <Text ml={'-10px'} fontSize={'10px'}>Color</Text>
                  {(
                    <Box w="28px" h="26px" rounded="md" ml={'12px'} bg={state.selectedFontColor}></Box>
                  )}
                </Flex>
              }
              contentProps={{
                width: "247px",
                background: "transparent",
                border: "none",
              }}
              placement="top"
              triggerProps={{
                bg: "transparent",
                fontWeight: "normal",
                color: "#828282",
                w: "full",
                textAlign: "left",
                _hover: {
                  bg: "inherit",
                },
              }}
            >
              <SketchPicker
                onChange={handleFontColor}
                color={state.selectedColor}
              />
            </CustomPopover>
          </HStack>
        </HStack>
        <HStack ml={30}>
            <IconButton
              variant={"ghost"}
              flex={true}
              alignSelf={"flex-end"}
              onClick={onDeleteImage}
              icon={
                <Icon
                  as={APP_ICONS.EYE}
                  variant="Bold"
                  boxSize={5}
                  color={"#C2C2C2"}
                />
              }
            >
            </IconButton>


          <Button fontSize={'12px'} _hover={{bgColor:"none"}} backgroundColor={"#FFFFFF"} onClick={resizeDisclosure.onOpen}>
            Resize
          </Button>

          <Button fontSize={'12px'} _hover={{bgColor:"none"}} backgroundColor={"#FFFFFF"}>Present</Button>

          <Button
            backgroundColor={"#000000"}
            textColor={"#FF5017"}
            onClick={() => action(canvasRef, activeTemplate.name)}
            fontSize={'10px'}
            h={'25px'}
          >
            Download
          </Button>
        </HStack>
      </HStack>

      <Box
        style={{
          display: "none",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          overflow: "auto",
          height: "100%",
        }}
      >
        {template && (
          <Canvas
            state={state}
            canvasRef={canvasRef}
            action={action}
            template={activeTemplate}
            mainContent={state.mainContent}
            subContent={state.subContent}
            btnText={state.btnText}
            images={state.images}
            canvasImages={state.canvasImages}
            texts={state.texts}
            handleTextClick={handleTextClick}
            handleTextChange={handleTextChange}
            handleOnBlur={handleOnBlur}
            currentTextId={state.currentTextId}
          />
        )}
      </Box>

      <Resize
        action={action}
        state={state}
        dispatch={dispatch}
        template={template}
        disclosure={resizeDisclosure}
      />
    </SimpleGrid>  
  );
};

export default Toolbar;
