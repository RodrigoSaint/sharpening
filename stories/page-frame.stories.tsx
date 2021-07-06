import React from "react";
import { Meta } from "@storybook/react";

import PageFrame from "../packages/page-frame/source";

export default {
  title: "PageFrame",
  component: PageFrame,
} as Meta;

export const DefaultPageFrame = () => (
  <PageFrame header={"Hello"} footer={"footer"} style={{ background: "blue" }}>
    My content
  </PageFrame>
);
