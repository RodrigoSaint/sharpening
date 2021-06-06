import React, { ReactNode, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";

import { TextColor } from "./color";

interface TextTypeColorStyle {
  focused: string;
  normal: string;
  faded: string;
  error: string;
  primary: string;
  attention: string;
  white: string;
}

type TextType = keyof TextTypeColorStyle;

interface TextColorStyle {
  color?: string | TextType;
}

interface TextStyle extends TextColorStyle {
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
}

interface TextProps {
  children: ReactNode;
  style?: TextStyle;
}

const defaultTextStyle: TextStyle = {
  fontFamily:
    "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
  fontSize: "16px",
  lineHeight: "1.5em",
};

const BaseParagraph = styled.p<TextStyle>`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
`;

function getParagraphStyles(style?: TextStyle): TextStyle {
  const theme = useContext(ThemeContext);
  const computeStyle = getComputedStyle(
    style,
    theme?.paragraph,
    defaultTextStyle
  );

  return {
    fontFamily: computeStyle("fontFamily"),
    fontSize: computeStyle("fontSize"),
    lineHeight: computeStyle("lineHeight"),
  };
}

export function Paragraph({ children, style }: TextProps) {
  return (
    <TextColor style={style}>
      <BaseParagraph {...getParagraphStyles(style)}>{children}</BaseParagraph>
    </TextColor>
  );
}
