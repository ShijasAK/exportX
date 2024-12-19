import axios from "axios";
import { BASE_URL } from "../constants/api";
import { CONTENT_TYPE } from "../constants/enums";
import { createStandaloneToast } from '@chakra-ui/toast'
import { errorHandler } from "../utils/errorUtil";
import { isUnauthorized } from "../utils/apiUtil";
const { toast } = createStandaloneToast()

async function Patch({ path, token, body, toastError, toastMessage, contentType = CONTENT_TYPE.JSON }) {
  try {
    let url = BASE_URL + path;
    const headers = { "Content-Type": contentType }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const response = await axios.patch(url, body, { headers });

    if (toastMessage) {
      let message = response.data.message || "Success!"
      toast({
        title: 'Congrats!',
        description: message,
        status: 'success',
        id: message,
        isClosable: true,
        position: "top",
        variant:"subtle"
      })
    }
    return response.data;
  } catch (error) {
    if (isUnauthorized(error)) {
      localStorage.clear();
      window.location.reload();
      return;
    }
    if (toastError) {
      const message = errorHandler(error?.response?.data)
      toast({
        id: message,
        title: 'Error!',
        description: message,
        status: 'error',
        isClosable: true,
        position: "top",
        variant:"subtle"
      })
    }
    console.warn("Error in Patch.js: ", error)
    throw new Error(error)
  }
}

export { Patch };