import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Textarea,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { getColor, colorKeys } from "../../config/constants/colors";

const FormTextarea = ({
  id,
  label,
  control,
  placeholder,
  errors,
  required,
  rules,
  containerProps,
  textAreaProps,
  hideLabel,
  rightElement,
  isNested = false,
}) => {
  const { colorMode } = useColorMode();
  if (required) {
    required = `${label} is required`;
  }

  const getErrorMessage = (err) => {
    if (isNested) {
      return err?.message || required;
    }

    return errors[id] && errors[id].message;
  };
  return (
    <Controller
      control={control}
      name={id}
      rules={{
        required: required,
        ...rules,
      }}
      render={({
        field: { onChange, onBlur, value, ref, ...rest },
        fieldState: { error, invalid },
      }) => (
        <FormControl
          isInvalid={errors[id] ?? invalid}
          p="1px"
          {...containerProps}
        >
          {!hideLabel && (
            <FormLabel htmlFor={id} mb="2" fontSize="13px">
              {label}
              {required && (
                <chakra.span color={getColor(colorKeys.danger, colorMode)}>
                  *
                </chakra.span>
              )}
            </FormLabel>
          )}
          <InputGroup>
            <Textarea
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              placeholder={placeholder}
              size="sm"
              borderRadius={"md"}
              _placeholder={{
                fontSize: "14px",
                color: "#828282",
              }}
              {...textAreaProps}
              {...rest}
            />
            <InputRightElement
              display={rightElement ? "flex" : "none"}
              h="full"
            >
              {rightElement}
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>{getErrorMessage(error)}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormTextarea;
