import React from "react";
import { Meta } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import Field from "../packages/field/source";

export default {
  title: "Field",
  component: Field,
} as Meta;

export const DefaultField = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <Field name="name" />
    </FormProvider>
  );
};
