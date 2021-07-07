import { Entity, Field, FieldType, EntityAction } from "./base";
import { getCamel, getCapital } from "./helper";

function getGraphqlFieldType(type: FieldType) {
  switch (type) {
    case "string":
      return "String";
    case "int":
      return "Int";
    case "decimal":
      return "Decimal";
    case "date":
      return "String";
  }
}

function getGraphqlField(field: Field) {
  return `\t${field.name}: ${getGraphqlFieldType(field.type)}`;
}

export function getEntityType(entity: Entity) {
  return `type ${entity.name} {\n${entity.fieldCollection
    .map(getGraphqlField)
    .join("\n")}
}`;
}

export function getEntityInput(entity: Entity) {
  return `input ${entity.name}Input {\n${entity.fieldCollection
    .map(getGraphqlField)
    .join("\n")}
}`;
}

export function getEntityPaginationType(entity: Entity) {
  return `type ${entity.name}Pagination {
\tcollection: [${entity.name}]
\tcurrentPage: Int
\tpageCount: Int
}`;
}

export function getListQuery(entity: Entity) {
  return `${getCamel(entity.name)}Collection: [${getCapital(entity.name)}]!`;
}

export function getPaginationQuery(entity: Entity) {
  return `${getCamel(entity.name)}Pagination(page: Int!): ${getCapital(
    entity.name
  )}Pagination!`;
}

export function getDetailQuery(entity: Entity) {
  return `${getCamel(entity.name)}(${getCamel(
    entity.name
  )}Id: String!): ${getCapital(entity.name)}!`;
}

export function getCreateMutation(entity: Entity) {
  return `create${entity.name}(${getCamel(entity.name)}: ${getCapital(
    entity.name
  )}Input!): ${getCapital(entity.name)}!`;
}

export function getUpdateMutation(entity: Entity) {
  return `update${entity.name}(${getCamel(entity.name)}: ${getCapital(
    entity.name
  )}Input!): ${getCapital(entity.name)}!`;
}

export function getDeleteMutation(entity: Entity) {
  return `delete${getCapital(entity.name)}(${getCamel(
    entity.name
  )}Id: String!): Boolean!`;
}

const actionMap: Record<EntityAction, (entity: Entity) => string> = {
  pagination: getPaginationQuery,
  list: getListQuery,
  detail: getDetailQuery,
  create: getCreateMutation,
  update: getUpdateMutation,
  delete: getDeleteMutation,
};

const queryActionCollection = ["pagination", "detail", "list"];

export function getQuery(entity: Entity) {
  const queryContent = entity.actionCollection
    .filter((action) => queryActionCollection.includes(action))
    .map((action) => `\t${actionMap[action](entity)}`)
    .join("\n");

  return `type Query {\n${queryContent}\n}`;
}

const mutationActionCollection = ["create", "update", "delete"];
export function getMutation(entity: Entity) {
  const queryContent = entity.actionCollection
    .filter((action) => mutationActionCollection.includes(action))
    .map((action) => `\t${actionMap[action](entity)}`)
    .join("\n");

  return `type Mutation {\n${queryContent}\n}`;
}

export function getAll(entity: Entity) {
  return `
${getEntityType(entity)}

${getEntityInput(entity)}  

${getEntityPaginationType(entity)}

${getQuery(entity)}  

${getMutation(entity)}  
`;
}
