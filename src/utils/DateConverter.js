export function getDay(date) {
    return date.getDate();
}

export function getMonth(date) {
    return date.getMonth() + 1;
}

export function getYear(date) {
    return date.getFullYear();
}

export function getHour(date) {
    return date.getHours();
}

export function getMinute(date) {
    return date.getMinutes();
}

export function getSecond(date) {
    return date.getSeconds();
}

export function getDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function getTime(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${hour}:${minute}:${second}`;
}

export function getDateTime(date) {
    return `${getDate(date)} ${getTime(date)}`;
}
