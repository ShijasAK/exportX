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

const colors = [
    {
        image: APP_IMAGES.COLOR_BLUE,
        value: "#2892F3"
    },
    {
        image: APP_IMAGES.COLOR_PURPLE,
        value: "#E35CD6"
    },
    {
        image: APP_IMAGES.COLOR_GREEN,
        value: "#55B475"
    },
    {
        image: APP_IMAGES.COLOR_PINK,
        value: "#EA979C"
    },
    {
        image: APP_IMAGES.COLOR_ORANGE,
        value: "#F35828"
    },
    {
        image: APP_IMAGES.COLOR_BROWN,
        value: "#E3BF88"
    },
    {
        image: APP_IMAGES.COLOR_PICKER
    }
]

const FillTab = ({ state, dispatch, action }) => {
    const { colorMode } = useColorMode();
    const onFillChange = (value) =>
    {
        
        dispatch({ type: 'backgroundImage', payload: null })
        dispatch({ type: 'pattern', payload: null })
        dispatch({ type: 'background', payload: value })
    };

    return (
        <Box>
            <TableHeaderOptions
                action={() => { }}
                title={"Background Color"}
                titleProps={{ fontSize: "12px", fontWeight: "400" }}
                containerProps={{ marginTop: "10px" }}
            />

            <SimpleGrid 
                mt={3}
                columns={{ base: 1, md: 5 }}
                spacing={2}
            >
                {colors.map((item, index) => (
                    <Image
                        key={index}
                        src={item.image}
                        onClick={() => onFillChange(item.value)}
                    />
                ))}
            </SimpleGrid>
        </Box>
    )
}
export default FillTab;