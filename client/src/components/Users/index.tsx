import "./index.css";

import { UserInfoFragment } from "../../graphql/generated";

export interface UsersProps {
  users: UserInfoFragment[];
}

const Users = ({ users }: UsersProps) => {
  return (
    <>
      <h2>Existent user List</h2>
      <ul>
        {users.map((u) => (
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
