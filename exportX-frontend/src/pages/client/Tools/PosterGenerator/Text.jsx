import {
    Box,
    HStack,
    VStack,
    Icon,
    Input,
    Text,
    IconButton,
    useColorMode,
    InputRightElement,
    InputGroup,
} from "@chakra-ui/react";
import TableHeaderOptions from "../../../../components/data/Table/TableHeaderOptions";
import APP_ICONS from "../../../../config/constants/icons";
import React from "react";
import { colorKeys, getColor } from "../../../../config/constants/colors";
import { getUpdatedTemplate } from "../../../../config/utils/canvasUtil";

const TextTab = ({
    handleTextChange,
    handleTextFocus,
    handleOnBlur,
    template,
    setTemplates,
    currentTemplate,
    texts,
    dispatch,
}) => {
    const { colorMode } = useColorMode();

    const onAddNewText = () => {
        const data = {
            texts: [
                ...texts,
                {
                    id: texts.length + 1,
                    text: "Text",
                    x: template.canvasSize.width/2 || 50,
                    y: template.canvasSize.height/2 || 50,
                    fontStyle: "",
                    fontSize: 20,
                    font: "Inter",
                    fontColor: "#000000",
                },
            ],
        };
        dispatch({ type: "set-texts", payload: data.texts });
        setTemplates((prevState) => {
            const updatedTemplates = getUpdatedTemplate({
                currentData: prevState,
                data,
                index: currentTemplate.templateIndex,
                template,
            });
            return updatedTemplates;
        });
    };

    return (
        <Box
            style={{
                padding: "10px",
                borderRadius: "10px",
                borderColor: "#F2F2F2",
                borderWidth: "1px",
                width: "210px",
                height: "570px",
                overflowY: "scroll",
            }}
        >
            <HStack mt={"10px"} alignItems={"center"}>
                <TableHeaderOptions
                    action={() => { }}
                    title={"Text"}
                    titleProps={{ fontSize: "16px" }}
                />

                <IconButton
                    variant={"bold"}
                    boxSize={7}
                    alignSelf={"flex-end"}
                    bg={getColor(colorKeys.secondary, colorMode)}
                    onClick={onAddNewText}
                    icon={
                        <Icon
                            as={APP_ICONS.GNERATE}
                            variant="Bold"
                            boxSize={5}
                            color={getColor(colorKeys.primary, colorMode)}
                        />
                    }
                />
            </HStack>

            {template.texts?.map((text) => (
                <Box key={text.id}>
                    <Text mt={"20px"} fontSize={"12"} fontWeight={"bold"}>
                        Text {text.id}
                    </Text>
                    <InputGroup mt={2}>
                        <Input
                            onChange={handleTextChange}
                            onFocus={handleTextFocus}
                            onBlur={handleOnBlur}
                            placeholder={"Enter text"}
                            id={text.id}
                            value={text.text}
                            fontSize={"12"}
                            height={"40px"}
                            type={"text"}
                        />
                        <InputRightElement h="full" cursor={"pointer"}>
                            <Icon
                                mr={3}
                                boxSize={"4"}
                                color={"#34A8534D"}
                                as={APP_ICONS.TEXT}
                            />
                        </InputRightElement>
                    </InputGroup>
                </Box>
            ))}
        </Box>
    );
};

export default TextTab;
