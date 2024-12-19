import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { colorKeys, getColor } from "../../../config/constants/colors";
import DropdownSelect from "../../controls/Dropdowns/DropdownSelect";
import APP_ICONS from "../../../config/constants/icons";

const ContentCard = ({
  tool,
  onClick,
  isSelected,
  onEdit,
  onRegenerate,
  isEditable,
  editable,
  onChange,
  onSave,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Card
      cursor={"pointer"}
      _hover={{ bg: getColor(colorKeys.lighterBlue, colorMode) }}
      borderRadius={"10px"}
      border={isSelected && "1px solid #90A2F8"}
      bg={"#FFF"}
      boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.10)"}
      onClick={!isEditable ? onClick : undefined}
    >
      <CardBody>
        <Flex justifyContent={"space-between"}>
          <Box w="full">
            <Flex justify={"space-between"}>
              {isEditable ? (
                <Input
                  w="full"
                  onChange={(e) => onChange(e.target.value, "title")}
                  fontSize={"13px"}
                  value={editable?.title}
                />
              ) : (
                <Heading fontSize={"20px"} fontWeight={"normal"}>
                  {tool?.title}
                </Heading>
              )}
              {isEditable ? (
                <Button onClick={onSave} ml={1}>Save</Button>
              ) : (
                <HStack align={"start"}>
                  <Flex
                    rounded="full"
                    justify={"center"}
                    align="center"
                    h="40px"
                  >
                    {isSelected && (
                      <Flex
                        border="1px solid"
                        rounded="full"
                        justify={"center"}
                        align="center"
                        p="2px"
                      >
                        <Icon
                          bg="#FF5017"
                          color="#fff"
                          rounded="full"
                          boxSize="5"
                          p="1"
                          as={APP_ICONS.CHECK}
                        />
                      </Flex>
                    )}
                  </Flex>
                  <DropdownSelect
                    options={[
                      {
                        value: "Edit",
                        label: "Edit",
                        onClick: onEdit,
                      },
                      {
                        value: "Regenerate",
                        label: "Regenerate",
                        onClick: onRegenerate,
                      },
                    ]}
                    buttonProps={{
                      as: IconButton,
                      w: "40px",
                      h: "40px",
                      variant: "unstayled",
                      border: "none",
                      // ml:"100px",
                      icon: (
                        <Icon
                          ml={8}
                          boxSize={5}
                          color={getColor(colorKeys.gray, colorMode)}
                          as={APP_ICONS.MORE_OPTIONS}
                        />
                      ),
                    }}
                    hideIcon={true}
                  />
                </HStack>
              )}
            </Flex>

            {isEditable ? (
              <Textarea
                w="full"
                onChange={(e) => onChange(e.target.value, "content")}
                mt={2}
                fontSize={"13px"}
                value={editable?.content}
              />
            ) : (
              <Text mt={2} fontSize={"13px"}>
                {tool?.content}
              </Text>
            )}
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ContentCard;
