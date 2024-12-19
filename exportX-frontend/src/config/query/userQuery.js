import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Get, Patch, Post, Put } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";
import { CONTENT_TYPE } from "../constants/enums";

export const useUsers = (params) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.USERS.base, params],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.USERS.base}?${appendQueryParams(params, false)}`,
                token,
            })
            return data
        },
    })
}

export const useUser = (id) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.USERS.base, id],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.USERS.base}/${id}`,
                token,
            })
            return data
        },
        enabled: !!id,
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.USERS.base,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.USERS.base]),
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Patch({
                path: `${API_CONSTANTS.USERS.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true,
                contentType: CONTENT_TYPE.FORM_DATA
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.USERS.base]),
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: `${API_CONSTANTS.USERS.base}/${id}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.USERS.base]),
    })
}

export const useUpdateSystemAccess = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Put({
                path: `${API_CONSTANTS.USERS.base}/${id}${API_CONSTANTS.USERS.systemAccess}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.USERS.base]),
    })
}