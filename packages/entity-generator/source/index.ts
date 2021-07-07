import fs from "fs";

import { askEntity } from "./prompt";
import { getEntityType, getAll } from "./graphql";

// askEntity().then((entity) =>
//   fs.writeFileSync("schema.gql", getEntityType(entity))
// );

fs.writeFileSync(
  "schema.gql",
  getAll({
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
  })
);
