import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps<FormType> {
  form: UseFormReturn<FormType>;
  onSubmit: () => Promise<any>;
  children: any;
}

export default function Form<Type>({
  form,
  onSubmit,
  children,
}: FormProps<Type>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}
