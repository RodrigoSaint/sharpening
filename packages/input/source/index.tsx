import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import React, { InputHTMLAttributes, useContext } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  style?: InputStyle;
}

interface InputStyle {
  border?: string;
  borderFocus?: string;
  radius?: string;
  padding?: string;
}

const BaseInput = styled.input<InputStyle>`
  outline: none;
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};

  &:focus {
    border: ${(props) => props.borderFocus};
  }
`;

const defaultStyle: InputStyle = {
  border: "1px solid lightgray",
  borderFocus: "1px solid gray",
  radius: "10px",
  padding: "8px 12px",
};

function getStyle(style?: InputStyle): InputStyle {
  const theme = useContext<{ input: InputStyle }>(ThemeContext);
  const computeStyle = getComputedStyle(style, theme?.input, defaultStyle);

  return {
    border: computeStyle("border"),
    borderFocus: computeStyle("borderFocus"),
    radius: computeStyle("radius"),
    padding: computeStyle("padding"),
  };
}

export default function Input({ style }: InputProps) {
  return <BaseInput {...getStyle(style)} />;
}
