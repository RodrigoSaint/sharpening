import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import StackOption from "@rodrigosaint/stack-option";
import Space, { SpaceDefinition } from "@rodrigosaint/space";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import List, { ListStyle, ListProps } from "@rodrigosaint/list";

interface ListSelectionStyle extends ListStyle {
  padding?: SpaceDefinition;
  iconSize?: number;
  iconColor?: string;
}

interface ListSelectionProps<T> extends ListProps<T> {
  style?: ListSelectionStyle;
}

function getStyle(style?: ListSelectionStyle): ListSelectionStyle {
  const theme = React.useContext(ThemeContext);
  const compute = getComputedStyle(style, theme, {
    iconSize: 20,
    iconColor: "#0366d6",
    padding: 2,
  });

  return {
    iconSize: compute("iconSize"),
    iconColor: compute("iconColor"),
    padding: compute("padding"),
  };
}

export default function ListSelection<T>(props: ListSelectionProps<T>) {
  const [selected, setSelected] = React.useState<string>();
  const style = getStyle(props.style);
  console.log(style);
  return (
    <List
      {...props}
      render={(item) => (
        <StackOption
          onClick={() => setSelected(props.getKey(item))}
          position="top-right"
          renderOption={() =>
            selected === props.getKey(item) ? (
              <Space padding={style.padding}>
                <FaCheckCircle color={style.iconColor} size={style.iconSize} />
              </Space>
            ) : null
          }
        >
          {props.render(item)}
        </StackOption>
      )}
    />
  );
}
