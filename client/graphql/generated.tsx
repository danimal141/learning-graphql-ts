import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  addFakeUsers: Array<User>;
  createPhoto: Photo;
  githubAuth: AuthPayload;
};

export type MutationAddFakeUsersArgs = {
  count: Scalars["Float"];
};

export type MutationCreatePhotoArgs = {
  photo: PostPhotoInput;
};

export type MutationGithubAuthArgs = {
  code: Scalars["String"];
};

export type Photo = {
  __typename?: "Photo";
  category: Scalars["String"];
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  postedBy: User;
  taggedUsers: Array<User>;
  url: Scalars["String"];
};

export type PostPhotoInput = {
  category?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  allPhotos: Array<Photo>;
  allUsers: Array<User>;
  me?: Maybe<User>;
  totalPhotos: Scalars["Int"];
  totalUsers: Scalars["Int"];
};

export type User = {
  __typename?: "User";
  avatar: Scalars["String"];
  createdAt: Scalars["DateTime"];
  githubLogin: Scalars["ID"];
  inPhotos: Array<Photo>;
  name: Scalars["String"];
  postedPhotos: Array<Photo>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: "Query" } & {
  allUsers: Array<{ __typename?: "User" } & Pick<User, "name" | "avatar">>;
};

export const UsersDocument = gql`
  query Users {
    allUsers {
      name
      avatar
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
