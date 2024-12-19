import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Patch, Post } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";
import { MILLISECONDS } from "../constants/defaults";

export const useRoles = (params) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.ROLES.base, params],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.ROLES.base}?orderBy=roleName`,
                token,
            })
            return data
        },
    })
}

export const useRole = (id) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.ROLES.base, id],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.ROLES.base}/${id}`,
                token,
            })
            return data
        },
        enabled: !!id,
    })
}

export const useCreateRole = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.ROLES.base,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.ROLES.base]),
    })
}

export const useUpdateRole = (id) => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Patch({
                path: `${API_CONSTANTS.ROLES.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.ROLES.base]),
    })
}


export const useUpdateRoleStatus = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, status }) => {
            const data = await Patch({
                path: `${API_CONSTANTS.ROLES.base}/${id}/status`,
                body: {
                    isActive: status
                },
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.ROLES.base]),
    })
}

export const useDeleteRole = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: `${API_CONSTANTS.ROLES.base}/${id}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.ROLES.base]),
    })
}