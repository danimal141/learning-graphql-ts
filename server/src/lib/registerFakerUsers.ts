import fetch from "node-fetch";

import { getManager } from "typeorm";

import User from "../entities/User";

export interface FakerUserResponse {
  login: FakerUserLogin;
  name: FakerUserName;
  picture: FakerUserPicture;
}

export interface FakerUserLogin {
  username: string;
  sha1: string;
}

export interface FakerUserName {
  first: string;
  last: string;
}

export interface FakerUserPicture {
  thumbnail: string;
}

export const registerFakeUsers = async (count: number = 1): Promise<User[]> => {
  const api = `https://randomuser.me/api/?results=${count}`;
  const { results } = await fetch(api).then((res) => res.json());
  console.log(results);
  const users = (results as FakerUserResponse[]).map((res) => {
    const u = new User();
    u.githubLogin = res.login.username;
    u.name = `${res.name.first} ${res.name.last}`;
    u.avatar = res.picture.thumbnail;
    u.githubToken = res.login.sha1;
    return u;
  });

  await getManager().transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.save(users);
  });

  return users;
};
