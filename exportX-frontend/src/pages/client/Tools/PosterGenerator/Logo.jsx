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
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../config/constants/icons";
import React from 'react'
import { colorKeys, getColor } from "../../../../config/constants/colors";
import APP_IMAGES from '../../../../config/constants/images';
import { useForm } from "react-hook-form";
import { makeSelectList } from "../../../../config/utils/selectListUtil";
import FormFileUpload from "../../../../components/forms/FormFileUpload";
import FormCheckbox from '../../../../components/forms/FormCheckbox';
import DropzoneCard, {
    dropZoneParentStyles,
} from "../../../../components/data/Cards/DropzoneCard";
import { FILE_TYPES } from "../../../../config/constants/defaults";
import CropForm from './CropForm';

const Logo = ({ state, dispatch, action }) => {
    const { colorMode } = useColorMode();
    const {control} = useForm();
    
    const onLogoChange = (e) => {
      dispatch({ type: 'images', payload: { element: 'logo', imageUrl: e.file } })
  };

  const onWaterMarkChange = (e) => {
    dispatch({ type: 'images', payload: { element: 'watermark', imageUrl: e.file } })
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
                title={"Logo & Watermark"}
                containerProps={{ marginTop: "10px" }}
                titleProps={{fontSize:"16px"}}
            />


        <Box mt={'20px'}>
          <Text fontSize={"13px"} color={"#707070"} mb={2}>Upload Logo</Text>
          <FormFileUpload
            id={"logo"}
            onChange={onLogoChange}
            label={"Upload Logo"}
            component={<DropzoneCard textProps={{fontSize:"10px"}} subTextProps={{fontSize:"10px"}} src={state.images.logo.croppedUrl}/>}
            componentProps={dropZoneParentStyles}
            fileType={FILE_TYPES.IMAGE}
          />
          <Text fontSize={"13px"} color={"#707070"} mt={"10px"} mb={2}>Upload Watermark</Text>
          <FormFileUpload
            id={"watermark"}
            onChange={onWaterMarkChange}
            label={"Upload Watermark"}
            component={<DropzoneCard textProps={{fontSize:"10px"}} subTextProps={{fontSize:"10px"}} src={state.images.watermark.croppedUrl}/>}
            componentProps={dropZoneParentStyles}
            fileType={FILE_TYPES.IMAGE}
          />
          <FormCheckbox
            control={control}
            id={"hideWatermark"}
            options={["Want your poster without\nwatermark?"]}
            optionLabelProps={{ fontSize: "12px", fontWeight:"400" }}
            containerProps={{marginTop: "20px"}}
            inputProps={{colorScheme:'green'}}
          />

        </Box>
        {state.modal.crop.isActive &&
                <CropForm {...state.activeForm} dispatch={dispatch} />
            }
        </Box>

    )
}

export default Logo;