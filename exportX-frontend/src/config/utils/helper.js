class helper {
  isEmpty(value) {
    return (
      value === undefined ||
      value === "" ||
      value === null ||
      Number.isNaN(value) ||
      value === false ||
      value === 0 ||
      value < 0 ||
      (typeof value === "object" &&
        Array.isArray(value) &&
        value.length === 0) ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  }

  /** to check the value type */
  typeOfTest = (type) => (thing) => typeof thing === type;

  isFunction(value) {
    return typeof value === "function";
  }

  isObject(value) {
    return typeof value === "object" && value.constructor === Object;
  }

  isArray(value) {
    return typeof value === "object" && Array.isArray(value);
  }

  isString(value) {
    return typeof value === "string";
  }

  createDynamicUrl(url, object = {}) {
    let cloneUrl = url;
    if (this.isString(cloneUrl)) {
      for (const key in object) {
        cloneUrl = cloneUrl.replace(`{${key}}`, object[key]);
      }
    }
    return cloneUrl;
  }

  createDynamicPath(path, object) {
    for (const key in object) {
      path = path.replace(`:${key}`, object[key]);
    }
    return path;
  }

  isUndefined(value) {
    return typeof value === "undefined";
  }

  getTimestamp() {
    return new Date().getTime();
  }
}

export default new helper();
