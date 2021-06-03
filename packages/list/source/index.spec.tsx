import React from "react";
import { render, screen } from "@testing-library/react";

import List from "./index";

describe("List", () => {
  const collection = ["test 1", "test 2"];
  beforeAll(() => {
    render(
      <List
        collection={collection}
        getKey={(r) => r}
        render={(item) => <div>{item}</div>}
      />
    );
  });
  it("renders items correctly", async () => {
    for (const item of collection)
      expect(await screen.findAllByText(item)).not.toBeNull();
  });
});
