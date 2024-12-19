import {
    Box,
    HStack,
    VStack,
    Icon,
    Text,
    IconButton,
    useColorMode,
    InputRightElement,
    Heading,
    Flex,
    Image,
    SimpleGrid
} from '@chakra-ui/react'
import TableHeaderOptions from "../../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../../config/constants/icons";
import React from 'react'
import { colorKeys, getColor } from "../../../../../config/constants/colors";
import APP_IMAGES from '../../../../../config/constants/images';
import { useForm } from "react-hook-form";
import FormInput from "../../../../../components/forms/FormInput";
import { color } from 'framer-motion';
import PencilIcon from '../../../../../components/Icons/PencilIcon';

const Output = [
    {
        image: APP_IMAGES.GENERATED1
    },
    {
        image: APP_IMAGES.GENERATED2
    },
    {
        image: APP_IMAGES.GENERATED3
    }
]

const GenerateTab = () => {
    const { control } = useForm();
    const { colorMode } = useColorMode();

    return (
        <Box>
            <FormInput id={"prompt"}
            label={"Dalle Prompt"}
            labelProps={{color : "#707070", fontWeight:"400", fontSize:"13px"}}
                placeholder="Enter details..."
                rightAddon={
                    <InputRightElement
                        children={
                            <PencilIcon
                            mr={3}
                            mt={3}
                            // boxSize={"4"}
                            fontSize={'23px'}
                            // color={"#E2E2E2"}
                            // as={APP_ICONS.USERS}
                          />
                        }
                    />
                }
                control={control}
                inputProps={{ fontSize: "12", height: "90px" }}
                containerStyles={{ mt: "10px" }}
            />

            <Flex flexDirection={"column"} flex={1} marginTop={5} >
              <IconButton
                variant={"bold"}
                boxSize={10}
                alignSelf={"flex-end"}
                bg={getColor(colorKeys.secondary, colorMode)}
                icon={
                  <Icon
                    as={APP_ICONS.GNERATE}
                    variant="Bold"
                    boxSize={5}
                    color={getColor(colorKeys.primary, colorMode)}
                  />
                }
              />
            </Flex>

            <SimpleGrid 
             border={"dashed"}
             borderColor={"#ECECEC"}
             padding={1}
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
             mt={3}
             borderWidth={"1px"}>
                {Output.map((item, index) =>{
                    return (
                        <Image
                            key={index}
                            src={item.image}
                        />
                    )
                })}
            </SimpleGrid>
        </Box>
    )
}

export default GenerateTab;