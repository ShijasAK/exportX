import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Patch } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";

export const useProjectClientUsers = (id, params) => {
    const token = useSelector((state) => state.user?.token);
    const path = `${API_CONSTANTS.PROJECT_USERS.clientUsers.replace(":projectId", id)}?${appendQueryParams(params)}`
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            const data = await Get({
                path,
                token,
            });
            return data;
        },
    });
}

export const useCreateProjectClientUser = (id) => {
    const token = useSelector((state) => state.user?.token);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body) => {
            const response = await Patch({
                path: API_CONSTANTS.PROJECT_USERS.clientUsers.replace(":projectId", id),
                token,
                body,
                toastError: true,
                toastMessage: true
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([API_CONSTANTS.PROJECT_USERS.clientUsers.replace(":projectId", id)]);
        },
    });
}

export const useDeleteProjectClientUser = (id) => {
    const token = useSelector((state) => state.user?.token);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            const response = await Delete({
                path: `${API_CONSTANTS.PROJECT_USERS.clientUsers.replace(":projectId", id)}/${userId}`,
                token,
                toastError: true,
                toastMessage: true
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([API_CONSTANTS.PROJECT_USERS.clientUsers.replace(":projectId", id)]);
        },
    });
}

export const useProjectUsers = (id, params) => {
    const token = useSelector((state) => state.user?.token);
    const path = `${API_CONSTANTS.PROJECT_USERS.projectUsers.replace(":projectId", id)}?${appendQueryParams(params)}`
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            const data = await Get({
                path,
                token,
            });
            return data;
        },
    });
}

export const useCreateProjectUser = (id) => {
    const token = useSelector((state) => state.user?.token);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body) => {
            const response = await Patch({
                path: API_CONSTANTS.PROJECT_USERS.updateProjectUsers.replace(":projectId", id),
                token,
                body,
                toastError: true,
                toastMessage: true
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([API_CONSTANTS.PROJECT_USERS.projectUsers.replace(":projectId", id)]);
        },
    });
}

export const useDeleteProjectUser = (id) => {
    const token = useSelector((state) => state.user?.token);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            const response = await Delete({
                path: `${API_CONSTANTS.PROJECT_USERS.updateProjectUsers.replace(":projectId", id)}/${userId}`,
                token,
                toastError: true,
                toastMessage: true
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([API_CONSTANTS.PROJECT_USERS.projectUsers.replace(":projectId", id)]);
        },
    });
}

export const useMakeProjectManager = (id) => {
    const token = useSelector((state) => state.user?.token);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body) => {
            const response = await Patch({
                path: API_CONSTANTS.PROJECT_USERS.makeProjectManager.replace(":projectId", id),
                token,
                body,
                toastError: true,
                toastMessage: true
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([API_CONSTANTS.PROJECT_USERS.projectUsers.replace(":projectId", id)]);
        },
    });
}

export const useProjectAssignees = (projectId) => {
    const token = useSelector((state) => state.user?.token);
    const path = `/projects/${projectId}/user-management/project-assignees`
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            const data = await Get({
                path,
                token,
            });
            return data;
        },
    });
}

export const useAllClientUsers = (params) => {
    const token = useSelector((state) => state.user?.token);
    return useQuery({
        queryKey: [API_CONSTANTS.CLIENT_USER.base,params],
        queryFn: async () => {
            const data = await Get({
                path:`${API_CONSTANTS.CLIENT_USER.base}/${appendQueryParams(params)}`,
                token,
            });
            return data;
        },
    });
}