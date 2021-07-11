import { resolve } from "path";
import { readFileSync } from "fs";
import { compile } from "handlebars";
import { format } from "prettier";

import { Entity, Field } from "../base";
import { getEntityNaming } from "../helper";

function getField(field: Field) {
  return `<Field name="${field.name}" />`;
}

export function getForm(entity: Entity) {
  const usedFieldCollection = entity.formFieldCollection.map((name) =>
    entity.fieldCollection.find((field) => field.name === name)
  );
  const { type, file } = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./component.hbs"), "utf-8")
  );
  return format(
    template({
      type,
      file,
      form: `${type}Form`,
      formProps: `${type}FormProps`,
      fieldCollection: usedFieldCollection.map(getField).join("\n"),
    })
  );
}

export function getCreateHook(entity: Entity) {
  const naming = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./hook.hbs"), "utf-8")
  );
  return format(
    template({
      ...naming,
      input: `${naming.type}Input`,
      validation: `${naming.instance}Schema`,
      underscoredMutationName: `${naming.instance.toUpperCase()}_CREATE_MUTATION`,
      mutationName: `${naming.instance}Create`,
      hook: `use${naming.type}Create`,
    })
  );
}

export function getUpdateHook(entity: Entity) {
  const naming = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./hook.hbs"), "utf-8")
  );
  return format(
    template({
      ...naming,
      input: `${naming.type}Input`,
      validation: `${naming.instance}Schema`,
      underscoredMutationName: `${naming.instance.toUpperCase()}_UPDATE_MUTATION`,
      mutationName: `${naming.instance}Update`,
      hook: `use${naming.type}Update`,
    })
  );
}
