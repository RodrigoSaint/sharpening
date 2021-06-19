import React from "react";
import { Meta } from "@storybook/react";

import Button from "../packages/button/source";

export default {
  title: "Button",
  component: Button,
} as Meta;

export const DefaultButton = () => <Button>Hello</Button>;
