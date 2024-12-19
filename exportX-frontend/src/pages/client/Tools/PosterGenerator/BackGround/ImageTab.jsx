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
import React from 'react'
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import APP_IMAGES from '../../../../../config/constants/images';
import DataTabs from "../../../../../components/data/Poppers/DataTabs";
import Templates from '../Templates/Templates';

const Images = [
    {
        image: APP_IMAGES.BGIMAGE4
    },
    {
        image: APP_IMAGES.BGIMAGE2
    },
    {
        image: APP_IMAGES.BGIMAGE1
    },
    {
        image: APP_IMAGES.BGIMAGE4
    },
    {
        image: APP_IMAGES.BGIMAGE2
    },
    {
        image: APP_IMAGES.BGIMAGE1
    },
    {
        image: APP_IMAGES.BGIMAGE2
    },
    {
        image: APP_IMAGES.BGIMAGE1
    },
]

const ImageTab = ({ state, dispatch, action }) => {
    const { colorMode } = useColorMode();
    const onImageChange = (e) => {
        dispatch({ type: 'backgroundImage', payload: e.target.src })
        dispatch({ type: 'pattern', payload: null })
        dispatch({ type: 'background', payload: '' })
    };

    return (
        <SimpleGrid
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
            columns={{ base: 1, md: 2 }}
            spacing={4}
        >
            <Image

                src={APP_IMAGES.ADD_IMAGE}
            />
            {Images.map((item, index) => {
                return (
                    <Image
                        key={index}
                        src={item.image}
                        onClick={onImageChange}
                    />
                )
            })}
        </SimpleGrid>

    )
}

export default ImageTab;