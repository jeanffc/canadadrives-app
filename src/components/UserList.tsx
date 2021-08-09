import { Box, Table, Tbody, Td, Tr } from "@chakra-ui/react";

import UserItem from "./UserItem";

import { User } from "../interfaces";

type Props = {
  users: User[]
}

export default function UserList({ users }: Props) {
  return (
    <Table variant="striped">
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td m={0} p={0}>
              <UserItem user={user} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
