import React from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useController } from "react-hook-form";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  InputGroup,
  InputRightElement,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import { colorKeys, getColor } from "../../config/constants/colors";
import { accessValue } from "../../config/utils/stringUtil";
import APP_ICONS from "../../config/constants/icons";

const FormDateInput = ({
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
        <FormLabel htmlFor={id} fontSize={"13px"} {...labelProps}>
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
      <InputGroup className="date-picker-gc" size={size} {...groupProps}>
        <SingleDatepicker
          name={id}
          date={field.value ? new Date(field.value) : undefined}
          onDateChange={field.onChange}
          minDate={minDate}
          maxDate={maxDate}
          usePortal={true}
          disabled={isDisabled}
          propsConfigs={{
            inputProps: {
              placeholder,
              _placeholder: { fontSize: "14px", color: "#808080" },
              ...inputProps,
            },
            dayOfMonthBtnProps: {
              selectedBtnProps: {
                bg: getColor(colorKeys.primary, colorMode),
                color: "#fff",
              },
              todayBtnProps: {
                bg: getColor(colorKeys.secondary, colorMode),
                color: "#fff",
              },
              defaultBtnProps: {
                _hover: {
                  bg: getColor(colorKeys.primary, colorMode),
                  color: getColor(colorKeys.white, colorMode),
                },
                fontWeight: "normal",
              },
            },
            popoverCompProps: {
              popoverContentProps: { zIndex: 999999999999 },
              popoverBodyProps: { zIndex: 999999999999 },
            },
            calendarPanelProps: {
              zIndex: 999999999999,
            },
            weekdayLabelProps: {
              fontWeight: "normal",
            },
            dateNavBtnProps: {
              fontWeight: "normal",
            },
          }}
        />
        <InputRightElement zIndex={!field.value ?-1:1}  h="full">
          {field.value ? (
            <IconButton
              isDisabled={isDisabled || inputProps?.isDisabled}
              onClick={() => field.onChange(undefined)}
              variant={"ghost"}
              rounded={"none"}
              size={size}
              icon={<Icon as={APP_ICONS.CLOSE} />}
            />
          ) : (
            <Icon
              color="#C3E5CC"
              as={APP_ICONS.CALENDAR}
              boxSize={5}
              {...iconProps}
            />
          )}
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage {...messageContainerProps}>
        {errors[id]?.message}
      </FormErrorMessage>
      <FormHelperText {...messageContainerProps}>
        {feedbackMessage}
      </FormHelperText>
    </FormControl>
  );
};

export default FormDateInput;
