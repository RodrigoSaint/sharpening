import React from "react";
import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

import Field from "./index";

const FieldWithProviders = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <Field name="name" />
    </FormProvider>
  );
};

describe("Field", () => {
  beforeAll(() => {
    render(<FieldWithProviders />);
  });
  it("renders items correctly", async () => {
    expect(await screen.findAllByText("name")).not.toBeNull();
  });
});
