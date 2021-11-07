import { useCallback } from "react";
import { useQuery } from "@rodrigosaint/graphql";

import { User } from "entity/user";

const USER_LIST_QUERY = `
  query {
    userCollection {
        name
        email
        age
    }
  }
`;

type UserList = User[];

export default function useUserList() {
  return (
    useQuery < {}, { userCollection: UserList } > ("user", USER_LIST_QUERY, {})
  );
}
