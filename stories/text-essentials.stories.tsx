import React from "react";
import { Meta } from "@storybook/react";
import { withKnobs, text, optionsKnob } from "@storybook/addon-knobs";

import { Paragraph, TextColor } from "../packages/text-essentials/source";

export default {
  title: "TextEssentials",
  component: Paragraph,
  decorators: [withKnobs],
} as Meta;

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nibh ex, tristique at congue sit amet, pulvinar non neque. Curabitur eget malesuada diam. Curabitur malesuada rhoncus augue ultricies mollis. Maecenas iaculis elit ut tellus aliquam tempus. Nunc mattis at eros ut posuere. Praesent placerat, nibh quis dapibus gravida, elit ex venenatis velit, non rutrum dui dolor et tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer imperdiet sem a orci accumsan consequat. Maecenas pharetra fringilla turpis, eu convallis velit ultricies eget.
`;

export const DefaultParagraph = () => (
  <Paragraph>{text("text", loremIpsum)}</Paragraph>
);

export const FadedColor = () => (
  <TextColor
    style={{
      color: optionsKnob(
        "color",
        {
          focused: "focused",
          normal: "normal",
          faded: "faded",
          error: "error",
          primary: "primary",
          attention: "attention",
        },
        "focused",
        {
          display: "select",
        }
      ),
    }}
  >
    {loremIpsum}
  </TextColor>
);
