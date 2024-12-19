import {
    Box,
    HStack,
    VStack,
    Icon,
    Text,
    IconButton,
    useColorMode,
    Button,
    Heading,
    SimpleGrid
} from '@chakra-ui/react'
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../config/constants/icons";
import React, { useEffect, useRef, useState } from 'react'
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_IMAGES from '../../../../config/constants/images';
import DataDrawer from "../../../../components/data/Poppers/DataDrawer";
import Canvas from './Canvas';

const Resize = ({ state, dispatch, action, disclosure, template }) => {
    const { colorMode } = useColorMode();
    const [selected, setSelected] = useState();

    const handleApply = () => {
        if(selected || selected === 0){
            dispatch({ type: 'template', payload: { sizeIndex: selected } })
            disclosure.onClose();
        }
    }


    return (
        <DataDrawer disclosure={disclosure}>
            <HStack flex={1} justifyContent={"space-between"}>
                <HStack>
                    <TableHeaderOptions
                        action={() => { }}
                        title={"Resize"}
                        titleProps={{ fontWeight: "400" }}
                    />
                </HStack>

                <HStack>
                    <HStack mr={5}>
                        <Text fontWeight={"400"}>
                            Custom
                        </Text>
                        <Button
                            backgroundColor={"#FFFFFF"}
                            textColor={"#878787"}
                            borderWidth={"1px"}
                            borderColor={"#C8C8C8"}>
                            Width
                        </Button>

                        <Button
                            backgroundColor={"#FFFFFF"}
                            textColor={"#878787"}
                            borderWidth={"1px"}
                            borderColor={"#C8C8C8"}>
                            Height
                        </Button>
                    </HStack>


                    <Button
                    backgroundColor={"#000000"}
                    textColor={"#FF5017"}
                    onClick={handleApply}>
                        Apply
                    </Button>
                </HStack>
            </HStack>

            <Box
                style={{
                    marginTop: 20,
                    padding: '5px',
                    boxShadow: '0px 0px 30px 0px #0000000D',
                    borderRadius: "10px"
                }}
            >
                <CanvasSizesList
                    action={action}
                    templateList={template}
                    mainContent={state.mainContent}
                    subContent={state.subContent}
                    btnText={state.btnText}
                    images={state.images}
                    canvasImages={state.canvasImages}
                    dispatch={dispatch}
                    setSelected={setSelected}
                    selected={selected}
                    texts={state.texts}
                />
            </Box>
        </DataDrawer>
    )
}

export default Resize;

const CanvasSizesList = ({ templateList, mainContent, subContent, btnText, images, action, dispatch, selected, setSelected, texts, canvasImages }) => {

    const dataList = templateList?.map((template, index) =>
        <CanvasItem
            key={index}
            index={index}
            action={action}
            mainContent={mainContent}
            subContent={subContent}
            btnText={btnText}
            images={images}
            canvasImages={canvasImages}
            template={template}
            setSelected={setSelected}
            selected={selected}
            texts={texts} />)

    return (
        <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={4}
            style={
                {
                    "display": "flex",
                    "flexWrap": "wrap",
                    "alignItems": "center",
                    "justifyContent": "space-around",
                    "overflow": "auto",
                    "height": "100%"
                }
            }>
            {dataList}
        </SimpleGrid>
    )
}


const CanvasItem = (props) => {
    const { mainContent, subContent, btnText, images, template, action, index, onClick, setSelected, selected, texts, canvasImages } = props;
    console.log("template:", template)
    const canvasRef = useRef(null)
    const [src, setSrc] = useState('')

    useEffect(() => {
        if (canvasRef.current) {
            setTimeout(convertCanvasToImage, 150)
        }
      }, [
        btnText,
        mainContent,
        subContent,
        images,
        template,
       texts,
       canvasImages
      ]);
    
      const convertCanvasToImage = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
    
        const img = new Image();
        img.src = dataURL;
        setSrc(img.src);
      };

    // useEffect(() => {
    //     if (canvasRef.current) {
    //         // convertCanvasToImage();
    //         setTimeout(convertCanvasToImage, 250)
    //     }
    // }, [canvasRef])

    // const convertCanvasToImage = async () => {
    //     const canvas = await canvasRef.current.content.querySelector('canvas');
    //     const dataURL = await canvas.toDataURL('image/jpeg');

    //     const img = new Image();
    //     img.src = await dataURL;
    //     console.log("imageLoaded", img.src)
    //     setSrc(img.src);

    // };
    return (
        <Box
            onClick={() => setSelected(index)}
            style={
                {
                    "display": "flex",
                    "flexWrap": "wrap",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "overflow": "none",
                    "height": "100%",
                    "width": "200px",
                    "margin": "10px",
                    "borderRadius": "20px",
                    "flexDirection": "column"
                }
            }>
            <Box
                style={
                    {
                        "display": "none",
                        "flexWrap": "wrap",
                        "alignItems": "center",
                        "justifyContent": "space-around",
                        "overflow": "auto",
                        "height": "100%"
                    }
                }>
                <Canvas canvasRef={canvasRef} {...props} />
            </Box>
            <Box style={
                {
                    "display": "flex",
                    "flexWrap": "wrap",
                    "alignItems": "center",
                    "justifyContent": "space-around",
                    "overflow": "auto",
                    "height": "100%",
                    "width": "100%",
                    "backgroundColor": "#f4f4f4",
                    "borderColor": index === selected ? "#FF5017" : "#f4f4f4",
                    "borderWidth":"2px",
                }
            }>
                <img style={
                    {
                        "display": "flex",
                        "flexWrap": "wrap",
                        "alignItems": "center",
                        "justifyContent": "space-around",
                        "overflow": "auto",
                        "height": "100%",
                        "width": "100%",
                        "backgroundColor": "#f4f4f4",
                        "aspectRatio": "1/1",
                        "objectFit": "contain"
                    }
                } src={src} alt="" />
            </Box>
            <Box style={
                {
                    "display": "flex",
                    "flexWrap": "wrap",
                    "alignItems": "center",
                    "justifyContent": "center",
                    "overflow": "auto",
                    "height": "100%",
                    "width": "100%",
                    "padding": "10px",
                    "margin": "10px",
                    "backgroundColor": "#ffffff",
                    "borderRadius": "20px",
                    "flexDirection": "column",
                    "fontSize": "12px",
                    "fontWeight": "700"
                }
            }>
                <Text>
                {template.name} {"(" + template.canvasSize.width}x{template.canvasSize.height + ")"}
                </Text>
                
            </Box>
        </Box>
    )
}
