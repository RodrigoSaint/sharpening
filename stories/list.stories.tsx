import React from "react";
import { Meta } from "@storybook/react";

import List from "../packages/list/source";

export default {
  title: "List",
  component: List,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const HorizontalList = () => (
  <List
    collection={["teste 1", "teste 2", "teste 3"]}
    render={(item) => <h2>{item.toUpperCase()}</h2>}
    getKey={(item) => item}
  />
);

export const VerticalList = () => (
  <List
    collection={["teste 1", "teste 2", "teste 3"]}
    render={(item) => <h2>{item.toUpperCase()}</h2>}
    getKey={(item) => item}
    style={{ type: "vertical", spacing: "1px" }}
  />
);
