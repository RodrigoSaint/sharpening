import React, { useContext } from "react";
import { Text } from "@rodrigosaint/text-essentials";
import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";

interface ButtonBackgroundStyle {
  attention: string;
  error: string;
  primary: string;
  white: string;
}

const defaultTextStyleColor: ButtonBackgroundStyle = {
  attention: "#fe7d00",
  error: "#d51a2a",
  primary: "#0366d6",
  white: "#FFF",
};

type BackgroundType = keyof ButtonBackgroundStyle;

interface ButtonStyle {
  background?: BackgroundType;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  padding?: string;
  color?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: ButtonStyle;
}

const defaultStyle: ButtonStyle = {
  background: "primary",
  borderRadius: "12px",
  border: "none",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.5)",
  padding: "6px 20px",
  color: "white",
};

function getColor(value: string) {
  return Object.keys(defaultTextStyleColor).includes(value)
    ? defaultTextStyleColor[value]
    : value;
}

function getStyle(style?: ButtonStyle): ButtonStyle {
  const theme = useContext(ThemeContext);
  const compute = getComputedStyle(style, theme?.button, defaultStyle);

  return {
    background: getColor(compute("background")),
    borderRadius: compute("borderRadius"),
    border: compute("border"),
    boxShadow: compute("boxShadow"),
    padding: compute("padding"),
    color: compute("color"),
  };
}

const BaseButton = styled.button<ButtonStyle>`
  background: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius};
  outline: none;
  border: ${(props) => props.border};
  cursor: pointer;
  box-shadow: ${(props) => props.boxShadow};
  padding: ${(props) => props.padding};
  &:hover {
    filter: brightness(90%);
  }
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

export default function Button({ children, style, ...props }: ButtonProps) {
  const { color, ...computedStyle } = getStyle(style);
  return (
    <BaseButton {...props} {...computedStyle}>
      <Text style={{ color }}>{children}</Text>
    </BaseButton>
  );
}
