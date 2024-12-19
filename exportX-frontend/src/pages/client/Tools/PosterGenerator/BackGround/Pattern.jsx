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

const Patterns = [
    {
        image: APP_IMAGES.PATTERN1
    },
    {
        image: APP_IMAGES.PATTERN2
    },
    {
        image: APP_IMAGES.PATTERN3
    }
]

const FilterTab = ({ state, dispatch, action }) => {
    const { colorMode } = useColorMode();
    const onImageChange = (e) => {
        dispatch({ type: 'pattern', payload: e.target.src })
        dispatch({ type: 'backgroundImage', payload: null })
        dispatch({type: 'background', payload: null})
    };
    return (
        <Box>
            <TableHeaderOptions
                action={() => { }}
                title={"Patterns"}
                titleProps={{ fontSize: "12px", fontWeight: "400" }}
                containerProps={{ marginTop: "10px" }}
            />
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
                {Patterns.map((item, index) => {
                    return (
                        <Image
                            key={index}
                            src={item.image}
                            onClick={onImageChange}
                        />
                    )
                })}
            </SimpleGrid>
        </Box>

    )
}

export default FilterTab;