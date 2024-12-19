// Date Time defaults
export const DEFAULT_DATE_FORMAT = "DD MMM YYYY"
export const DEFAULT_TIME_FORMAT = "hh:mm A"
export const DEFAULT_DATETIME_FORMAT = "DD MMM YYYY hh:mm A"

// File upload defaults
export const MEGABYTE = 1024 * 1024
export const DEFAULT_MAX_UPLOAD_SIZE = 5 // MB
export const ALLOWED_FILE_TYPES_META = {
    IMAGE: ["image/png", "image/jpeg", "image/jpg"],
    VIDEO: ["video/mp4", "video/mov", "video/avi", "video/wmv", "video/flv", "video/mkv", "video/webm"],
    DOCUMENT: ["application/pdf"],
}
export const ALLOWED_FILE_TYPES = {
    IMAGE: [".jpg", ".jpeg", ".png"],
    VIDEO: [".mp4", ".webm", ".ogg"],
    AUDIO: [".mp3", ".wav", ".ogg"],
    ANY: [".jpg", ".jpeg", ".png", ".docx", ".doc", ".pdf"],
    DOCUMENT: [".pdf"],
}

export const FILE_TYPES = {
    IMAGE: "IMAGE",
    VIDEO: "VIDEO",
    AUDIO: "AUDIO",
    DOCUMENT: "DOCUMENT",
    ANY: "ANY"
}

export const MILLISECONDS = {
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    MAX: 2147483647
}