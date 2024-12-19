import {
    useMutation
} from "@tanstack/react-query";
import { Post, Delete, Get } from "../api";
import API_CONSTANTS from "../constants/api";
import { useSelector } from "react-redux";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.AUTH.login,
                body,
                toastError: true
            })
            return data
        },
    })
}

export const useGoogleLoginApi = () => {
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.AUTH.googleLogin,
                body,
                toastError: true
            })
            return data
        },
    })
}

export const useLogOut = () => {
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async () => {
            const data = await Delete({
                path: API_CONSTANTS.AUTH.logout,
                token,
                toastError: true,
                toastMessage: true,
            })
            return data
        },
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (body) => {
            const data = await Get({
                path: `${API_CONSTANTS.AUTH.base}/${body.email}${API_CONSTANTS.AUTH.forgotPassword}`,
                toastError: true,
                toastMessage: true
            })
            return data
        },
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.AUTH.resetPassword,
                body,
                toastError: true,
                toastMessage: true
            })
            return data
        },
    })
}

