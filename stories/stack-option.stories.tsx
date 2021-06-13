import React from "react";
import { Meta } from "@storybook/react";

import StackOption from "../packages/stack-option/source";

export default {
  title: "StackOption",
  component: StackOption,
} as Meta;

const Box = () => (
  <div
    style={{
      width: "300px",
      height: "300px",
      background: "blue",
      color: "white",
    }}
  >
    Main Content
  </div>
);

export const TopRightStackOption = () => (
  <StackOption
    position="top-right"
    renderOption={() => <div style={{ background: "red" }}>Option</div>}
  >
    <Box />
  </StackOption>
);

export const BottomLeftStackOption = () => (
  <StackOption
    position="bottom-left"
    renderOption={() => <div style={{ background: "red" }}>Option</div>}
  >
    <Box />
  </StackOption>
);
