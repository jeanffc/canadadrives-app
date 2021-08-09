import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { User } from '../interfaces';

type Props = {
  user: User
}

export default function UserItem({ user }: Props) {
  return (
    <Flex alignItems="center" p={8} >
      <Box mr={4}>
        <Avatar />
      </Box>
      <Box>
        <Text>{user.name}</Text>
        <Text>{user.username}</Text>
      </Box>
      <Spacer />
      <Box>
        <Link href='/users/[id]' as={`/users/${user.id}`}>
          <a style={{ color: "rgb(51, 189, 221)" }}>{user.email.toLowerCase()}</a>
        </Link>
      </Box>
    </Flex>
  )
}

