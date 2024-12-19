import moment from "moment/moment";
import { DEFAULT_DATETIME_FORMAT, DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from "../constants/defaults";

export const formatDate = (date) => {
    return moment(date).utc().local().format(DEFAULT_DATE_FORMAT);
};

export const formatTime = (time, embedDate) => {
    if (embedDate) {
        const embedded = moment().format(DEFAULT_DATE_FORMAT) + " " + time;
        return moment(embedded).utc().local().format(DEFAULT_TIME_FORMAT);
    }
    return moment(time).utc().local().format(DEFAULT_TIME_FORMAT);
};

export const formatDateTime = (dateTime) => {
    if (dateTime)
        return moment(dateTime).utc().local().format(DEFAULT_DATETIME_FORMAT);
    else return "N/A";
};

export const formatDateForServer = (input) => {
    return moment(input).format("DD-MM-yyyy");
}