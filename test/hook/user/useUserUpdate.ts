import { User, userSchema } from "entity/user";
import { useSimpleForm } from "@rodrigosaint/form";
import { useMutation } from "@rodrigosaint/graphql";

const USER_UPDATE_MUTATION = `
  mutation ($user: UserInput!){
    userUpdate(user: $user) {
      _id
    }
  }`;

export default function useUserUpdate() {
  const form = useSimpleForm < User > userSchema;
  const userUpdate =
    useMutation < { user: User } > ("user", USER_UPDATE_MUTATION);

  return {
    onSubmit: form.handleSubmit((user) => userUpdate({ user })),
    form,
  };
}
