import React, { useMemo, useState } from "react";
import {
  Input,
  List,
  ListItem,
  Box,
  useOutsideClick,
  VStack,
  InputGroup,
  Text,
  useColorMode,
  Divider,
  InputRightElement,
  Icon,
  Flex,
  chakra,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import APP_ICONS from "../../config/constants/icons";
import { colorKeys, getColor } from "../../config/constants/colors";
import { Controller, useForm } from "react-hook-form";
import { accessValue } from "../../config/utils/stringUtil";

const FormComboBox = ({
  onInputChange,
  options,
  onChange,
  listProps,
  placeholder,
  value,
  query,
  label,
  required = false,
  control,
  id = "dropdown",
  rules = {},
  messageContainerProps = {},
  errors = {},
  customError,
}) => {
  const { colorMode } = useColorMode();
  const [isListOpen, setIsListOpen] = useState(false);
  const ref = React.useRef();

  const { control: customControl } = useForm();

  useOutsideClick({
    ref: ref,
    handler: () => setIsListOpen(false),
  });

  if (required) {
    required = `${label} is required`;
  }

  return (
    <Controller
      control={control ?? customControl}
      name={id}
      rules={{
        required: required,
        ...rules,
      }}
      render={({
        field: { ...rest },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <FormControl
          isInvalid={errors[id] || accessValue(errors, `${id}.message`)}
          w="full"
        >
          <Box ref={ref}>
            {label && (
              <Box mb={2} fontSize={"15px"}>
                <Flex justify="space-between">
                  <Flex color={"#707070"}>
                    {label}
                    {required && (
                      <chakra.span
                        color={getColor(colorKeys.danger, colorMode)}
                      >
                        *
                      </chakra.span>
                    )}
                  </Flex>
                </Flex>
              </Box>
            )}
            <InputGroup>
              <Input
                onChange={(e) => {
                  onInputChange(e.target.value);
                  onChange(null);
                  setIsListOpen(true);
                }}
                onFocus={() => setIsListOpen(true)}
                w="full"
                minW="320px"
                placeholder={placeholder}
                _focus={{ shadow: "none" }}
                value={query ? query : value?.label}
              />
              <InputRightElement children={<Icon as={APP_ICONS.SEARCH} />} />
            </InputGroup>
            {isListOpen && (
              <List
                maxW={"100%"}
                pos="absolute"
                bg={getColor(colorKeys.tableBackground, colorMode)}
                as={VStack}
                zIndex={1}
                w="100%"
                align="stretch"
                maxH="220px"
                overflowY="auto"
                shadow="md"
                pb={2}
                {...listProps}
              >
                {options?.length === 0 && (
                  <Text
                    textAlign="center"
                    fontSize="14px"
                    color={getColor(colorKeys.text, colorMode)}
                  >
                    No Data Found
                  </Text>
                )}
                {options?.map((item, index) => {
                  return (
                    <>
                      <Divider />
                      <ListItem
                        key={index}
                        cursor="pointer"
                        onClick={() => {
                          setIsListOpen(false);
                          onChange(item);
                          onInputChange("");
                        }}
                        display={"flex"}
                      >
                        <Box px={1}>
                          <Text fontWeight={"600"} ml={2} fontSize="14px">
                            {item?.label}
                          </Text>
                          <Text ml={2} fontSize="13px">
                            {item?.subLabel}
                          </Text>
                        </Box>
                      </ListItem>
                    </>
                  );
                })}
              </List>
            )}
          </Box>

          <FormErrorMessage {...messageContainerProps}>
            {customError || accessValue(errors, `${id}.message`)}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormComboBox;
