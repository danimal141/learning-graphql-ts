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
  category: PhotoCategory;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  postedBy: User;
  taggedUsers: Array<User>;
  url: Scalars["String"];
};

export enum PhotoCategory {
  Action = "Action",
  Graphic = "Graphic",
  Landscape = "Landscape",
  Portrait = "Portrait",
  Selfie = "Selfie",
}

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

export type LoginMutationVariables = Exact<{
  code: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  githubAuth: { __typename?: "AuthPayload" } & Pick<AuthPayload, "token">;
};

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "githubLogin" | "name" | "avatar"
>;

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: "Query" } & {
  allUsers: Array<{ __typename?: "User" } & UserInfoFragment>;
  me?: Maybe<{ __typename?: "User" } & UserInfoFragment>;
};

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    githubLogin
    name
    avatar
  }
`;
export const LoginDocument = gql`
  mutation Login($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UsersDocument = gql`
  query Users {
    allUsers {
      ...UserInfo
    }
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
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
