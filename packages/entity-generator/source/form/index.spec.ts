import { Entity } from "../base";
import { getForm, getCreateHook, getUpdateHook } from ".";

const entity: Entity = {
  name: "User",
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
  formFieldCollection: ["name", "email"],
};

describe("Form", () => {
  it("renders form properly", () => {
    expect(getForm(entity)).toMatchSnapshot("getForm");
  });
  it("renders create hook properly", () => {
    expect(getCreateHook(entity)).toMatchSnapshot("getCreateHook");
  });
  it("renders create hook properly", () => {
    expect(getUpdateHook(entity)).toMatchSnapshot("getUpdateHook");
  });
});
