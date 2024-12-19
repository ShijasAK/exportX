import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Get, Patch, Post, Put } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";

export const useGenerateEmailDraft = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.TOOLS.email,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TOOLS.base]),
    })
}

export const useSaveEmailDraft = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.TOOLS.saveEmail,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TOOLS.base]),
    })
}

export const useGenerateCampaignIdeaDraft = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.TOOLS.campaignIdea,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TOOLS.base]),
    })
}

export const useSaveCampaignIdeaDraft = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.TOOLS.savecampaignIdea,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TOOLS.base]),
    })
}

export const useGenerateCreativeIdeaDraft = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.TOOLS.creativeIdea,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TOOLS.base]),
    })
}

export const useSaveCreativeIdeaDraft = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.TOOLS.saveCreativeIdea,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TOOLS.base]),
    })
}