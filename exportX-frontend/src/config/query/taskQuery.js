import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Patch, Post, Put } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";

export const useTasks = ({ id, params }) => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [
      API_CONSTANTS.TASKS.base.replace(":projectId", id),
      params,
    ],
    queryFn: async () => {
      const data = await Get({
        path: `${API_CONSTANTS.TASKS.base.replace(
          ":projectId",
          id
        )}?${appendQueryParams(params)}`,
        token,
      });
      return data;
    },
  });
};

export const useCreateTask = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async (body) => {
      const res = await Post({
        path: API_CONSTANTS.TASKS.base.replace(":projectId", ""),
        token,
        body,
        toastError: true,
        toastMessage: true
      });
      return res;
    },
  });
}

export const useUpdateTaskStatus = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, taskId, status }) => {
      const res = await Put({
        path: API_CONSTANTS.TASKS.statusUpdate.replace(":projectId", projectId).replace(":taskId", taskId),
        token,
        body: { status },
        toastError: true,
        toastMessage: true
      });
      return res;
    },
  });
}

export const useUpdateTask = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, taskId, body }) => {
      const res = await Patch({
        path: API_CONSTANTS.TASKS.updateTask.replace(":projectId", projectId).replace(":taskId", taskId),
        token,
        body,
        toastError: true,
        toastMessage: true
      });
      return res;
    },
  });
}

export const useDeleteTask = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, taskId }) => {
      const res = await Delete({
        path: API_CONSTANTS.TASKS.updateTask.replace(":projectId", projectId).replace(":taskId", taskId),
        token,
        toastError: true,
        toastMessage: true
      });
      return res;
    },
  });
}

export const useTaskBulkActions = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, body }) => {
      const res = await Put({
        path: API_CONSTANTS.TASKS.bulkActions.replace(":projectId", projectId),
        token,
        body,
        toastError: true,
        toastMessage: true
      });
      return res;
    },
  });
}

export const useSendForApproval = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, taskId }) => {
      const res = await Get({
        path: API_CONSTANTS.TASKS.sendApproval.replace(":projectId", projectId).replace(":taskId", taskId),
        token,
        toastError: true,
        toastMessage: true
      });
      return res;
    },
  });
}