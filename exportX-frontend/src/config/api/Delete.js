import axios from "axios";
import { BASE_URL } from "../constants/api";
import { CONTENT_TYPE } from "../constants/enums";
import { createStandaloneToast } from '@chakra-ui/toast'
import { errorHandler } from "../utils/errorUtil";
import { isUnauthorized } from "../utils/apiUtil";
const { toast } = createStandaloneToast()

async function Delete({ path, token, toastError, toastMessage, contentType = CONTENT_TYPE.JSON }) {
  let url = BASE_URL + path;
  try {
    const headers = { "Content-Type": contentType }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const response = await axios.delete(url, { headers })

    if (toastMessage) {
      let message = response.data.message || "Success!"
      toast({
        title: 'Congrats!',
        description: message,
        status: 'success',
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
      let message = error?.response?.data?.message?.message || "Unknown error!"
      message = message.length > 130 ? "Unknown Error!" : message
      toast({
        title: 'Error!',
        description: message,
        status: 'error',
        isClosable: true,
        position: "top",
        variant:"subtle"
      })
    }
    console.warn("Error in Delete.js: ", error)
    throw new Error(error)
  }
}

export { Delete };