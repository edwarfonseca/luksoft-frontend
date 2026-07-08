export function snakeToCamel(key) {
  return key.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}

export function keysToCamel(value) {
  if (Array.isArray(value)) return value.map(keysToCamel);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [snakeToCamel(key), val]));
  }
  return value;
}

export function camelToSnake(key) {
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function keysToSnake(value) {
  if (Array.isArray(value)) return value.map(keysToSnake);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [camelToSnake(key), val]));
  }
  return value;
}
