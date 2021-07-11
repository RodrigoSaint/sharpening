export type FieldType = "string" | "int" | "decimal" | "date";

export interface Field {
  name: string;
  isRequired: boolean;
  type: FieldType;
}

export type EntityAction =
  | "pagination"
  | "list"
  | "detail"
  | "create"
  | "update"
  | "delete";

export interface Entity {
  name: string;
  fieldCollection: Field[];
  actionCollection?: EntityAction[];
  formFieldCollection?: string[];
  displayFieldCollection?: string[];
}
