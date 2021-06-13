import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import StackOption from "@rodrigosaint/stack-option";
import Space, { SpaceDefinition } from "@rodrigosaint/space";
import { getComputedStyle } from "@rodrigosaint/style-utils";
import List, { ListStyle, ListProps } from "@rodrigosaint/list";

export interface ListSelectionStyle extends ListStyle {
  padding?: SpaceDefinition;
  iconSize?: number;
  iconColor?: string;
}

export interface ListSelectionProps<T> extends ListProps<T> {
  style?: ListSelectionStyle;
  selected?: string;
  onSelected: (selected: string) => void;
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
  const [selected, setSelected] = React.useState<string>(props.selected);
  const style = getStyle(props.style);

  const select = React.useCallback(
    (item: string) => {
      setSelected(item);
      props.onSelected(item);
    },
    [props.onSelected]
  );

  return (
    <List
      {...props}
      render={(item) => (
        <div onClick={() => select(props.getKey(item))}>
          <StackOption
            position="top-right"
            renderOption={() =>
              selected === props.getKey(item) ? (
                <Space padding={style.padding}>
                  <FaCheckCircle
                    color={style.iconColor}
                    size={style.iconSize}
                  />
                </Space>
              ) : null
            }
          >
            {props.render(item)}
          </StackOption>
        </div>
      )}
    />
  );
}
