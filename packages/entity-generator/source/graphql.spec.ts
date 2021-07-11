import {
  getEntityInput,
  getEntityType,
  getEntityPaginationType,
  getListQuery,
  getPaginationQuery,
  getDetailQuery,
  getCreateMutation,
  getUpdateMutation,
  getDeleteMutation,
  getQuery,
  getMutation,
} from "./graphql";
import { Entity } from "./base";

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

describe("Graphql", () => {
  it("generates entity input", () => {
    expect(getEntityInput(entity)).toMatchSnapshot("getEntityInput");
  });
  it("generates entity type", () => {
    expect(getEntityType(entity)).toMatchSnapshot("getEntityType");
  });
  it("generates entity pagination", () => {
    expect(getEntityPaginationType(entity)).toMatchSnapshot(
      "getEntityPaginationType"
    );
  });
  it("get ListQuery", () => {
    expect(getListQuery(entity)).toMatchSnapshot("ListQuery");
  });
  it("get DetailQuery", () => {
    expect(getDetailQuery(entity)).toMatchSnapshot("DetailQuery");
  });
  it("get PaginationQuery", () => {
    expect(getPaginationQuery(entity)).toMatchSnapshot("PaginationQuery");
  });
  it("get CreateMutation", () => {
    expect(getCreateMutation(entity)).toMatchSnapshot("CreateMutation");
  });
  it("get UpdateMutation", () => {
    expect(getUpdateMutation(entity)).toMatchSnapshot("UpdateMutation");
  });
  it("get DeleteMutation", () => {
    expect(getDeleteMutation(entity)).toMatchSnapshot("DeleteMutation");
  });
  it("get Query", () => {
    expect(getQuery(entity)).toMatchSnapshot("getQuery");
  });
  it("get Mutation", () => {
    expect(getMutation(entity)).toMatchSnapshot("getMutation");
  });
});
