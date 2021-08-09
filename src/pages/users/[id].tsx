import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Link from 'next/link';

import { Post, User } from "../../interfaces";

type Props = {
  user?: User,
  posts?: Post[],
  errors?: string,
}

export default function StaticUser({ user, posts, errors }: Props) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  if (errors) {
    return <p>{errors}</p>;
  }

  return (
    <>
      <div>
        <Link href='/users'><a>Users</a></Link> > {user.name}
      </div>
      {/* User */}
      <div>
        <h4>Contact Info</h4>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
      </div>
      <div>
        <h4>Address</h4>
        <p>{user.address.suite} {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
      </div>
      <div>
        <h4>Company</h4>
        <p>{user.company.name}</p>
        <p>{user.company.bs}</p>
        <p><i>"{user.company.catchPhrase}"</i></p>
      </div>
      {/* Posts */}
      <h4>Posts by {user.name}</h4>
      {posts.map((post) => (
        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </>

  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://jsonplaceholder.typicode.com/users');
  const data: User[] = await response.json();

  const paths = data.map((user) => ({
    params: { id: user.id.toString() },
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id

    const res = await fetch(`http://jsonplaceholder.typicode.com/users/${id}`);
    const user: User = await res.json();

    const res1 = await fetch(`http://jsonplaceholder.typicode.com/posts?userId=${id}`);
    const posts: Post = await res1.json();

    return {
      props: {
        user,
        posts,
      },
      revalidate: 10,
    }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}