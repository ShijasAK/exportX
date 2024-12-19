export const makeSelectList = (array, value = "id", label = "name", parseEnum=true) => {
    if (!array) return []
    if (!Array.isArray(array))
        return Object.keys(array).map((key) => {
            if (parseEnum) {
                return {
                    value: key,
                    label: array[key],
                }
            }
            else {
                return {
                    value: key,
                    label: array[key],
                }
            }
        })

    return array?.map((item) => {
        return {
            value: item[value],
            label: item[label],
        }
    })
}