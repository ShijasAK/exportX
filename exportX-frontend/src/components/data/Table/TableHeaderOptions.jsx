import React from "react";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import PrimaryButton from "../../controls/Buttons/PrimaryButton";
import { colorKeys, getColor } from "../../../config/constants/colors";
import APP_ICONS from "../../../config/constants/icons";

const TableHeaderOptions = ({
  title,
  actionText,
  action,
  icon,
  actionProps,
  containerProps,
  titleProps,
  subtitle,
  onQueryChange,
  placeholder = "Search...",
  actionButtonProps,
  stackProps,
  iconProps,
  textProps,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      w="full"
      justify="space-between"
      align={"center"}
      {...containerProps}
      flexWrap={"wrap"}
    >
      <Box>
        {title && (
          <Heading
            fontFamily={"Helvetica"}
            color={getColor(colorKeys.dark, colorMode)}
            as="h2"
            fontSize={22}
            fontWeight="bold"
            {...titleProps}
            mb={1}
          >
            {title}
          </Heading>
        )}
        <Text fontSize="12px" color={getColor(colorKeys.gray, colorMode)}>
          {subtitle}
        </Text>
      </Box>
      <HStack spacing={5} {...stackProps}>
        {onQueryChange && (
          <InputGroup>
            <Input
              w="285px"
              fontSize="12px"
              rounded={"full"}
              maxW={"full"}
              placeholder={placeholder}
              type="search"
              onChange={(e) =>
                onQueryChange({
                  search: e.target.value,
                  page: 1,
                  pageLimit: 10,
                })
              }
            />
            <InputRightElement
              children={
                <Icon
                  color={getColor(colorKeys.primary, colorMode)}
                  boxSize="5"
                  as={APP_ICONS.SEARCH}
                />
              }
            />
          </InputGroup>
        )}
        {actionText && action && (
          <PrimaryButton
            onClick={action}
            buttonProps={{
              minW: "105px",
              w: "fit-content",
              ...actionButtonProps,
            }}
            textProps={{
              color: getColor(colorKeys.primary, colorMode),
              fontWeight: "normal",
              fontFamily: "Source Sans Pro",
              fontSize: "12px",
              ...textProps,
            }}
            leftExtention={
              icon && (
                <Flex
                  mr={2}
                  justify={"center"}
                  align="center"
                  rounded="full"
                  h="30px"
                  w="30px"
                  bg={getColor(colorKeys.lightBackgroundFill, colorMode)}
                  color={getColor(colorKeys.primary, colorMode)}
                  {...iconProps}
                >
                  <Icon boxSize={5} fontSize={"10px"} as={icon} />
                </Flex>
              )
            }
            {...actionProps}
          >
            {actionText}
          </PrimaryButton>
        )}
      </HStack>
    </Flex>
  );
};

export default TableHeaderOptions;
