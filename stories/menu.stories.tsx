import React from "react";
import { Meta } from "@storybook/react";

import Menu from "../packages/menu/source";

export default {
  title: "Menu",
  component: Menu,
} as Meta;

export const DefaultMenu = () => (
  <Menu logo={<span>LOGO</span>}>
    <span>Item 1</span> <span>Item 2</span>
  </Menu>
);

export const CustomtMenu = () => (
  <Menu style={{ background: "red" }} logo={<span>LOGO</span>}>
    <span>Item 1</span> <span>Item 2</span>
  </Menu>
);
