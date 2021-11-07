import Card from "@rodrigosaint/card";

import { User } from "entity/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      {user.name}
      {user.email}
      {user.age}
    </Card>
  );
}
