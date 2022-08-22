export function jsonParse(str: any) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

export function deleteUndefinedProperty(obj: any) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
}
