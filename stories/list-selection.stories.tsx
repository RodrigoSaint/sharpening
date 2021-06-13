import React from "react";
import { Meta } from "@storybook/react";

import ListSelection from "../packages/list-selection/source";
import Card from "../packages/card/source";

export default {
  title: "ListSelection",
  component: ListSelection,
} as Meta;

export const DefaultListSelection = () => (
  <ListSelection
    onSelected={() => {}}
    collection={["teste 1", "teste 2", "teste 3"]}
    render={(item) => <Card style={{ padding: 5 }}>{item.toUpperCase()}</Card>}
    getKey={(item) => item}
  />
);
