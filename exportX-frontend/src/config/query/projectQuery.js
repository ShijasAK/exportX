import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Get, Patch, Post, Put } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";
import { useUserRole } from "../../hooks";

export const useProjectDiscussion = ({ id, params }) => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [
      API_CONSTANTS.PROJECT_DISCUSSIONS.base.replace(":projectId", id),
      params,
    ],
    queryFn: async () => {
      const data = await Get({
        path: `${API_CONSTANTS.PROJECT_DISCUSSIONS.base.replace(
          ":projectId",
          id
        )}?${appendQueryParams(params)}`,
        token,
      });
      return data;
    },
  });
};

export const useProjects = (params) => {
  const token = useSelector((state) => state.user?.token);
  const { isExternal } = useUserRole();

  return useQuery({
    queryKey: [API_CONSTANTS.PROJECTS.base, params],
    queryFn: async () => {
      const data = await Get({
        path: `${
          API_CONSTANTS.PROJECTS[isExternal ? "clientBase" : "base"]
        }?${appendQueryParams(params)}`,
        token,
      });
      return data;
    },
  });
};

export const useProject = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [API_CONSTANTS.PROJECTS.base, id],
    queryFn: async () => {
      const data = await Get({
        path: `${API_CONSTANTS.PROJECTS.base}/${id}`,
        token,
      });
      return data;
    },
  });
};

export const useCreateProject = () => {
  const token = useSelector((state) => state.user?.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const data = await Post({
        path: API_CONSTANTS.PROJECTS.base,
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      queryClient.invalidateQueries([API_CONSTANTS.PROJECTS.base]);
      return data;
    },
  });
};

export const useProjectOverview = (id) => {
  const token = useSelector((state) => state.user?.token);
  const { isExternal } = useUserRole();

  return useMutation({
    mutationFn: async (body) => {
      const data = await Patch({
        path: `${API_CONSTANTS.PROJECTS[
          isExternal ? "projectOverview" : "overview"
        ]?.replace(":projectId", id)}`,
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useClientLookup = (name) => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [API_CONSTANTS.PROJECTS.clientLookup, name],
    queryFn: async () => {
      const data = await Get({
        path: API_CONSTANTS.PROJECTS.clientLookup.replace(":name", name),
        token,
      });
      return data;
    },
  });
};

export const useClientUserLookup = (clientId) => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [API_CONSTANTS.PROJECTS.clientUserLookup, clientId],
    queryFn: async () => {
      const data = await Get({
        path: API_CONSTANTS.PROJECTS.clientUserLookup.replace(
          ":clientId",
          clientId
        ),
        token,
      });
      return data;
    },
    enabled: !!clientId,
  });
};

export const useProjectUserLookup = () => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [API_CONSTANTS.PROJECTS.projectUserLookup],
    queryFn: async () => {
      const data = await Get({
        path: API_CONSTANTS.PROJECTS.projectUserLookup,
        token,
      });
      return data;
    },
  });
};

export const useUpdateProjectStatus = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const data = await Patch({
        path: `${API_CONSTANTS.PROJECTS.updateStatus.replace(
          ":projectId",
          id
        )}`,
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useProjectDocumentTypes = () => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [API_CONSTANTS.DOCUMENT_TYPE.list],
    queryFn: async () => {
      const data = await Get({
        path: API_CONSTANTS.DOCUMENT_TYPE.list,
        token,
      });
      return data;
    },
  });
};

export const useCreateProjectDocumentType = () => {
  const token = useSelector((state) => state.user?.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const data = await Post({
        path: API_CONSTANTS.DOCUMENT_TYPE.create,
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries([API_CONSTANTS.DOCUMENT_TYPE.list]),
  });
};
