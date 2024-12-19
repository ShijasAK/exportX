import React from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useController } from "react-hook-form";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../config/constants/colors";
import { accessValue } from "../../config/utils/stringUtil";
import APP_ICONS from "../../config/constants/icons";
import { SketchPicker } from "react-color";
import CustomPopover from "../controls/Popovers/CustomPopover";

const FormColorInput = ({
  id,
  control,
  placeholder,
  label,
  required,
  minDate,
  maxDate,
  size = "sm",
  rules,
  feedbackMessage,
  hideLabel,
  isDisabled,
  inputProps,
  groupProps,
  containerProps,
  labelContainerProps,
  labelProps,
  iconProps,
  messageContainerProps,
}) => {
  const { colorMode } = useColorMode();

  if (required) {
    required = `${label} is required`;
  }

  const {
    field,
    formState: { errors },
  } = useController({
    name: id,
    control,
    rules: {
      required: required,
      ...rules,
    },
  });

  return (
    <FormControl
      isInvalid={errors[id] || accessValue(errors, `${id}.message`)}
      {...containerProps}
    >
      {!hideLabel && (
        <FormLabel
          color="#707070"
          htmlFor={id}
          fontSize={"13px"}
          {...labelProps}
        >
          <Flex {...labelContainerProps}>
            {label}
            {required && (
              <chakra.span color={getColor(colorKeys.danger, colorMode)}>
                *
              </chakra.span>
            )}
          </Flex>
        </FormLabel>
      )}
      <CustomPopover
        headingProps={{ display: "none" }}
        hideCloseButton={true}
        label={
          <Flex w="full" justify={"space-between"} align="center">
            <Text>{field.value || placeholder}</Text>
            {field.value && (
              <Box w="28px" h="28px" rounded="md" bg={field.value}></Box>
            )}
          </Flex>
        }
        contentProps={{
          width: "247px",
          background: "transparent",
          border: "none",
        }}
        placement="top"
        triggerProps={{
          border: "1px solid #e2e8f0",
          bg: "transparent",
          fontWeight: "normal",
          color: "#828282",
          w: "full",
          textAlign: "left",
          _hover: {
            bg: "inherit",
          },
        }}
      >
        <SketchPicker
          onChange={(color) => field.onChange(color.hex)}
          color={field.value}
        />
      </CustomPopover>

      <FormErrorMessage {...messageContainerProps}>
        {accessValue(errors, `${id}.message`)}
      </FormErrorMessage>
      <FormHelperText {...messageContainerProps}>
        {feedbackMessage}
      </FormHelperText>
    </FormControl>
  );
};

export default FormColorInput;
