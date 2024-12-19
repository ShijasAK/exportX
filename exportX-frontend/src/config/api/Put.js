import axios from "axios";
import { BASE_URL } from "../constants/api";
import { CONTENT_TYPE } from "../constants/enums";
import { createStandaloneToast } from '@chakra-ui/toast'
import { errorHandler } from "../utils/errorUtil";
import { isUnauthorized } from "../utils/apiUtil";
const { toast } = createStandaloneToast()

async function Put({ path, token, body, toastError, toastMessage, contentType = CONTENT_TYPE.JSON }) {
  let url = BASE_URL + path;
  try {

    const headers = { "Content-Type": contentType }
    if (token) headers.Authorization = `Bearer ${token}`

    const response = await axios.put(url, body, { headers });

    if (toastMessage) {
      let message = response.data.message || "Success!"
      toast({
        title: 'Congrats!',
        description: message,
        status: 'success',
        isClosable: true,
        id: message,
        position: "top",
        variant: "subtle"
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
        title: 'Error!',
        description: message,
        status: 'error',
        isClosable: true,
        id: message,
        position: "top",
        variant: "subtle"
      })
    }
    console.warn("Error in Put.js: ", error)
    throw new Error(JSON.stringify(error?.response?.data))
  }
}

export { Put };