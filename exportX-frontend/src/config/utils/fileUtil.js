import { BASE_URL } from "../constants/api";

export const getFileExtention = (file, withDot = true) => {
  let ext = file.name.split(".").pop();
  ext = ext.toLowerCase();
  if (withDot) {
    ext = "." + ext;
  }
  return ext;
};

export const getImageUrl = (path) => {
  if (!path) return null;
  return BASE_URL + path;
};

export const toDataURL = async (url) => {
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
};

export const getImageName = (path) => {
  return path?.split("/")?.at(-1) || "image.png";
};
