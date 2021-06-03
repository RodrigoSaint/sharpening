export function getComputedStyle<T>(params: T, theme: T, defaultStyle: T) {
  return (property: keyof T) =>
    (params && params[property]) ||
    (theme && theme[property]) ||
    defaultStyle[property];
}
