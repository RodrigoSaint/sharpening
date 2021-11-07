import Form from "@rodrigosaint/form";
import Field from "@rodrigosaint/field";
import Button from "@rodrigosaint/button";
import { UseFormReturn } from "react-hook-form";

import { User } from "entity/user";

interface UserFormProps {
  form: UseFormReturn<User>;
  onSubmit: () => Promise<any>;
}

export default function UserForm(props: UserFormProps) {
  return (
    <Form {...props}>
      <Field name="name" />
      <Field name="email" />
      <Field name="age" />
      <Button type="submit">submit</Button>
    </Form>
  );
}
