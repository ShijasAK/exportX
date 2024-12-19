import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import APP_IMAGES from "../../../../config/constants/images";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Path,
  Image as KonvaImage,
  Group,
  Transformer,
  Image,
} from "react-konva";
import React, { useEffect, useRef, useState } from "react";
import { Html } from "react-konva-utils";
import { addHistory } from "../../../../config/redux/slices/historySlice";
import { useDispatch } from "react-redux";
import { getUpdatedTemplate } from "../../../../config/utils/canvasUtil";
import APP_ICONS from "../../../../config/constants/icons";

const Canvas = ({
  btnText,
  mainContent,
  subContent,
  images,
  canvasImages,
  canvasRef,
  template,
  preview,
  activeTemplate,
  setTemplates,
  dispatch,
  texts,
  currentTextId,
  handleTextClick,
  handleTextChange,
  handleOnBlur,
  state,
}) => {
  const dispatchState = useDispatch();
  const [selectedText, setSelectedText] = useState(
    texts.find((text) => text.id === currentTextId)
  );
  const [image, setImage] = useState({});
  const [canvasSize, setCanvasSize] = useState({
    height: 800,
    width: 685,
  });

  useEffect(() => {
    if (template.canvasSize) {
      setCanvasSize(template.canvasSize);
    }
  }, [template.canvasSize]);

  useEffect(() => {
    loadImage(images.logo.croppedUrl, setImage, "logo");
  }, [images.logo.croppedUrl]);

  useEffect(() => {
    loadImage(images.watermark.croppedUrl, setImage, "watermark");
  }, [images.watermark.croppedUrl]);

  useEffect(() => {
    loadImage(images.image.croppedUrl, setImage, "image");
  }, [images.image.croppedUrl]);

  useEffect(() => {
    loadImage(images.backgroundImage, setImage, "backgroundImage");
  }, [images.backgroundImage]);

  useEffect(() => {
    loadImage(images.pattern, setImage, "pattern");
  }, [images.pattern]);
  
  useEffect(() => {
      canvasImages?.forEach(image => {
      loadImage(image.croppedUrl, setImage, image.id);
      });

  }, [canvasImages]);

  function loadImage(src, setFunction, type) {
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      setFunction((prevstate) => ({ ...prevstate, [type]: image }));
    };
  }
  
  const handleElementDrag = (event, name) => {
    setTemplates((prevState) => {
      const data = {
        [name]: { ...template[name], x: event.target.x(), y: event.target.y() },
      };
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: activeTemplate.templateIndex,
        template,
      });
      return updatedTemplates;
    });
  };

  const handleTextDrag = (event, textId) => {
    // Assuming you have access to dispatch function
    const updatedTexts = template.texts.map((text) => {
      if (text.id === textId) {
        return {
          ...text,
          x: event.target.x(),
          y: event.target.y(),
        };
      }
      return text;
    });

    setTemplates((prevState) => {
      const data = {
        texts: updatedTexts,
      };
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: activeTemplate.templateIndex,
        template,
      });
      return updatedTemplates;
    });

    // dispatch({ type: "set-texts", payload: updatedTexts });
  };

  const handleGroupDrag = (event, elements) => {
    setTemplates((prevState) => {
      const updatedTemplates = [...prevState]; //all templates
      const activeIndex = updatedTemplates[activeTemplate.templateIndex]; //current templates
      const activeItemIndex = activeIndex.findIndex(
        (item) => item.name == template.name
      ); //curent template size
      const updatedTemplateItem = { ...template }; //current template with size

      elements.forEach((element) => {
        let elem = event.target.findOne((node) => {
          return node.attrs.name === element;
        });
        updatedTemplateItem[element] = {
          ...template[element],
          x: template[element].x + event.target.x(),
          y: template[element].y + event.target.y(),
          // x: elem.x(),
          // y: elem.y()
        };
      });

      activeIndex[activeItemIndex] = updatedTemplateItem; //updating item inside current template size

      return updatedTemplates;
    });
  };

  const handleTransform = ({
    name,
    x,
    y,
    scaleX,
    scaleY,
    height,
    width,
    rotation,
  }) => {
    setTemplates((prevState) => {
      const data = {
        [name]: {
          ...template[name],
          x: x,
          y: y,
          // width: width, // Adjust width based on scaleX
          // height: height,// Adjust height based on scaleY
          scaleY: scaleY,
          scaleX: scaleX,
          rotation: rotation, // Set the rotation
        },
      };
      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: activeTemplate.templateIndex,
        template,
      });

      return updatedTemplates;
    });
  };

  // selectable images
  const [selectors, setSelectors] = useState([
    template.watermark,
    template.image,
    template.logo,
  ]);
  const [selectedId, setSelectedId] = useState(null);
  //const [currentTextId, setCurrentTextId] = useState(null);
  const [newTextPosition, setNewTextPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (id) => {
    setSelectedId(id);
    dispatch({ type: "set-selectedImageId", payload: id });
  };

  const handleStageDblClick = (event) => {
    const { x, y } = event.target.getStage().getPointerPosition();
    setNewTextPosition({ x, y });
    const newText = {
      id: template.texts.length + 1,
      text: "Text",
      x,
      y,
      fontStyle: "",
      fontSize: 20,
      font: "Inter",
      fontColor: "#000000",
    };
    dispatch({ type: "set-texts", payload: [...texts, newText] });

    //updating template
    setTemplates((prevState) => {
      const data = {
        texts: [...template.texts, newText],
      };

      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: activeTemplate.templateIndex,
        template,
      });

      return updatedTemplates;
    });

    //setCurrentTextId(newText.id);
    dispatchState(
      addHistory({
        ...state,
        texts: [...texts, newText],
      })
    );
  };

  useEffect(() => {
    setSelectedText(template.texts.find((text) => text.id === currentTextId));
  }, [currentTextId]);

  const onDeleteText = () => {
    let updatedTexts = template.texts.filter((text) => text.id != selectedText.id);
    updatedTexts = updatedTexts.map((text, index) => ({...text, id: index + 1}))
    dispatch({ type: "set-texts", payload: updatedTexts });

    //updating template
    setTemplates((prevState) => {
      const data = {
        texts: updatedTexts,
      };

      const updatedTemplates = getUpdatedTemplate({
        currentData: prevState,
        data,
        index: activeTemplate.templateIndex,
        template,
      });

      return updatedTemplates;
    });
    
    setSelectedText(null);
  };

  // rectangles and paths
  const rectangles =
    template?.rectangles &&
    template.rectangles.map((rect, index) => <Rect key={index} {...rect} />);
  const paths =
    template?.paths &&
    template.paths.map((path, index) => <Path key={index} {...path} />);

  return (
    <Box
      style={{
        borderWidth: "40px",
        borderColor: "#F5EEEE80",
        borderRadius: "10px",
      }}
    >
      <Box justifyContent={"center"}>
        {selectedText?.id && (
          <IconButton
            icon={<Icon as={APP_ICONS.CLOSE} boxSize={5} />}
            size="sm"
            pos={"relative"}
            zIndex={9}
            top={selectedText?.y}
            left={selectedText?.x}
            onClick={onDeleteText}
          />
        )}
        <Stage
          height={canvasSize.height}
          width={canvasSize.width}
          ref={canvasRef}
          onDblClick={handleStageDblClick}
        >
          <Layer>
            <Rect
              {...template.preview}
              {...canvasSize}
              fill={images.background || template.background.fill}
            />
            {images.pattern && (
              <Rect fillPatternImage={image.pattern} {...canvasSize} />
            )}
            {images.backgroundImage && (
              <Image image={image.backgroundImage} {...canvasSize} />
            )}

            {images.watermark.croppedUrl && (
              <ImageGenerator
                shapeProps={{ ...template.watermark }}
                isSelected={"watermark" === selectedId}
                onSelect={() => handleImageClick("watermark")}
                changeAction={handleElementDrag}
                transformAction={handleTransform}
                image={image.watermark}
                name="watermark"
                opacity={0.4}
                x={canvasSize.width - 100}
                y={canvasSize.height - 100}
                draggable={true}
              />
            )}
          </Layer>

          <Layer></Layer>

          <Layer>
            {template?.texts &&
              template?.texts.map((text) => (
                <React.Fragment>
                  <Text
                    key={text.id}
                    id={text.id}
                    x={text.x}
                    y={text.y}
                    text={text.text}
                    fontSize={text.fontSize}
                    fontFamily={text.font}
                    onClick={handleTextClick}
                    draggable
                    fontStyle={text.fontStyle}
                    fill={text.fontColor}
                    onDragEnd={(event) => {
                      // handleElementDrag(event,"texts")
                      handleTextDrag(event, text.id);
                    }}
                  />
                  {currentTextId === text.id && (
                    <Html divProps={{ style: { opacity: 1 } }} draggable>
                      <Input
                        value={text.text}
                        key={text.id}
                        onChange={handleTextChange}
                        onBlur={handleOnBlur}
                        className="text-input-canvas"
                        style={{
                          position: "absolute",
                          left: text.x,
                          top: text.y,
                          width: 200,
                          height: 30,
                          fontSize: 20,
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "blue",
                          padding: 5,
                        }}
                        autoFocus
                      />
                    </Html>
                  )}
                </React.Fragment>
              ))}

            {rectangles}

            {/* <Image {...template.image} image={image.image} draggable onDragEnd={(e) => handleElementDrag(e, 'image')} /> */}
            {
            images.image.croppedUrl && (
              <ImageGenerator
                shapeProps={{ ...template.image }}
                isSelected={"image" === selectedId}
                onSelect={() => setSelectedId("image")}
                changeAction={handleElementDrag}
                transformAction={handleTransform}
                image={image.image}
                name="image"
                draggable={true}
              />
            )}
            
            {canvasImages && canvasImages.map((img, index) => 
              (  
                <ImageGenerator
                  shapeProps={{ ...template.image }}
                  key={index}
                  isSelected={img.id === selectedId}
                  onSelect={() => handleImageClick(img.id)}
                  changeAction={handleElementDrag}
                  transformAction={handleTransform}
                  image={image[img.id]}
                  name={img.id}
                  draggable={true}
                />
              )
            )}

            {/* <Path {...template.pattern} /> */}
            {/* <Image {...template.logo} image={image.logo} draggable onDragEnd={(e) => handleElementDrag(e, 'logo')} /> */}
            {images.logo.croppedUrl && (
              <ImageGenerator
                shapeProps={{ ...template.logo }}
                isSelected={"logo" === selectedId}
                onSelect={() => handleImageClick("logo")}
                changeAction={handleElementDrag}
                transformAction={handleTransform}
                image={image.logo}
                name="logo"
                draggable={true}
              />
            )}
            {/* <ImageGenerator /> */}

            {/* <Image {...template.watermark} x={(template.canvasSize.width - 300) / 2} y={(template.canvasSize.height - 300) / 2} opacity={0.2} image={image.watermark} /> */}
            {/* <Image {...template.watermark} x={canvasSize.width - 50} y={canvasSize.height - 50} opacity={0.2} image={image.watermark} /> */}
            {paths}

            {/* <Text
              {...template.mainContent}
              draggable
              onDragEnd={(e) => handleElementDrag(e, "mainContent")}
              text={mainContent?.text}
              fontSize={mainContent?.fontSize || template.mainContent.fontSize}
              fill={mainContent?.color || template.mainContent.fill}
            />

            <Text
              {...template.subContent}
              draggable
              onDragEnd={(e) => handleElementDrag(e, "subContent")}
              text={subContent?.text}
              fontSize={subContent?.fontSize || template.subContent.fontSize}
              fill={subContent?.color || template.subContent.fill}
            />
            // {/* <Group draggable={true} onDragEnd={(e) => handleGroupDrag(e, ['btnBox', 'btnText'])}> */}
            {/* {btnText.text && (
              <Rect
                draggable={true}
                onDragEnd={(e) => handleElementDrag(e, "btnBox")}
                {...template.btnBox}
              />
            )}
            <Text
              draggable={true}
              onDragEnd={(e) => handleElementDrag(e, "btnText")}
              {...template.btnText}
              text={btnText?.text}
              fontSize={btnText?.fontSize || template.btnText.fontSize}
              fill={btnText?.color || template.btnText.fill}
            />  */}
            {/* </Group> */}
          </Layer>
        </Stage>
      </Box>
    </Box>
  );
};

export default Canvas;

const ImageGenerator = ({
  shapeProps,
  x,
  y,
  isSelected,
  onSelect,
  changeAction,
  transformAction,
  draggable,
  image,
  name,
  opacity,
}) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        x={x}
        y={y}
        {...shapeProps}
        draggable={draggable}
        onDragEnd={(e) => changeAction(e, name)}
        image={image}
        opacity={opacity}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation(); // Get the rotation value

          transformAction({
            ...shapeProps,
            name: name,
            x: node.x(),
            y: node.y(),
            scaleX: scaleX,
            scaleY: scaleY,
            // width: Math.max(5, node.width() * scaleX),
            // height: Math.max(node.height() * scaleY),
            rotation: rotation, // Pass the rotation value
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
