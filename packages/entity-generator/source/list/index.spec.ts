import { Entity } from "../base";
import { getPagination, getList, getCard } from ".";

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
  displayFieldCollection: ["name", "email"],
};

describe("List", () => {
  it("renders pagination properly", () => {
    expect(getPagination(entity)).toMatchSnapshot("getPagination");
  });
  it("renders list properly", () => {
    expect(getList(entity)).toMatchSnapshot("getList");
  });
  it("renders list properly", () => {
    expect(getCard(entity)).toMatchSnapshot("getCard");
  });
});
