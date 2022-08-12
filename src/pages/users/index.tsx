import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { Box, Flex, Heading, Input, Select, Spacer } from "@chakra-ui/react";

import UserList from "../../components/UserList";

import { sortOptions } from "../../utils";
import { User } from "../../interfaces";

type Props = {
  users: User[];
}

export default function Users({ users }: Props) {
  const [sortValue, setSortValue] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  const filteredResults = searchValue.length > 0
    ? users.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase())).sort((a, b) => a[sortValue] > b[sortValue] ? 1 : -1)
    : users.sort((a, b) => a[sortValue] > b[sortValue] ? 1 : -1);

  const onSearch = e => {
    setSearchValue(e.target.value);
  }

  const onSort = e => {
    setSortValue(e.target.value);
  }

  return (
    <Flex m={4} direction={"column"}>
      <Flex mb={4} direction={{ md: "row", sm: "column" }}>
        <Box>
          <Heading>Users</Heading>
        </Box>
        <Spacer />
        <Flex direction={{ md: "row", sm: "column" }}>
          <Box mr={{ md: 4, sm: 0 }} mb={{ md: 0, sm: 2 }}>
            <label htmlFor="search">Search</label>
            <Input
              id="search"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={onSearch} />
          </Box>
          <Box>
            <label htmlFor="sort">Sort By</label>
            <Select
              id="sort"
              value={sortValue}
              onChange={onSort}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <UserList users={filteredResults} />
      </Box>
    </Flex>
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
