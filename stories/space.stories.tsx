import React from "react";
import { Meta } from "@storybook/react";

import Space from "../packages/space/source";

export default {
  title: "Space",
  component: Space,
} as Meta;

export const DefaultSpace = () => (
  <div style={{ display: "flex" }}>
    <Space margin={3}>
      <button>Hello</button>
    </Space>
    <Space margin={3}>
      <button>Hello 2 </button>
    </Space>
  </div>
);
