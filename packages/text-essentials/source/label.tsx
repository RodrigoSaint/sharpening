import React from "react";
import styled from "styled-components";

import { TextColor } from "./color";
import { TextProps, TextStyle, getTextStyle, defaultTextStyle } from "./text";

const BaseLabel = styled.label<TextStyle>`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.fontWeight};
`;

const defaultLabelStyle: TextStyle = {
  ...defaultTextStyle,
  fontWeight: "bold",
};

export function Label({ children, style }: TextProps) {
  return (
    <TextColor style={style}>
      <BaseLabel {...getTextStyle(style, defaultLabelStyle, "label")}>
        {children}
      </BaseLabel>
    </TextColor>
  );
}
