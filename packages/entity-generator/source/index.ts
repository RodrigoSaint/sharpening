import fs from "fs";

import { askEntity } from "./prompt";
import { getEntityType, getAll } from "./graphql";
import { saveFrontend, saveTypeDefinition } from "./file";
import { Entity } from "./base";

// askEntity().then((entity) =>
//   fs.writeFileSync("schema.gql", getEntityType(entity))
// );

const entity: Entity = {
  name: "User",
  actionCollection: [
    "pagination",
    "list",
    "detail",
    "create",
    "update",
    "delete",
  ],
  fieldCollection: [
    {
      name: "name",
      isRequired: true,
      type: "string",
    },
    {
      name: "email",
      isRequired: false,
      type: "string",
    },
    {
      name: "age",
      isRequired: false,
      type: "int",
    },
  ],
  displayFieldCollection: ["name", "email", "age"],
  formFieldCollection: ["name", "email", "age"],
};

console.log("it is starting");
saveFrontend(entity)
  .then(() => saveTypeDefinition(entity))
  .then(() => console.log("we are done"))
  .catch(console.error);
