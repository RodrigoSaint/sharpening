import React from "react";
import styled from "styled-components";

import { TextColor } from "./color";
import { TextProps, TextStyle, getTextStyle } from "./text";

const BaseParagraph = styled.p<TextStyle>`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.fontWeight};
  margin: 0;
`;

export function Paragraph({ children, style }: TextProps) {
  return (
    <TextColor style={style}>
      <BaseParagraph {...getTextStyle(style, undefined, "paragraph")}>
        {children}
      </BaseParagraph>
    </TextColor>
  );
}
