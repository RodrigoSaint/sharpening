import { Entity } from "./base";
import { getInterface, getEntityValidation } from "./typescript";
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
};

describe("Typescript", () => {
  it("Gets interface", () => {
    expect(getInterface(entity)).toMatchSnapshot("getInterface");
  });
  it("Get entity validation", () => {
    expect(getEntityValidation(entity)).toMatchSnapshot("getEntityValidation");
  });
});
