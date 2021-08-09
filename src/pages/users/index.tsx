import { GetStaticProps } from "next";

import UserList from "../../components/UserList";

import { User } from "../../interfaces";

type Props = {
  users: User[];
}

export default function Users({ users }: Props) {
  return (
    <>
      <h1>Users</h1>
      <div>
        User Search Bar
      </div>
      <div>
        <UserList users={users} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://jsonplaceholder.typicode.com/users');
  const data: User[] = await response.json();

  return {
    props: {
      users: data,
    },
    revalidate: 10,
  }
}