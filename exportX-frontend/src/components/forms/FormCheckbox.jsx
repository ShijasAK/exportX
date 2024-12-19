import React from "react";
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Text,
  useColorMode,
  chakra,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { getColor, colorKeys } from "../../config/constants/colors";
import { accessValue } from "../../config/utils/stringUtil";

const FormCheckbox = ({
  options,
  defaultChecked,
  label,
  errors = {},
  id,
  required = false,
  control,
  rules,
  stackDir = ["column", "row"],
  labelProps,
  containerProps,
  hideLabel = false,
  stackProps,
  optionLabelProps,
  inputProps,
}) => {
  const { colorMode } = useColorMode();
  if (required) {
    required = `${label} is required`;
  }
  return (
    <Controller
      control={control}
      name={id}
      rules={{
        required: required,
        ...rules,
      }}
      render={({ field: { onChange, onBlur, value, ref, ...rest } }) => (
        <FormControl
          isInvalid={errors[id] || accessValue(errors, `${id}.message`)}
          {...containerProps}
        >
          {!hideLabel && (
            <FormLabel
              htmlFor={id}
              fontSize={"13px"}
              color={getColor(colorKeys.primaryText, colorMode)}
              {...labelProps}
            >
              {label}{" "}
              {required && (
                <chakra.span color={getColor(colorKeys.danger, colorMode)}>
                  *
                </chakra.span>
              )}
            </FormLabel>
          )}
          {options?.length === 1 ? (
            <Checkbox
              _focus={{ boxShadow: "none" }}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              defaultValue={defaultChecked}
              isChecked={value}
              ref={ref}
              {...inputProps}
              {...rest}
            >
              <Text {...optionLabelProps}>
                {options[0].label || options[0]}
              </Text>
            </Checkbox>
          ) : (
            <CheckboxGroup
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              defaultValue={defaultChecked}
              ref={ref}
              {...rest}
            >
              <Flex
                spacing={[1, 5]}
                direction={stackDir}
                as={Stack}
                {...stackProps}
              >
                {options?.map((item, index) => (
                  <Checkbox
                    key={index}
                    value={String(item.value) || String(item)}
                    {...inputProps}
                  >
                    <Text {...optionLabelProps}>{item.label || item}</Text>
                  </Checkbox>
                ))}
              </Flex>
            </CheckboxGroup>
          )}
          <FormErrorMessage>
            {errors[id] && accessValue(errors, `${id}.message`)}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default FormCheckbox;
