import {
    Box,
    HStack,
    VStack,
    Icon,
    Text,
    IconButton,
    useColorMode,
    Heading,
    Image,
    SimpleGrid
} from '@chakra-ui/react'
import TableHeaderOptions from "../../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../../config/constants/icons";
import React, { useEffect, useState } from 'react'
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import APP_IMAGES from '../../../../../config/constants/images';
import template1 from './template1';
import template2 from './template2';
import template3 from './template3';
import emptyTemplate from './emptytemplate';


const TemplateLayout = [
    {
        title: "1080 x 1080",
        icon: APP_ICONS.SCREEN
    },
    {
        title: "1080 x 1080",
        icon: APP_ICONS.SCREEN
    },
    {
        title: "1080 x 1080",
        icon: APP_ICONS.SCREEN
    },
    {
        title: "1080 x 1080",
        icon: APP_ICONS.SCREEN
    },
    {
        title: "1080 x 1080",
        icon: APP_ICONS.SCREEN
    }

]

export const TemplateImages = [
    emptyTemplate,template3, template1, template2

]

const Templates = ({ templates, dispatch, activeTemplate, activeSize, template, resetTemplates }) => {
    const { colorMode } = useColorMode();

    const handleTemplateChange = (index) => {
        resetTemplates()
        dispatch({ type: 'backgroundImage', payload: templates[index][activeSize].backgroundImage })
        dispatch({ type: 'pattern', payload: null })
        dispatch({ type: 'background', payload: '' })
        dispatch({ type: 'template', payload: { templateIndex: index } })
    }

    const handleSizeChange = (index) => {
        dispatch({ type: 'template', payload: { sizeIndex: index } })
    }

    const handleAddTemplate = () => {dispatch({ type: 'template', payload: { templateIndex: 0 } })}

    return (
        <Box
            style={{
                padding: '10px',
                borderRadius: "10px",
                borderColor: "#F2F2F2",
                borderWidth: "1px",
                width: "210px",
                height: "570px"
            }}
        >
            <TableHeaderOptions
                action={() => { }}
                title={"Templates"}
                containerProps={{ marginTop: "10px" }}
                titleProps={{ fontSize: "16px" }}
            />


            <HStack
                overflowX={"scroll"}
                spacing={1}
                sx={{
                    '&::-webkit-scrollbar': {
                        height: "5px",
                        w: "5px",
                        overflowX: 'auto'
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '5px',
                        w: "5px",
                        overflowX: 'auto'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: "#787878",
                        borderRadius: '24px',

                        w: "1px",
                        overflowX: 'auto'
                    },
                }}
                style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "5px",
                    marginTop: "10px"
                }}>
                <HStack marginLeft={2}>
                    {template && template.map((item, index) => {
                        return (
                            <VStack
                                mt={2}
                                key={index}
                                justifyContent={"center"}
                                display={"flex"}
                                onClick={() => handleSizeChange(index)}
                            >
                                <Image

                                    src={item.icon}
                                />
                                <Text fontSize="7px" color={getColor(colorKeys.gray, colorMode)}>
                                    {item.canvasSize?.width}x{item.canvasSize?.height}
                                </Text>
                            </VStack>
                        )
                    })}
                </HStack>

            </HStack>

            <Heading
                color={getColor(colorKeys.dark, colorMode)}
                as="h4"
                fontSize={"10px"}
                fontWeight="650"
                marginTop="20px"
            >
                {template && template[activeSize]?.canvasSize?.width}x{template && template[activeSize]?.canvasSize?.height}
            </Heading>

            <VStack
                mt={"10px"}
                maxHeight={"300px"}
                overflowY={'scroll'}
                sx={{
                    '&::-webkit-scrollbar': {
                        height: "5px",
                        w: "5px",
                        overflowX: 'auto'
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '5px',
                        w: "5px",
                        overflowX: 'auto'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: "#1758FF",
                        borderRadius: '24px',

                        w: "1px",
                        overflowX: 'auto'
                    },
                }}
            >
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={4}
                >
                    <Image
                        onClick={handleAddTemplate}
                        src={APP_IMAGES.ADD_IMAGE}
                    />

                    {TemplateImages.map((item, index) => {
                        return (
                            <Box >
                                <Image
                                    index={index}
                                    key={index}
                                    onClick={() => handleTemplateChange(index)}
                                    src={item[0].preview}
                                    borderRadius={"5px"}
                                    w={"90px"}
                                    h={"90px"}
                                    objectFit={"fill"}
                                />
                            </Box>
                        )
                    })}
                </SimpleGrid>
            </VStack>
        </Box>
    )
}

export default Templates;