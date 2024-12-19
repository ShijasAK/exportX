import React, { useState } from 'react';
import { Select } from 'chakra-react-select';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Text,
  chakra,
  useColorMode,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import APP_ICONS from '../../config/constants/icons';
import { getColor, colorKeys } from '../../config/constants/colors';
import { accessValue } from '../../config/utils/stringUtil';

const FormSelect = ({
  label,
  placeholder,
  options = [],
  errors,
  id,
  control,
  required = false,
  hideLabel,
  rules,
  multiple,
  containerStyles,
  inputProps,
  searchFn,
  isLoading,
  messageContainerProps,
  labelProps,
  chakraContainerStyles,
  labelExtention,
  injectOptions,
  chevronColor,
  menuStyles = {},
}) => {
  const { colorMode } = useColorMode();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      render={({ field: { onChange, onBlur, value, ref, ...rest } }) => {
        return (
          <FormControl
            mb={2}
            isInvalid={
              errors ? errors[id] || accessValue(errors, `${id}.message`) : null
            }
            {...containerStyles}
          >
            {!hideLabel && (
              <FormLabel htmlFor={id} mx={0} fontSize={'13px'} {...labelProps}>
                <Flex justify='space-between'>
                  <Flex>
                    {label}
                    {required && (
                      <chakra.span
                        color={getColor(colorKeys.danger, colorMode)}
                      >
                        *
                      </chakra.span>
                    )}
                  </Flex>
                  {labelExtention}
                </Flex>
              </FormLabel>
            )}
            <Select
              isLoading={isLoading}
              onInputChange={searchFn}
              allowClear={true}
              isMulti={multiple}
              onChange={(e, f) => {
                if (multiple) {
                  onChange({
                    target: {
                      name: id,
                      value: e.map((item) => item.value),
                      label: e.map((item) => item.label),
                    },
                  });
                } else {
                  onChange({
                    target: {
                      name: id,
                      value: e.value,
                    },
                  });
                }
              }}
              onMenuOpen={() => setIsDropdownOpen(true)}
              onMenuClose={() => setIsDropdownOpen(false)}
              value={
                multiple
                  ? options?.filter((option) => value?.includes(option.value))
                  : options?.filter(function (option) {
                      return option.value === value;
                    })
              }
              ref={ref}
              placeholder={placeholder}
              options={injectOptions ? [...injectOptions, ...options] : options}
              defaultInputValue=''
              defaultValue={multiple ? [] : null}
              {...rest}
              {...inputProps}
              className='react-select-container'
              classNames={{
                container: 'react-select-container',
                control: 'react-select-control',
                valueContainer: 'react-select-value-container',
                menu: 'react-select-menu',
                menuList: 'react-select-menu-list',
                option: 'react-select-option',
                singleValue: 'react-select-single-value',
              }}
              // menuIsOpen={true}
              chakraStyles={{
                container: (provided) => ({
                  ...provided,
                  ...chakraContainerStyles,
                }),
                placeholder: (provided) => ({
                  ...provided,
                  fontSize: '14px',
                  color: '#828282',
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 100,
                  ...menuStyles,
                }),
              }}
              components={{
                DropdownIndicator: () => (
                  <Flex mr={3}>
                    {/* {!hideSelectOptionLabel && (
                      <Text fontSize={"12px"} color="#C90016">
                        SELECT OPTION
                      </Text>
                    )} */}
                    <Icon
                      color={chevronColor || '#C90016'}
                      as={
                        isDropdownOpen
                          ? APP_ICONS.UP_CHEVRON
                          : APP_ICONS.DOWN_CHEVRON
                      }
                      ml={2}
                    />
                  </Flex>
                ),
                IndicatorSeparator: () => null,
              }}
            />
            <FormErrorMessage {...messageContainerProps}>
              {accessValue(errors, `${id}.message`)}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
};

export default FormSelect;
