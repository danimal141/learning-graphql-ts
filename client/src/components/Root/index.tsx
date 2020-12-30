import React from "react";
import Users from "../Users";
import AuthorizedUser from "../AuthorizedUser";
import { useUsersQuery } from "../../graphql/generated";

const Root = () => {
  const { data, error, loading } = useUsersQuery();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (data?.allUsers == null) {
    return null;
  }

  return (
    <>
      <AuthorizedUser me={data.me} />
      <hr />
      <Users users={data.allUsers} />
    </>
  );
};

export default Root;
