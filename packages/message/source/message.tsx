import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import { Text, Paragraph } from "@rodrigosaint/text-essentials";

export interface MessageProps {
  header: string;
  description: string | React.ReactElement;
  style?: MessageStyle;
}

export interface MessageStyle {
  borderRadius?: string;
  border?: string;
  background?: string;
  padding?: string;
  color?: string;
}

const BaseMessage = styled.div<MessageStyle>`
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
`;

const defaultMessageStyle: MessageStyle = {
  borderRadius: "10px",
  border: "1px solid royalblue",
  background: "lightblue",
  padding: "8px 12px",
  color: "black",
};

function getStyle(style?: MessageStyle): MessageStyle {
  const theme = useContext(ThemeContext);
  const computeStyle = getComputedStyle(
    style,
    theme?.message,
    defaultMessageStyle
  );

  return {
    borderRadius: computeStyle("borderRadius"),
    border: computeStyle("border"),
    background: computeStyle("background"),
    padding: computeStyle("padding"),
    color: computeStyle("color"),
  };
}

export default function Message({ header, description, style }: MessageProps) {
  const isHeaderString = typeof header === "string";
  const computedStyle = getStyle(style);
  return (
    <BaseMessage {...computedStyle}>
      {isHeaderString && (
        <Text style={{ fontWeight: "bold", color: computedStyle.color }}>
          {header}
        </Text>
      )}
      {!isHeaderString && header}
      <Paragraph style={{ color: computedStyle.color }}>
        {description}
      </Paragraph>
    </BaseMessage>
  );
}
