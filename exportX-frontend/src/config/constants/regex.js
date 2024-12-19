export const PHONE_REGEX = /^[0-9]{10,12}$/
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export const YEAR_REGEX = /^(19|20)\d{2}$/
export const NUMERIC_REGEX = /^[0-9]*$/
export const PERCENTAGE_REGEX = /^100$|^([0-9]|[1-9][0-9])$/
export const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/
export const URL_REGEX = /^(http|https):\/\/[^ "]+$/
export const INPUT_REGEX = /^[a-zA-Z]+$/