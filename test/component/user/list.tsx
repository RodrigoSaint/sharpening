import { User } from "entity/user";
import List from "@rodrigosaint/list";

import UserCard from "component/user/card";

interface UserListProps {
  collection: User[];
}

export default function UserList({ collection }: UserListProps) {
  return (
    <List
      collection={collection}
      render={(user) => <UserCard user={user} />}
      getKey={(user) => user._id}
    />
  );
}
