import React from "react";
import { Meta } from "@storybook/react";

import Card from "../packages/card/source";

export default {
  title: "Card",
  component: Card,
} as Meta;

export const DefaultCard = () => (
  <Card style={{ padding: 5 }}>My nice content</Card>
);
