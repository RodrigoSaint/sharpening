import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import React, { InputHTMLAttributes, useContext, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  style?: InputStyle;
}

interface InputStyle {
  border?: string;
  borderFocus?: string;
  borderRadius?: string;
  padding?: string;
}

const BaseInput = styled.input<InputStyle>`
  outline: none;
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border: ${(props) => props.borderFocus};
  }
`;

const defaultStyle: InputStyle = {
  border: "1px solid lightgray",
  borderFocus: "1px solid gray",
  borderRadius: "10px",
  padding: "8px 12px",
};

function getStyle(style?: InputStyle): InputStyle {
  const theme = useContext<{ input: InputStyle }>(ThemeContext);
  const computeStyle = getComputedStyle(style, theme?.input, defaultStyle);

  return {
    border: computeStyle("border"),
    borderFocus: computeStyle("borderFocus"),
    borderRadius: computeStyle("borderRadius"),
    padding: computeStyle("padding"),
  };
}

const Input = forwardRef(
  ({ style, ...props }: InputProps, ref: React.Ref<HTMLInputElement>) => (
    <BaseInput {...getStyle(style)} {...props} ref={ref} />
  )
);

export default Input;
