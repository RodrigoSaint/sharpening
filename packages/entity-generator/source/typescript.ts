import { Entity, Field, FieldType } from "./base";
import { getCamel, getCapital } from "./helper";

function getFieldType(type: FieldType) {
  const map: Record<FieldType, string> = {
    string: "string",
    int: "number",
    decimal: "number",
    date: "Date",
  };
  return map[type];
}

export function getField(field: Field) {
  return `\t${field.name}: ${getFieldType(field.type)};\n`;
}

export function getInterface(entity: Entity) {
  return `interface ${getCapital(entity.name)} {\n${entity.fieldCollection
    .map(getField)
    .join("")}}`;
}

export function getFieldValidation(field: Field) {
  const map: Record<FieldType, string> = {
    string: ".string()",
    int: ".number()",
    decimal: ".number()",
    date: ".date()",
  };

  const isRequired = field.isRequired ? ".required()" : "";

  return `\t${field.name}: yup${map[field.type]}${isRequired}`;
}

export function getEntityValidation(entity: Entity) {
  return `const ${getCamel(
    entity.name
  )}Schema = yup.object().shape({\n${entity.fieldCollection
    .map(getFieldValidation)
    .join(",\n")}\n})`;
}
