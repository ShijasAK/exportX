import axios from "axios";
import { BASE_URL } from "../constants/api";
import { CONTENT_TYPE } from "../constants/enums";
import { createStandaloneToast } from '@chakra-ui/toast'
import { errorHandler } from "../utils/errorUtil";
import { isUnauthorized } from "../utils/apiUtil";
const { toast } = createStandaloneToast()

async function Get({
  path,
  token,
  toastMessage,
  toastError,
  contentType = CONTENT_TYPE.JSON,
}) {
  try {
    let url = BASE_URL + path

    const headers = { "Content-Type": contentType };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.get(url, { headers, maxBodyLength:Infinity });

    if (toastMessage) {
      let message = response.data.message || "Success!";
      toast({
        title: "Congrats!",
        description: message,
        status: "success",
        id: message,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
    }
    return response.data;
  } catch (error) {
    console.log("here")
    if (isUnauthorized(error)) {
      localStorage.clear();
      window.location.reload();
      return;
    }
    
    if (toastError) {
      console.log(error)
      let message = error.response?.data?.message || "Unknown Error!";
      message = message.length > 130 ? "Unknown Error!" : message;
      toast({
        title: "Error!",
        description: message,
        status: "error",
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
    }
    console.warn("Error in Get.js: ", error)
    throw new Error(JSON.stringify(error?.response?.data))
  }
}

export { Get };
