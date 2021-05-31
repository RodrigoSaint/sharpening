import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

export type ListType = "horizontal" | "vertical";

export interface ListStyle {
  type?: ListType;
  spacing?: string;
}

interface ListProps<T> {
  collection: Array<T>;
  render: (item: T) => any;
  getKey: (item: T) => string;
  style?: ListStyle;
}

const ListWrapper = styled.div<{ type?: ListType }>`
  display: flex;
  flex-direction: ${({ type }) => (type === "vertical" ? "column" : "row")};
`;

const ListItem = styled.div<{ spacing?: string }>`
  padding: ${({ spacing }) => spacing || "12px"};
`;

const getStyle = (style?: ListStyle): ListStyle => {
  const themeContext = useContext(ThemeContext);

  return {
    type: style?.type,
    spacing: themeContext?.list?.spacing || style?.spacing,
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
