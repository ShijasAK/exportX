import { useEffect, useState } from "react"
import API_CONSTANTS, { BASE_URL } from "../constants/api"

export const prepareData = (data, allowedKeys, removeKeys) => {
  data = Object.keys(data).reduce((obj, key) => {
    if (allowedKeys.includes(key)) {
      obj[key] = data[key]
    }
    return obj
  }, {})
  if (removeKeys) {
    removeKeys.forEach((item) => delete data[item])
  }
  return data
}

export const isUnauthorized = (error) => {
  const allowedEndPoints = [
    `${BASE_URL}${API_CONSTANTS.AUTH.login}`,
  ]

  if (allowedEndPoints.includes(error?.config?.url)) return false
  return error.response?.status === 401
}