import React from "react";
import Input from "@rodrigosaint/input";
import Button from "@rodrigosaint/button";
import { Label } from "@rodrigosaint/text-essentials";
import {
  ManagedPagination,
  ManagedPaginationProps,
} from "@rodrigosaint/pagination";

export interface ImageSelectionModalContentProps<T>
  extends Omit<ManagedPaginationProps<T>, "render"> {
  onSelected: (item: T) => any;
  render: (item: T, onSelected: (item: T) => any) => React.ReactElement;
  close: () => void;
}

const style = {
  div: {
    display: "flex",
  },
  input: {
    borderRadius: "10px 0 0 10px",
  },
  button: {
    borderRadius: "0 10px 10px 0",
  },
};

export default function ImageSelectionModalContent<T>({
  onSelected,
  close,
  ...props
}: ImageSelectionModalContentProps<T>) {
  const render = React.useCallback(
    (item: T) =>
      props.render(item, () => {
        onSelected(item);
        close();
      }),
    [props.render, onSelected, close]
  );

  return (
    <div>
      <Label>Search image</Label>
      <div style={style.div}>
        <Input style={style.input} />
        <Button style={style.button}>Search</Button>
      </div>
      <ManagedPagination
        {...props}
        query={props.query}
        getKey={props.getKey}
        render={render}
      />
    </div>
  );
}
