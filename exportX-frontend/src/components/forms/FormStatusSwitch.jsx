import React, { useRef } from 'react'
import { FormControl, FormErrorMessage, FormLabel, useColorMode, chakra } from '@chakra-ui/react'
import { useController } from 'react-hook-form';
import { getColor, colorKeys } from "../../config/constants/colors";
import { accessValue } from "../../config/utils/stringUtil";
import StatusSwitch from '../controls/StatusSwitch';

const FormStatusSwitch = ({ id, onChange, value , rules = {}, control, label, errors = {}, containerProps, required }) => {
    const { colorMode } = useColorMode()
    const ref = useRef(null);

    const { field } = useController({
        name: id,
        rules: {
            required: required ? `${label} is required` : false,
            ...rules
        },
        control: control,
    })

    return (
        <FormControl isInvalid={accessValue(errors, `${id}.message`)} {...containerProps}>
            <FormLabel htmlFor={id}>
                {label}
                {required && <chakra.span color={getColor(colorKeys.danger, colorMode)}>*</chakra.span>}
            </FormLabel>
            <StatusSwitch onChange={onChange} value={value}/>
            <FormErrorMessage>
                {accessValue(errors, `${id}.message`)}
            </FormErrorMessage>
        </FormControl >
    )
}

export default FormStatusSwitch;