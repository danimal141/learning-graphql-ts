import React from "react";
import { User, UsersDocument, UsersQuery } from "../../../graphql/generated";

const Users = () => {
  const { data, error, loading } = useUsersQuery();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {data.allUsers.map((u: User) => (
        <li key={u.name}>
          <img src={u.avatar} />
          <span>u.name</span>
        </li>
      ))}
    </ul>
  );
};

export default Users;
