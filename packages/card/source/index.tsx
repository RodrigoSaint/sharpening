import React from "react";
import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import { SpaceDefinition, getSpace } from "@rodrigosaint/space";

interface CardStyle {
  boxShadow?: string;
  background?: string;
  borderRadius?: string;
  padding?: SpaceDefinition;
  margin?: SpaceDefinition;
}

interface CardProps {
  children: any;
  style?: CardStyle;
}

const BaseCard = styled.div<CardStyle>`
  display: inline-block;
  background: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) => props.boxShadow};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

const cardDefaultStyle = {
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.5);",
  background: "white",
  borderRadius: "12px",
};

function getCardStyle(style?: CardStyle): CardStyle {
  const theme = React.useContext(ThemeContext);
  const computeStyle = getComputedStyle(style, theme?.card, cardDefaultStyle);
  return {
    boxShadow: computeStyle("boxShadow"),
    background: computeStyle("background"),
    borderRadius: computeStyle("borderRadius"),
    padding: getSpace(computeStyle("padding")),
    margin: getSpace(computeStyle("margin")),
  };
}

export default function Card({ style, children }: CardProps) {
  return <BaseCard {...getCardStyle(style)}>{children}</BaseCard>;
}
