import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Patch, Post } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";

export const useAdGoals = (params) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.AD_GOALS.base, params],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.AD_GOALS.base}?${appendQueryParams(params)}`,
                token,
            })
            return data
        },
    })
}

export const useCreateAdGoal = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.AD_GOALS.base,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.AD_GOALS.base]),
    })
}

export const useUpdateAdGoal = (id) => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Patch({
                path: `${API_CONSTANTS.AD_GOALS.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.AD_GOALS.base]),
    })
}

export const useUpdateAdGoalStatus = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, status }) => {
            const data = await Patch({
                path: `${API_CONSTANTS.AD_GOALS.base}/${id}/status`,
                body: {
                    isActive: status
                },
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.AD_GOALS.base]),
    })
}

export const useDeleteAdGoal = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: `${API_CONSTANTS.AD_GOALS.base}/${id}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.AD_GOALS.base]),
    })
}