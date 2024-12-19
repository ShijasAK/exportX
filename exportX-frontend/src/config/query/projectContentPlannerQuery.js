import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Patch, Post } from "../api";
import API_CONSTANTS from "../constants/api";
import { appendQueryParams } from "../utils/queryUtil";
import { CONTENT_TYPE } from "../constants/enums";
import { useUserRole } from "../../hooks";

export const useContentPlannerSettings = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [API_CONSTANTS.CONTENT_PLANNER.getSettings, id],
    queryFn: async () => {
      const data = await Get({
        path: API_CONSTANTS.CONTENT_PLANNER.getSettings.replace(
          ":projectId",
          id
        ),
        token,
      });
      return data;
    },
    enabled: !!id,
  });
};

export const useUpdateContentPlannerSettings = (id) => {
  // const queryClient = useQueryClient()
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async (body) => {
      const data = await Post({
        path: API_CONSTANTS.CONTENT_PLANNER.getSettings.replace(
          ":projectId",
          id
        ),
        body,
        token,
        toastMessage: true,
        toastError: true,
      });
      return data;
    },
    // onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CONTENT_PLANNER.getSettings.replace(":projectId", id)]),
  });
};

export const useFeedAiSettings = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useQuery({
    queryKey: [API_CONSTANTS.CONTENT_PLANNER.getSettings, id],
    queryFn: async () => {
      const data = await Get({
        path: API_CONSTANTS.CONTENT_PLANNER.feedAiSettings.replace(
          ":projectId",
          id
        ),
        token,
      });
      return data;
    },
    enabled: !!id,
  });
};

export const useUpdateFeedAiSettings = (id) => {
  // const queryClient = useQueryClient()
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async (body) => {
      const data = await Post({
        path: API_CONSTANTS.CONTENT_PLANNER.feedAiSettings.replace(
          ":projectId",
          id
        ),
        body,
        token,
        toastMessage: true,
        toastError: true,
      });
      return data;
    },
    // onSuccess: () => queryClient.invalidateQueries([API_CONSTANTS.CONTENT_PLANNER.feedAiSettings.replace(":projectId", id)]),
  });
};

export const useGenerateContentIdeas = () => {
  //POST
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ id }) => {
      const data = await Get({
        path: API_CONSTANTS.CONTENT_PLANNER.generateIdeas.replace(
          ":projectId",
          id
        ),
        token,
      });
      return data;
    },
  });
};

export const useGenerateContent = () => {
  //GET WITH QUERY PARAMS
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ id, params }) => {
      const data = await Get({
        path: `${API_CONSTANTS.CONTENT_PLANNER.generate.replace(
          ":projectId",
          id
        )}?${appendQueryParams(params)}`,
        token,
      });
      return data;
    },
  });
};

export const useGenerateMore = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationKey: [API_CONSTANTS.CONTENT_PLANNER.generateMore, id],
    mutationFn: async ({ body, params }) => {
      const data = await Patch({
        path: `${API_CONSTANTS.CONTENT_PLANNER.generateMore.replace(
          ":projectId",
          id
        )}?${appendQueryParams(params)}`,
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
    enabled: !!id,
  });
};

export const useSaveContentIdea = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async (body) => {
      const data = await Post({
        path: API_CONSTANTS.CONTENT_PLANNER.saveIdea.replace(":projectId", id),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
    enabled: !!id,
  });
};

export const useRegenerate = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationKey: [API_CONSTANTS.CONTENT_PLANNER.regenerate, id],
    mutationFn: async ({ body, params }) => {
      const data = await Patch({
        path: `${API_CONSTANTS.CONTENT_PLANNER.regenerate.replace(
          ":projectId",
          id
        )}?${appendQueryParams(params)}`,
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
    enabled: !!id,
  });
};

export const useGetFinalData = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationKey: [API_CONSTANTS.CONTENT_PLANNER.getFinalData, id],
    mutationFn: async () => {
      const data = await Get({
        path: API_CONSTANTS.CONTENT_PLANNER.getFinalData.replace(
          ":projectId",
          id
        ),
        token,
      });
      return data;
    },
  });
};

export const useGenerateCreatives = (projectId, language) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationKey: [API_CONSTANTS.CONTENT_PLANNER.generateCreatives, projectId],
    mutationFn: async (creativeId) => {
      const data = await Get({
        path: `${API_CONSTANTS.CONTENT_PLANNER.generateCreatives
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)}?${appendQueryParams({
          language,
        })}`,
        token,
      });
      return data;
    },
  });
};
export const useViewPlanner = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, planId, itemId }) => {
      const data = await Get({
        path: API_CONSTANTS.CONTENT_PLANNER.getCreativeForEdit
          .replace(":projectId", projectId)
          .replace(":planId", planId)
          .replace(":itemId", itemId),
        token,
      });
      return data;
    },
  });
};

export const useGenerateImage = (projectId) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationKey: [API_CONSTANTS.CONTENT_PLANNER.generateImage, projectId],
    mutationFn: async ({ creativeId, imageId, body }) => {
      const data = await Post({
        path: API_CONSTANTS.CONTENT_PLANNER.generateImage
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useSaveCreative = (projectId) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationKey: [API_CONSTANTS.CONTENT_PLANNER.saveCreative, projectId],
    mutationFn: async ({ creativeId, body }) => {
      const data = await Post({
        path: API_CONSTANTS.CONTENT_PLANNER.saveCreative
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useFilterData = ({ projectId, params }) => {
  const token = useSelector((state) => state.user?.token);
  const { isInternal } = useUserRole();
  const queryKey =
    API_CONSTANTS.CONTENT_PLANNER[
      isInternal ? "getFilterData" : "clientGetFilterData"
    ];
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const data = await Get({
        path: `${queryKey.replace(":projectId", projectId)}?${appendQueryParams(
          params
        )}`,
        token,
        toastError: true,
      });
      return data;
    },
  });
};

export const useUpdateItemStatus = () => {
  const token = useSelector((state) => state.user?.token);
  const { isInternal } = useUserRole();
  return useMutation({
    mutationFn: async ({ projectId, creativeId, imageId, body }) => {
      const data = await Patch({
        path: API_CONSTANTS.CONTENT_PLANNER[
          isInternal ? "updateStatus" : "clientUpdateStatus"
        ]
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useBulkActions = () => {
  const token = useSelector((state) => state.user?.token);
  const { isInternal } = useUserRole();
  return useMutation({
    mutationFn: async ({ projectId, body, action }) => {
      const data = await Patch({
        path: API_CONSTANTS.CONTENT_PLANNER[
          isInternal ? "bulkActions" : "clientBulkActions"
        ]
          .replace(":projectId", projectId)
          .replace(":action", action),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useSchedule = () => {
  const token = useSelector((state) => state.user?.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ projectId, creativeId, imageId, body }) => {
      const data = await Post({
        path: API_CONSTANTS.CONTENT_PLANNER.schedule
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries([
        API_CONSTANTS.CONTENT_PLANNER.getFilterData,
      ]),
  });
};

export const useEditCreative = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ creativeId, body, imageId }) => {
      const data = await Patch({
        path: API_CONSTANTS.CONTENT_PLANNER.editCreative
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useCreative = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ creativeId, imageId }) => {
      const data = await Get({
        path: API_CONSTANTS.CONTENT_PLANNER.getCreative
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId),
        token,
        toastError: true,
      });
      return data;
    },
  });
};

export const useDeleteCreative = () => {
  const token = useSelector((state) => state.user?.token);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ projectId, creativeId, imageId }) => {
      const data = await Delete({
        path: API_CONSTANTS.CONTENT_PLANNER.deleteCreative
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId),
        token,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries([
        API_CONSTANTS.CONTENT_PLANNER.getFilterData,
      ]),
  });
};

export const useRegenerateDallePrompt = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({
      projectId,
      creativeId,
      tool = "openAi",
      language = "english",
      dallePrompt,
    }) => {
      const data = await Patch({
        path: API_CONSTANTS.CONTENT_PLANNER.regenerateDallePrompt
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":tool", tool)
          .replace(":language", language),
        token,
        body: { dallePrompt },
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useRegenerateImageIdeas = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({
      projectId,
      creativeId,
      tool = "openAi",
      language = "english",
      imageIdeas,
    }) => {
      const data = await Patch({
        path: API_CONSTANTS.CONTENT_PLANNER.regenerateImageIdeas
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":tool", tool)
          .replace(":language", language),
        token,
        body: { imageIdeas },
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useRegenerateSinglePost = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({
      projectId,
      creativeId,
      platform,
      tool = "openAi",
      language = "english",
      post,
    }) => {
      const data = await Patch({
        path: API_CONSTANTS.CONTENT_PLANNER.regenerateSinglePost
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":platform", platform)
          .replace(":tool", tool)
          .replace(":language", language),
        token,
        body: { post },
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useDeleteGeneratedImage = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({
      projectId,
      creativeId,
      imageId,
      generatedImageId,
    }) => {
      const data = await Delete({
        path: API_CONSTANTS.CONTENT_PLANNER.deleteGeneratedImage
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId)
          .replace(":generatedImageId", generatedImageId),
        token,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};

export const useUploadImage = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, creativeId, imageId, postId, body }) => {
      const data = await Post({
        path: API_CONSTANTS.CONTENT_PLANNER.uploadImage
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId)
          .replace(":postId", postId),
        token,
        body,
        toastError: true,
        toastMessage: true,
        contentType: CONTENT_TYPE.FORM_DATA,
      });
      return data;
    },
  });
};

export const useDeleteUploadedImage = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({
      projectId,
      creativeId,
      imageId,
      postId,
      uploadedImageId,
    }) => {
      const data = await Delete({
        path: API_CONSTANTS.CONTENT_PLANNER.deleteUploadedImage
          .replace(":projectId", projectId)
          .replace(":creativeId", creativeId)
          .replace(":imageId", imageId)
          .replace(":postId", postId)
          .replace(":uploadedImageId", uploadedImageId),
        token,
        toastError: true,
        toastMessage: true,
      });
      return data;
    },
  });
};
