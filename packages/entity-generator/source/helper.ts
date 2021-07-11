export function getCapital(text) {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
}

export function getCamel(text) {
  return `${text.slice(0, 1).toLowerCase()}${text.slice(1)}`;
}

export function getUnderscore(text) {
  return text
    .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
    .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);
}

export function getEntityNaming(name: string) {
  return {
    type: getCapital(name),
    instance: getCamel(name),
    file: getUnderscore(name),
  };
}
