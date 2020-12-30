import { FetchResult } from "@apollo/client";
import { useState, useEffect } from "react";
import { initializeApollo } from "../../../../lib/apolloClient";
import {
  useUsersQuery,
  UsersDocument,
  LoginDocument,
  LoginMutation,
} from "../../../../graphql/generated";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

export interface CurrentUserProps {
  name: string;
  avatar: string;
  logout: () => void;
}

const CurrentUser = ({ name, avatar, logout }: CurrentUserProps) => (
  <div>
    <h1>{name}</h1>
    <img src={avatar} width={48} height={48} alt="" />
    <button onClick={logout}>logout</button>
  </div>
);

export interface MeProps {
  logout: () => void;
  requestCode: () => void;
  isSignIn: boolean;
}

const Me = ({ logout, requestCode, isSignIn }: MeProps) => {
  const { data, error, loading } = useUsersQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (data?.me != null) {
    return <CurrentUser {...data.me} logout={logout} />;
  }

  return (
    <button onClick={requestCode} disabled={isSignIn}>
      <span>Sign In with Github</span>
    </button>
  );
};

const AuthorizedUser = () => {
  const [githubCode, setGitHubCode] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  const history = useHistory();

  const requestCode = () => {
    const clientID = process.env.REACT_APP_AUTH_CLIENT_ID;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    const client = initializeApollo();
    let data = client.readQuery({ query: UsersDocument });
    data = { ...data, ...{ me: null } };
    client.writeQuery({ query: UsersDocument, data });
  };

  const authUpdate = (
    _cache: unknown,
    mutationResult: FetchResult<
      LoginMutation,
      Record<string, any>,
      Record<any, string>
    >
  ) => {
    if (mutationResult.data?.githubAuth?.token != null) {
      localStorage.setItem("token", mutationResult.data?.githubAuth.token);
    }
    history.replace("/");
    setIsSignIn(false);
  };

  const [login] = useMutation(LoginDocument, {
    variables: { code: githubCode },
    update: authUpdate,
    refetchQueries: [{ query: UsersDocument }],
  });

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      const code = window.location.search.replace("?code=", "");
      setGitHubCode(code);
      if (githubCode != "") {
        login();
        setIsSignIn(true);
      }
    }
  }, [githubCode]);

  return <Me isSignIn={isSignIn} requestCode={requestCode} logout={logout} />;
};

export default AuthorizedUser;
