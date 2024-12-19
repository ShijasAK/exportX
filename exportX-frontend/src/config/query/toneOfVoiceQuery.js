import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Patch, Post, Put } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";

export const useToneOfVoice = (params) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.TONE_OF_VOICE.base,params],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.TONE_OF_VOICE.base}?${appendQueryParams(params)}`,
                token,
            })
            return data
        },
    })
  }
  
  export const useCreateToneOfVoice = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.TONE_OF_VOICE.base,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TONE_OF_VOICE.base]),
    })
}

export const useUpdateToneOfVoice = (id) => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Patch({
                path: `${API_CONSTANTS.TONE_OF_VOICE.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TONE_OF_VOICE.base]),
    })
}

export const useDeleteToneOfVoice = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: `${API_CONSTANTS.TONE_OF_VOICE.base}/${id}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.TONE_OF_VOICE.base]),
    })
}