import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Delete, Patch } from '../api';
import API_CONSTANTS from '../constants/api';
import { CONTENT_TYPE } from '../constants/enums';

export const useCreateProjectDocument = (id) => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async (body) => {
      const res = await Patch({
        path: API_CONSTANTS.PROJECT_DOCUMENTS.base.replace(':projectId', id),
        token,
        contentType: CONTENT_TYPE.FORM_DATA,
        body,
        toastError: true,
        toastMessage: true,
      });
      return res;
    },
  });
};

export const useRenameDocument = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, documentId, body }) => {
      const res = await Patch({
        path: API_CONSTANTS.PROJECT_DOCUMENTS.rename
          .replace(':projectId', projectId)
          .replace(':documentId', documentId),
        token,
        body,
        toastError: true,
        toastMessage: true,
      });
      return res;
    },
  });
};

export const useDeleteDocument = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, documentId }) => {
      const res = await Delete({
        path: API_CONSTANTS.PROJECT_DOCUMENTS.rename
          .replace(':projectId', projectId)
          .replace(':documentId', documentId),
        token,
        toastError: true,
        toastMessage: true,
      });
      return res;
    },
  });
};

export const useDeleteImage = () => {
  const token = useSelector((state) => state.user?.token);
  return useMutation({
    mutationFn: async ({ projectId, imageId }) => {
      const res = await Delete({
        path: API_CONSTANTS.PROJECT_DOCUMENTS.deleteIMG
          .replace(':projectId', projectId)
          .replace(':imageId', imageId),
        token,
        toastError: true,
        toastMessage: true,
      });
      return res;
    },
  });
};
