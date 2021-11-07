import path from "path";
import fs from "fs/promises";

import { Entity, EntityAction } from "./base";
import { getDashed, getCapital } from "./helper";
import { getInterface, getEntityValidation } from "./typescript";
import { getForm, getCreateHook, getUpdateHook } from "./form";
import {
  getCard,
  getList,
  getListHook,
  getPagination,
  getPaginationHook,
} from "./list";

// const BASE_PATH = process.cwd();
const BASE_PATH = "/Users/rodrigosaint/Documents/programming/sharpening/test";

function getPath(folder: string, entity: Entity) {
  return path.join(BASE_PATH, folder, `${getDashed(entity.name)}.ts`);
}

function hasAction(actionCollection: Array<EntityAction>) {
  return (entity: Entity) =>
    actionCollection.some((action) => entity.actionCollection.includes(action));
}

const hasCreation = hasAction(["create", "update"]);

function getTypeContent(entity: Entity) {
  return false === hasCreation(entity)
    ? getInterface(entity)
    : `${getInterface(entity)}\n\n${getEntityValidation(entity)}`;
}

export async function saveTypeDefinition(entity: Entity) {
  await fs.mkdir(path.join(BASE_PATH, "entity"), {
    recursive: true,
  });
  return fs.writeFile(getPath("entity", entity), getTypeContent(entity));
}

const frontendCreation: Array<{
  validation(entity: Entity): boolean;
  action(entity: Entity): Promise<any>;
}> = [
  {
    validation: hasCreation,
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(BASE_PATH, "component", getDashed(entity.name), "form.tsx"),
        getForm(entity)
      ),
  },
  {
    validation: hasAction(["create"]),
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(
          BASE_PATH,
          "hook",
          getDashed(entity.name),
          `use${getCapital(entity.name)}Create.ts`
        ),
        getCreateHook(entity)
      ),
  },
  {
    validation: hasAction(["update"]),
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(
          BASE_PATH,
          "hook",
          getDashed(entity.name),
          `use${getCapital(entity.name)}Update.ts`
        ),
        getUpdateHook(entity)
      ),
  },
  {
    validation: hasAction(["list", "pagination"]),
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(BASE_PATH, "component", getDashed(entity.name), "card.tsx"),
        getCard(entity)
      ),
  },
  {
    validation: hasAction(["list"]),
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(BASE_PATH, "component", getDashed(entity.name), "list.tsx"),
        getList(entity)
      ),
  },
  {
    validation: hasAction(["list"]),
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(
          BASE_PATH,
          "hook",
          getDashed(entity.name),
          `use${getCapital(entity.name)}List.ts`
        ),
        getListHook(entity)
      ),
  },
  {
    validation: hasAction(["pagination"]),
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(
          BASE_PATH,
          "component",
          getDashed(entity.name),
          "pagination.tsx"
        ),
        getPagination(entity)
      ),
  },
  {
    validation: hasAction(["pagination"]),
    action: (entity: Entity) =>
      fs.writeFile(
        path.join(
          BASE_PATH,
          "hook",
          getDashed(entity.name),
          `use${getCapital(entity.name)}Pagination.ts`
        ),
        getPaginationHook(entity)
      ),
  },
];

export async function saveFrontend(entity: Entity) {
  await fs.mkdir(path.join(BASE_PATH, "hook", getDashed(entity.name)), {
    recursive: true,
  });
  await fs.mkdir(path.join(BASE_PATH, "component", getDashed(entity.name)), {
    recursive: true,
  });
  return Promise.all(
    frontendCreation.map((c) =>
      c.validation(entity) ? c.action(entity) : null
    )
  );
}
