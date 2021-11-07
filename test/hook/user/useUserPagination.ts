import { useCallback } from "react";
import { Page } from "@rodrigosaint/pagination";
import { queryGraphql } from "@rodrigosaint/graphql";

import { User } from "entity/user";

const USER_PAGINATION_QUERY = `
  query ($page: Int!) {
    userPagination(page: $page) {
      currentPage
      pageCount
      collection {
        name
        email
        age
      }
    }
  }
`;

export default function useUserPagination() {
  const query = useCallback(
    (page: number) =>
      queryGraphql < Page < User >> (USER_PAGINATION_QUERY, { page }),
    []
  );
  return { query };
}
