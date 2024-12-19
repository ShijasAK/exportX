import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast()

export const makeToast = (message) => {

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

export const makeErrorToast = (message) => {
    toast({
        title: "Error!",
        description: message,
        status: "error",
        isClosable: true,
        position: "top",
        variant: "subtle",
    });
}