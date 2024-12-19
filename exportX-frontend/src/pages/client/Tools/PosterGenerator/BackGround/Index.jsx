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
import ImageTab from './ImageTab';
import GenerateTab from './Generate';
import FillTab from './Fill';
import FilterTab from './Pattern';

const Background = ({ state, dispatch, action }) => {
    const { colorMode } = useColorMode();

    const tabData =[
        {
            label: <Icon
            boxSize={"4"}
            color="#D3D3D3"
            variant="Bold"
            as={APP_ICONS.GALLERY}
          />,
            content: <ImageTab action={action} state={state} dispatch={dispatch}/>
        },
        {
            label:<Icon
            boxSize={"4"}
            color="#D3D3D3"
            variant="Bold"
            as={APP_ICONS.GNERATE}
          />,
            content: <GenerateTab />
        },
        {
            label:<Icon
            boxSize={"4"}
            color="#D3D3D3"
            variant="Bold"
            as={APP_ICONS.FILL}
          />,
            content: <FillTab action={action} state={state} dispatch={dispatch}/>
        },
        {
            label:<Icon
            boxSize={"4"}
            color="#D3D3D3"
            variant="Bold"
            as={APP_ICONS.COLORFILTER}
          />,
            content: <FilterTab action={action} state={state} dispatch={dispatch}/>
        }
    ];
    

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
                title={"Background"}
                containerProps={{ marginTop: "10px" }}
                titleProps={{fontSize:"16px"}}
            />

            <DataTabs
                data={tabData}
                tabsProps={{ border: "#fff", borderRadius: 0, isFitted: true}}
                tabListProps={{ bg: "#fff", justifyContent:"space-between"}}
                tabProps={{
                    color: colorKeys.danger,
                    w: "35px" ,
                    _selected: {
                        bg: "#fff",
                        borderBottom: "4px solid",
                        borderBottomColor: getColor(colorKeys.primary, colorMode),
                    },
                }}
            />

        </Box>
    )
}

export default Background;