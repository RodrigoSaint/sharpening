import React, { ReactNode, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";

export interface TextTypeColorStyle {
  focused: string;
  normal: string;
  faded: string;
  error: string;
  primary: string;
  attention: string;
  white: string;
  black: string;
}

export type TextType = keyof TextTypeColorStyle;

export interface TextColorStyle {
  color?: string | TextType;
}

interface TextColorProps {
  style?: TextColorStyle;
  children: ReactNode;
}

const BaseTextColor = styled.div<{ color?: TextColorStyle }>`
  color: ${(props) => props.color};
`;

const defaultTextStyleColor: TextTypeColorStyle = {
  attention: "#fe7d00",
  error: "#d51a2a",
  faded: "#33333380",
  focused: "#181818",
  normal: "#213053",
  primary: "#0366d6",
  white: "white",
  black: "black",
};

const defaultTextColor: TextColorStyle = {
  color: "normal" as TextType,
};

function isTextStyle(color: string) {
  return Object.keys(defaultTextStyleColor).includes(color);
}

function mapTextStyleColor(color: string): string {
  return defaultTextStyleColor[color];
}

function getTextColorStyle(style?: TextColorStyle): TextColorStyle {
  const theme = useContext(ThemeContext);
  const computeStyle = getComputedStyle<TextColorStyle>(
    style,
    theme?.textColor,
    defaultTextColor
  );
  const color = computeStyle("color");
  return { color: isTextStyle(color) ? mapTextStyleColor(color) : color };
}

export function TextColor({ style, children }: TextColorProps) {
  return (
    <BaseTextColor {...getTextColorStyle(style)}>{children}</BaseTextColor>
  );
}
