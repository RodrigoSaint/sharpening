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
    expect(getEntityInput(entity)).toBe(
      `input UserInput {\n\tname: String\n\temail: String\n\tage: Int\n}`
    );
  });
  it("generates entity type", () => {
    expect(getEntityType(entity)).toBe(
      `type User {\n\tname: String\n\temail: String\n\tage: Int\n}`
    );
  });
  it("generates entity pagination", () => {
    expect(getEntityPaginationType(entity)).toBe(
      `type UserPagination {\n\tcollection: [User]\n\tcurrentPage: Int\n\tpageCount: Int\n}`
    );
  });
  it("get ListQuery", () => {
    expect(getListQuery(entity)).toBe(`userCollection: [User]!`);
  });
  it("get DetailQuery", () => {
    expect(getDetailQuery(entity)).toBe(`user(userId: String!): User!`);
  });
  it("get PaginationQuery", () => {
    expect(getPaginationQuery(entity)).toBe(
      `userPagination(page: Int!): UserPagination!`
    );
  });
  it("get CreateMutation", () => {
    expect(getCreateMutation(entity)).toBe(
      `createUser(user: UserInput!): User!`
    );
  });
  it("get UpdateMutation", () => {
    expect(getUpdateMutation(entity)).toBe(
      `updateUser(user: UserInput!): User!`
    );
  });
  it("get DeleteMutation", () => {
    expect(getDeleteMutation(entity)).toBe(
      `deleteUser(userId: String!): Boolean!`
    );
  });
  it("get Query", () => {
    expect(getQuery(entity)).toBe(
      `type Query {
\t${getPaginationQuery(entity)}
\t${getListQuery(entity)}
\t${getDetailQuery(entity)}
}`
    );
  });
  it("get Mutation", () => {
    expect(getMutation(entity)).toBe(
      `type Mutation {
\t${getCreateMutation(entity)}
\t${getUpdateMutation(entity)}
\t${getDeleteMutation(entity)}
}`
    );
  });
});
