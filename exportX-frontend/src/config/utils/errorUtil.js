export const errorHandler = (messageObject) => {
    let message = messageObject?.message
    if (messageObject?.message === "Validation errors") {
        message = Object.values(messageObject?.data)?.at(0)?.error || message
    }
    return message
}