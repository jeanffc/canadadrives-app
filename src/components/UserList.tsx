import UserItem from "./UserItem";
import { User } from "../interfaces";

type Props = {
  users: User[]
}

export default function UserList({ users }: Props) {
  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
