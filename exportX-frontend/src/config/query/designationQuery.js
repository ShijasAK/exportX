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

export const useAllDesignations = (params) => {
    const token = useSelector((state) => state.user?.token);
    return useQuery({
        queryKey: [API_CONSTANTS.DESIGNATION.base, params],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.DESIGNATION.base}?${appendQueryParams(params)}`,
                token,
            });
            return data;
        },
    });

}

export const useDesignations = () => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.DESIGNATION.active],
        queryFn: async () => {
            const data = await Get({
                path: API_CONSTANTS.DESIGNATION.active,
                token,
            })
            return data
        },
    })
}

export const useAddDesignation = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.DESIGNATION.base,
                body,
                token,
                toastMessage: true,
                toastError: true,
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.DESIGNATION.base]),
    })
}

export const useUpdateDesignation = (id) => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Patch({
                path: `${API_CONSTANTS.DESIGNATION.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.DESIGNATION.base]),
    })
}

export const useUpdateDesignationStatus = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, status }) => {
            const data = await Patch({
                path: `${API_CONSTANTS.DESIGNATION.base}/${id}/status`,
                body: {
                    isActive: status
                },
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.DESIGNATION.base]),
    })
}

export const useDeleteDesignation = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: `${API_CONSTANTS.DESIGNATION.base}/${id}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.DESIGNATION.base]),
    })
}