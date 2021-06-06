import React from "react";
import styled from "styled-components";

import { TextColor } from "./color";
import { TextProps, TextStyle, getTextStyle, defaultTextStyle } from "./text";

const BaseTitle = styled.span<TextStyle>`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.fontWeight};
`;

const defaultTitleStyle: TextStyle = {
  ...defaultTextStyle,
  fontWeight: "bold",
  fontSize: "22px",
};

export function Title({ children, style }: TextProps) {
  return (
    <TextColor style={style}>
      <BaseTitle {...getTextStyle(style, defaultTitleStyle, "title")}>
        {children}
      </BaseTitle>
    </TextColor>
  );
}
