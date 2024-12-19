import { BASE_URL } from "../constants/api"

export const getImage = (imagePath) => {
    return BASE_URL + imagePath
}