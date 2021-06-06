import { ReactNode, useContext } from "react";
import { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";

import { TextColorStyle } from "./color";

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
