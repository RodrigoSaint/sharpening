import React from "react";
import styled from "styled-components";

type ListType = "horizontal" | "vertical";

interface ListStyle {
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

export default function List<T>({
  collection,
  render,
  getKey,
  style,
}: ListProps<T>) {
  return (
    <ListWrapper type={style?.type}>
      {collection.map((item) => (
        <ListItem spacing={style?.spacing} key={getKey(item)}>
          {render(item)}
        </ListItem>
      ))}
    </ListWrapper>
  );
}
