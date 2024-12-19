import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import API_CONSTANTS from "../constants/api";
import { Delete, Get, Post, Put } from "../api";
import { appendQueryParams } from "../utils/queryUtil";
import { CONTENT_TYPE } from "../constants/enums";

export const useClients = (params) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.CLIENTS.base, params],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.CLIENTS.base}?${appendQueryParams(params)}`,
                token,
            })
            return data
        },
    })
}

export const useClient = (id) => {
    const token = useSelector((state) => state.user?.token)
    return useQuery({
        queryKey: [API_CONSTANTS.CLIENTS.base, id],
        queryFn: async () => {
            const data = await Get({
                path: `${API_CONSTANTS.CLIENTS.base}/${id}`,
                token,
            })
            return data
        },
        enabled: !!id,
    })
}

export const useCreateClient = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.CLIENTS.base,
                body,
                token,
                contentType: CONTENT_TYPE.FORM_DATA,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useUpdateClient = (id) => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Put({
                path: `${API_CONSTANTS.CLIENTS.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true,
                contentType:CONTENT_TYPE.FORM_DATA,
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useDeleteClient = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: `${API_CONSTANTS.CLIENTS.base}/${id}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useCreateClientBrief = () => {
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Post({
                path: API_CONSTANTS.CLIENTS.clientBrief.replace(":clientId", id),
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        }
    })
}

export const useUpdateClientBrief = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Put({
                path: API_CONSTANTS.CLIENTS.clientBrief.replace(":clientId", id),
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useDeleteClientBrief = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: API_CONSTANTS.CLIENTS.clientBrief.replace(":clientId", id),
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useUpdateClientSocial = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Put({
                path: API_CONSTANTS.CLIENTS.socialMedia.replace(":clientId", id),
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useDeleteClientSocial = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Put({
                path: API_CONSTANTS.CLIENTS.socialMedia.replace(":clientId", id),
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useCreateClientBrandKit = () => {
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Post({
                path: API_CONSTANTS.CLIENTS.brandKit.replace(":clientId", id),
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        }
    })
}

export const useUpdateClientBrandKit = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Put({
                path: API_CONSTANTS.CLIENTS.brandKit.replace(":clientId", id),
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useDeleteClientBrandKit = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: API_CONSTANTS.CLIENTS.brandKit.replace(":clientId", id),
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useUpdateClientTemplate = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Put({
                path: API_CONSTANTS.CLIENTS.template.replace(":clientId", id),
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useDeleteAllClientTemplates = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: API_CONSTANTS.CLIENTS.template.replace(":clientId", id),
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useDeleteTemplate = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ clientId, templateId }) => {
            const data = await Delete({
                path: `${API_CONSTANTS.CLIENTS.template.replace(":clientId", clientId)}/${templateId}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.template]),
    })
}

export const useUpdateSystemAccess = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Put({
                path: `${API_CONSTANTS.CLIENTS.base}/${id}${API_CONSTANTS.CLIENTS.systemAccess}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}

export const useCreateClientUsers = () => {
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Post({
                path: `${API_CONSTANTS.CLIENT_USER.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        }
    })
}

export const useDeleteClientUser = () => {
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (id) => {
            const data = await Delete({
                path: `${API_CONSTANTS.CLIENT_USER.base}/${id}`,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        }
    })
}

export const useUpdateClientUserPermissions = () => {
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const data = await Put({
                path: `${API_CONSTANTS.CLIENT_USER.base}/${id}`,
                body,
                token,
                toastMessage: true,
                toastError: true
            })
            return data
        }
    })
}

export const useInviteClientUser = () => {
    const queryClient = useQueryClient()
    const token = useSelector((state) => state.user?.token)
    return useMutation({
        mutationFn: async (body) => {
            const data = await Post({
                path: API_CONSTANTS.CLIENTS.inviteUser,
                body,
                token,
                contentType: CONTENT_TYPE.JSON,
                toastMessage: true,
                toastError: true
            })
            return data
        },
        onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CLIENTS.base]),
    })
}