import React from "react";
import { Meta } from "@storybook/react";

import Input from "../packages/input/source";

export default {
  title: "Input",
  component: Input,
} as Meta;

export const DefaultInput = () => (
  <Input style={{ border: "1px solid black" }} />
);

export const InputWithFocus = () => (
  <Input
    style={{
      border: "1px solid lightgray",
      borderFocus: "1px solid gray",
    }}
  />
);
