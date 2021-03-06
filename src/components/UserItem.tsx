import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { User } from '../interfaces';

type Props = {
  user: User
}

export default function UserItem({ user }: Props) {
  return (
    <Link href='/users/[id]' as={`/users/${user.id}`}>
      <a>
        <Flex alignItems="center" p={8} >
          <Box mr={4}>
            <Avatar />
          </Box>
          <Box>
            <Text>{user.name}</Text>
            <Text>{user.username.toLowerCase()}</Text>
          </Box>
          <Spacer />
          <Box>
            <Text color="cyan.500">

              {user.email.toLowerCase()}
            </Text>
          </Box>
        </Flex>
      </a>
    </Link>
  )
}

