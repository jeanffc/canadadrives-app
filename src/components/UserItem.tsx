import Link from 'next/link';

import { User } from '../interfaces';

type Props = {
  user: User
}

export default function UserItem({ user }: Props) {
  return (
    <div>
      <div>avatar</div>
      <div>
        {user.name}
        {user.username}
      </div>
      <Link href='/users/[id]' as={`/users/${user.id}`}>
        <a>{user.email}</a>
      </Link>
    </div>
  )
}
