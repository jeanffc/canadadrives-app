import { Box, Breadcrumb, BreadcrumbItem, Flex, Grid, Heading, Spacer, Text } from "@chakra-ui/react";
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
    return <Text>Loading...</Text>;
  }

  if (errors) {
    return <Text>{errors}</Text>;
  }

  return (
    <Flex m={4} direction={"column"}>
      <Breadcrumb separator=">" mb={6}>
        <BreadcrumbItem>
          <Heading color="cyan.500">
            <Link href='/users'><a>Users</a></Link>
          </Heading>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Heading color="black">
            {user.name}
          </Heading>
        </BreadcrumbItem>
      </Breadcrumb>

      <Grid mb={12} templateColumns={{ md: "repeat(3, 1fr)", sm: "repeat(1, 1fr)" }} gap={4}>
        <Box w="100%" p="6" border="1px">
          <Heading as="h4" size="md" mb={2}>Contact Info</Heading>
          <Text>Username: {user.username}</Text>
          <Text>Email: <Text as="span" color="cyan.500">{user.email.toLowerCase()}</Text></Text>
          <Text>Phone: <Text as="span" color="cyan.500">{user.phone}</Text></Text>
          <Text>Website: <Text as="span" color="cyan.500">{user.website}</Text></Text>
        </Box>
        <Box w="100%" p="6" border="1px">
          <Heading as="h4" size="md" mb={2}>Address</Heading>
          <Text>{user.address.suite} {user.address.street}, {user.address.city}, {user.address.zipcode}</Text>
        </Box>
        <Box w="100%" p="6" border="1px">
          <Heading as="h4" size="md" mb={2}>Company</Heading>
          <Text>{user.company.name}</Text>
          <Text>{user.company.bs}</Text>
          <Text><i>&quot;{user.company.catchPhrase}&quot;</i></Text>
        </Box>
      </Grid>

      <Heading mb={6}>Posts by {user.name}</Heading>
      <Grid mb={8} templateColumns={{ md: "repeat(3, 1fr)", sm: "repeat(1, 1fr)" }} gap={4}>
        {posts.map((post) => (
          <Box key={post.id} w="100%" p="6" border="1px">
            <Heading as="h4" size="md" mb={2}>{post.title}</Heading>
            <Text>{post.body}</Text>
          </Box>
        ))}
      </Grid>
    </Flex>

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
    fallback: false
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