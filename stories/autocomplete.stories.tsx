import React from "react";
import { Meta } from "@storybook/react";

import Autocomplete from "../packages/autocomplete/source";

export default {
  title: "Autocomplete",
  component: Autocomplete,
} as Meta;

export const DefaultAutocomplete = () => {
  const [selected, setSelected] = React.useState<string>();
  return (
    <Autocomplete
      selected={selected}
      onSelected={setSelected}
      filter={(item, filter) => item.includes(filter)}
      collection={["teste 1", "teste 2", "teste 3"]}
      render={(item) => <div>{item.toUpperCase()}</div>}
      getKey={(item) => item}
    />
  );
};
