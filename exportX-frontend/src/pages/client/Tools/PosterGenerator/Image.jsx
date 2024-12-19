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
    Button
} from '@chakra-ui/react'
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../config/constants/icons";
import React from 'react'
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_IMAGES from '../../../../config/constants/images';
import { useForm } from "react-hook-form";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import FormFileUpload from "../../../../components/forms/FormFileUpload";
import DropzoneCard, {
    dropZoneParentStyles,
} from "../../../../components/data/Cards/DropzoneCard";
import { FILE_TYPES } from "../../../../config/constants/defaults";
import CropForm from './CropForm';

const ImageUpload = ({ state, dispatch, action }) => {
    const { colorMode } = useColorMode();
    
    const onImageChange = (e) => {
        //dispatch({ type: 'images', payload: { element: 'image', imageUrl: e } })
        dispatch({ type: 'add-image', payload: {
            id: 'image' + state.canvasImages?.length,    
            url: e.file,
            crop: {
                unit: "%",
                x: 0,
                y: 0,
                width: 50,
                height: 50,
            },
            croppedUrl: "",
            ratio: 0,
        } })
    };

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
                title={"Image"}
                containerProps={{ marginTop: "10px" }}
                titleProps={{fontSize:"16px"}}
            />


            <Box mt={'10px'}>
                <Text fontSize={"15px"} mb={2}  textColor={'#707070'}>Upload Image</Text>
                <FormFileUpload
                    id={"logo"}
                    onChange={onImageChange}
                    label={"Upload Image"}
                    component={<DropzoneCard textProps={{fontSize:"10px"}} subTextProps={{fontSize:"10px"}}/>}
                    componentProps={dropZoneParentStyles}
                    fileType={FILE_TYPES.IMAGE}
                />
            </Box>


            {state.modal.crop.isActive &&
                <CropForm {...state.activeForm} dispatch={dispatch} />
            }
        </Box>

    )
}

export default ImageUpload;