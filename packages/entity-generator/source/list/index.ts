import { resolve } from "path";
import { readFileSync } from "fs";
import { compile } from "handlebars";
import { format } from "prettier";

import { Entity } from "../base";
import { getEntityNaming } from "../helper";

export function getPagination(entity: Entity) {
  const { type, file, instance } = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./pagination.hbs"), "utf-8")
  );
  return format(
    template({
      type,
      file,
      instance,
      entityCard: `${type}Card`,
      componentProps: `${type}PaginationProps`,
      component: `${type}Pagination`,
    })
  );
}

export function getList(entity: Entity) {
  const { type, file, instance } = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./list.hbs"), "utf-8")
  );
  return format(
    template({
      type,
      file,
      instance,
      entityCard: `${type}Card`,
      componentProps: `${type}ListProps`,
      component: `${type}List`,
    })
  );
}

export function getCard(entity: Entity) {
  const { type, file, instance } = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./card.hbs"), "utf-8")
  );
  return format(
    template({
      type,
      file,
      instance,
      componentProps: `${type}CardProps`,
      component: `${type}Card`,
      fieldCollection: entity.displayFieldCollection
        .map((field) => `{${instance}.${field}}`)
        .join("\n"),
    })
  );
}

export function getPaginationHook(entity: Entity) {
  const { type, file, instance } = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./pagination-hook.hbs"), "utf-8")
  );
  return format(
    template({
      type,
      file,
      instance,
      queryConstName: `${type.toUpperCase()}_PAGINATION_QUERY`,
      queryName: `${instance}Pagination`,
      hook: `use${type}Pagination`,
      fields: entity.displayFieldCollection.join("\n        "),
    })
  );
}

export function getListHook(entity: Entity) {
  const { type, file, instance } = getEntityNaming(entity.name);
  const template = compile(
    readFileSync(resolve(__dirname, "./list-hook.hbs"), "utf-8")
  );
  return format(
    template({
      type,
      file,
      instance,
      queryConstName: `${type.toUpperCase()}_LIST_QUERY`,
      queryName: `${instance}Collection`,
      hook: `use${type}List`,
      fields: entity.displayFieldCollection.join("\n        "),
    })
  );
}
