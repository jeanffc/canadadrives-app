import { useEffect, useState } from "react";
import { GetStaticProps } from "next";

import UserList from "../../components/UserList";

import { sortOptions } from "../../utils";
import { User } from "../../interfaces";

type Props = {
  users: User[];
}

export default function Users({ users }: Props) {
  const [sortValue, setSortValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(users);

  const onSearch = e => {
    setSearchValue(e.target.value);
  }

  const onSort = e => {
    setSortValue(e.target.value);
  }

  useEffect(() => {
    const results = users.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
    setSearchResults(results);
  }, [searchValue])

  useEffect(() => {
    // TO-DO
  }, [sortValue])

  return (
    <>
      <h1>Users</h1>
      <div>
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={onSearch} />
        </div>
        <div>
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            value={sortValue}
            onChange={onSort}
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

      </div>
      <div>
        <UserList users={searchResults} />
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