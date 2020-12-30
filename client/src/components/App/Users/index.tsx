import "./index.css";

import { useUsersQuery } from "../../../graphql/generated";

const Users = () => {
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
      <h2>Existent user List</h2>
      <ul>
        {data.allUsers?.map((u) => (
          <li key={u.githubLogin}>
            <img width="50px" src={u.avatar} />
            <span>{u.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
