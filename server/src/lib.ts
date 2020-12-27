import fetch from 'node-fetch'

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token'
const GITHUB_USER_ACCOUNT_URL = 'https://api.github.com/user'

export interface GitHubCredentials {
  client_id: string
  client_secret: string
  code: string
}

export interface GitHubAuthResponse {
  access_token: string
}

export interface GitHubUserResponse {
  avatar_url: string
  login:  string
  name: string
}

export type AuthPayloadParams = GitHubUserResponse & GitHubAuthResponse

export interface GitHubAuthError {
  error: string
  error_description: string
  error_uri: string
}

export interface GitHubError {
  message: string
  documentation_url: string
}

const isError = (result: GitHubUserResponse | GitHubError): result is GitHubError => {
  return (result as GitHubError).message != null
}

const isAuthError = (result: GitHubAuthResponse | GitHubAuthError): result is GitHubAuthError => {
  return (result as GitHubAuthError).error != null
}

const requestGitHubToken = async (credentials: GitHubCredentials): Promise<GitHubAuthResponse> => {
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(credentials)
  }
  const resp = await fetch(GITHUB_AUTH_URL, requestParams)
  const result =  await resp.json()
  if (isAuthError(result)) {
    throw new Error(JSON.stringify(result))
  } else {
    return result
  }
}

const requestGitHubUser = async (token: string): Promise<GitHubUserResponse> => {
  const requestParams = {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  const resp = await fetch(GITHUB_USER_ACCOUNT_URL, requestParams)
  const result = await resp.json()
  if (isError(result)) {
    throw new Error(JSON.stringify(result))
  } else {
    return result
  }
}

export const authorizeWithGitHub = async (credentials: GitHubCredentials): Promise<AuthPayloadParams> => {
  const { access_token } = await requestGitHubToken(credentials)
  const user = await requestGitHubUser(access_token)
  return { ...user, access_token }
}
