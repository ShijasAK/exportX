import { NUMERIC_REGEX } from "../constants/regex"

export const getStringRules = (inject) => {
    const rules = {
        validate:(value) => {
            value = value.trim()
            if(value.length > 255) return 'This field should not exceed 255 characters'
            if(value.length < 1) return 'This field is required'
        },
        ...inject,
    }
    return rules
}

export const getNumericRules = (inject) => {
    const rules = {
        min: {
            value: 1,
            message: 'This field is required'
        },
        max: {
            value: 255,
            message: 'This field should not exceed 255 characters'
        },
        pattern: {
            value: NUMERIC_REGEX,
            message: 'This field should only contain numbers'
        },
        ...inject,
    }
    return rules
}