import React from "react";
import Input from "@rodrigosaint/input";
import Button from "@rodrigosaint/button";
import {
  ManagedPagination,
  ManagedPaginationProps,
  Page,
} from "@rodrigosaint/pagination";

export interface ImageSelectionModalContentProps<T>
  extends Omit<ManagedPaginationProps<T>, "render" | "query"> {
  onSelected: (item: T) => any;
  render: (item: T, onSelected: (item: T) => any) => React.ReactNode;
  close: () => void;
  query: (text: string, pageNumber: Number) => Promise<Page<T>>;
  searchButtonContent: string | React.ReactNode;
  searchLabel: string | React.ReactNode;
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
    boxShadow: "none",
  },
};

export default function ImageSelectionModalContent<T>({
  onSelected,
  close,
  query: baseQuery,
  ...props
}: ImageSelectionModalContentProps<T>) {
  const [text, setText] = React.useState<string>();
  const inputRef = React.useRef<HTMLInputElement>();

  const render = React.useCallback(
    (item: T) =>
      props.render(item, () => {
        onSelected(item);
        close();
      }),
    [props.render, onSelected, close]
  );

  const onSearch = React.useCallback(() => setText(inputRef.current.value), [
    inputRef,
  ]);

  const query = React.useCallback(
    (pageNumber: Number) => baseQuery(text, pageNumber),
    [baseQuery, text]
  );

  return (
    <div>
      {props.searchLabel}
      <div style={style.div}>
        <Input ref={inputRef} style={style.input} />
        <Button style={style.button} onClick={onSearch}>
          {props.searchButtonContent}
        </Button>
      </div>
      {text && (
        <ManagedPagination
          {...props}
          query={query}
          getKey={props.getKey}
          render={render}
        />
      )}
    </div>
  );
}
