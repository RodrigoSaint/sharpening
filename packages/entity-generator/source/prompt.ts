import inquirer from "inquirer";
import { Entity, Field } from "./base";

async function askField(): Promise<Field> {
  const { name } = await inquirer.prompt([
    { message: "What is the field name?", name: "name" },
  ]);

  if (!name) return null;

  const { isRequired, type } = await inquirer.prompt([
    {
      message: "Is it required?",
      name: "isRequired",
      type: "confirm",
      default: false,
    },
    {
      message: "What is the field type",
      type: "list",
      choices: ["string", "int", "decimal", "date"],
      name: "type",
    },
  ]);

  return { name, isRequired, type };
}

export async function askEntity(): Promise<Entity> {
  const entity: Entity = {
    name: (
      await inquirer.prompt([
        { name: "name", message: "What is the entity name?" },
      ])
    ).name,
    fieldCollection: [],
    actionCollection: [],
    formFieldCollection: [],
  };

  let currentField;
  console.log("\n\nFIELDS");
  do {
    currentField = await askField();
    currentField && entity.fieldCollection.push(currentField);
    console.log("\n");
  } while (currentField);

  const { actionCollection, formFieldCollection } = await inquirer.prompt([
    {
      message: "What actions do you have?",
      name: "actionCollection",
      type: "checkbox",
      choices: ["pagination", "list", "detail", "create", "update", "delete"],
    },
    {
      message: "Which fields are present in the form?",
      name: "formFieldCollection",
      type: "checkbox",
      choices: entity.fieldCollection.map((c) => c.name),
      default: entity.fieldCollection
        .filter((c) => c.isRequired)
        .map((c) => c.name),
    },
  ]);

  return { ...entity, actionCollection, formFieldCollection };
}
