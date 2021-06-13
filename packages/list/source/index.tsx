import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { getComputedStyle } from "@rodrigosaint/style-utils";

export type ListType = "horizontal" | "vertical";

export interface ListStyle {
  type?: ListType;
  spacing?: string;
}

export interface ListProps<T> {
  collection: Array<T>;
  render: (item: T) => any;
  getKey: (item: T) => string;
  style?: ListStyle;
}

const ListWrapper = styled.div<{ type?: ListType }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ type }) => (type === "vertical" ? "column" : "row")};
`;

const ListItem = styled.div<{ spacing?: string }>`
  padding: ${({ spacing }) => spacing || "12px"};
`;

const defaultStyle: ListStyle = {
  type: "horizontal",
  spacing: "12px",
};

const getStyle = (style?: ListStyle): ListStyle => {
  const theme = useContext(ThemeContext);
  const computeStyle = getComputedStyle(style, theme?.list, defaultStyle);

  return {
    type: computeStyle("type"),
    spacing: computeStyle("spacing"),
  };
};

export default function List<T>({
  collection,
  render,
  getKey,
  style,
}: ListProps<T>) {
  const { type, spacing } = getStyle(style);
  return (
    <ListWrapper type={type}>
      {collection.map((item) => (
        <ListItem spacing={spacing} key={getKey(item)}>
          {render(item)}
        </ListItem>
      ))}
    </ListWrapper>
  );
}
