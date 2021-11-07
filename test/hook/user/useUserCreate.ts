import { User, userSchema } from "entity/user";
import { useSimpleForm } from "@rodrigosaint/form";
import { useMutation } from "@rodrigosaint/graphql";

const USER_CREATE_MUTATION = `
  mutation ($user: UserInput!){
    userCreate(user: $user) {
      _id
    }
  }`;

export default function useUserCreate() {
  const form = useSimpleForm < User > userSchema;
  const userCreate =
    useMutation < { user: User } > ("user", USER_CREATE_MUTATION);

  return {
    onSubmit: form.handleSubmit((user) => userCreate({ user })),
    form,
  };
}
