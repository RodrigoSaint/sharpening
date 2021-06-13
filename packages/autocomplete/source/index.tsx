import React from "react";
import Input from "@rodrigosaint/input";
import StackOption from "@rodrigosaint/stack-option";
import ListSelection, {
  ListSelectionProps,
} from "@rodrigosaint/list-selection";

interface AutocompleteProps<T> extends ListSelectionProps<T> {
  filter: (item: T, text: string) => boolean;
  selected: string;
  onSelected: (selected: string) => void;
}

export default function Autocomplete<T>({
  collection,
  filter,
  ...props
}: AutocompleteProps<T>) {
  const [text, setText] = React.useState("");

  const filteredCollection = React.useMemo(
    () => collection.filter((item) => filter(item, text)),
    [collection, filter, text]
  );

  return (
    <StackOption
      style={{ width: "100%" }}
      position="top-left"
      optionStyle={{
        marginTop: "33px",
        full: true,
      }}
      renderOption={() => (
        <ListSelection
          {...props}
          collection={filteredCollection}
          style={{ ...props.style, type: "vertical" }}
        />
      )}
    >
      <Input value={text} onChange={(event) => setText(event.target.value)} />
    </StackOption>
  );
}
