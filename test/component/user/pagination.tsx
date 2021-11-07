import { User } from "entity/user";
import { ManagedPagination, Page } from "@rodrigosaint/pagination";

import UserCard from "component/user/card";

interface UserPaginationProps {
  query: (pageNumber: Number) => Promise<Page<User>>;
}

export default function UserPagination({ query }: UserPaginationProps) {
  return (
    <ManagedPagination
      query={query}
      render={(user) => <UserCard user={user} />}
      getKey={(user) => user._id}
      renderSkeleton={() => <UserCard />}
    />
  );
}
