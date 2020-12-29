import { useUsersQuery } from "../../../graphql/generated";
import "./index.css";

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
    <ul>
      {data.allUsers.map((u) => (
        <li key={u.name}>
          <img width="50px" src={u.avatar} />
          <span>{u.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Users;
