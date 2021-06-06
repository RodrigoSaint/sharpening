import React, { ReactNode, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";

import { TextColor, TextColorStyle } from "./color";

export interface TextStyle extends TextColorStyle {
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
}

export interface TextProps {
  children: ReactNode;
  style?: TextStyle;
}

export const defaultTextStyle: TextStyle = {
  fontFamily:
    "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
  fontSize: "16px",
  lineHeight: "1.5em",
};

export function getTextStyle(
  style?: TextStyle,
  defaultStyle = defaultTextStyle,
  themeKey: string = "text"
): TextStyle {
  const theme = useContext(ThemeContext);
  const themeStyle = theme && theme[themeKey];
  const computeStyle = getComputedStyle(style, themeStyle, defaultStyle);

  return {
    fontFamily: computeStyle("fontFamily"),
    fontSize: computeStyle("fontSize"),
    lineHeight: computeStyle("lineHeight"),
    fontWeight: computeStyle("fontWeight"),
  };
}

const BaseText = styled.span<TextStyle>`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  font-weight: ${(props) => props.fontWeight};
`;

export function Text({ children, style }: TextProps) {
  return (
    <TextColor style={style}>
      <BaseText {...getTextStyle(style, undefined, "text")}>
        {children}
      </BaseText>
    </TextColor>
  );
}
