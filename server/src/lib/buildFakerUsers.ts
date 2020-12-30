import fetch from "node-fetch";

export interface FakeUserResponse {
  login: FakeUserLogin;
  name: FakeUserName;
  picture: FakeUserPicture;
}

export interface FakeUserLogin {
  username: string;
  sha1: string;
}

export interface FakeUserName {
  first: string;
  last: string;
}

export interface FakeUserPicture {
  thumbnail: string;
}

export const buildFakeUsers = async (
  count: number = 1
): Promise<FakeUserResponse[]> => {
  const api = `https://randomuser.me/api/?results=${count}`;
  const resp = await fetch(api);
  const { results } = await resp.json();
  return results;
};
