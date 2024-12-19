export const accessValue = (object, path) => {
    if (typeof object !== 'object' || typeof path !== 'string') {
        return '';
    }
    const properties = path.split('.');
    let value = object;
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        value = value?.[property];

        if (value === undefined) {
            return undefined;
        }
    }
    return value;
}

export const getPageTitle = (title = "Home") => {
    title = title.replace(/-/g, " ")
    // return `${title?.charAt(0).toUpperCase() + title?.slice(1)} | ${Config.env().APP_NAME}`
    return `${title?.charAt(0).toUpperCase() + title?.slice(1)} | Invenue Design`
}

export const pluralize = (noun, suffix = "s") => `${noun}${suffix}`;

export const singularize = (noun) => {
    if (noun.endsWith("ies")) {
        return noun.replace("ies", "y");
    }
    if (noun.endsWith("s")) {
        return noun.slice(0, -1);
    }
    return noun;
}

export const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
}

export const breakCamelCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const trimString = (str, length = 100) => {
    if (str.length > length) {
        return str.slice(0, length) + "...";
    }
    return str;
}