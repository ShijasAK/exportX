import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Patch, Post, Put } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";

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


export const useCreateProjectDiscussion = (id) => {
  const token = useSelector((state) => state.user?.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const data = await Post({
        path: `${API_CONSTANTS.PROJECT_DISCUSSIONS.base.replace(":projectId", id)}`,
        body,
        token,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([API_CONSTANTS.PROJECT_DISCUSSIONS.base.replace(":projectId", id)]);
    },
  });
}

export const useDeleteDiscussionItem = (id) => {
  const token = useSelector((state) => state.user?.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (discussionId) => {
      const data = await Delete({
        path: `${API_CONSTANTS.PROJECT_DISCUSSIONS.delete.replace(":projectId", id).replace(":discussionId", discussionId)}`,
        token,
        toastError: true,
        toastMessage: true
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([API_CONSTANTS.PROJECT_DISCUSSIONS.base.replace(":projectId", id)]);
    },
  });
}