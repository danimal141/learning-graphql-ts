import { Resolver, Arg, Ctx, Mutation } from "type-graphql";
import { Context } from "apollo-server-core";
import AuthPayload from "../entities/AuthPayload";
import User from "../entities/User";

import { authorizeWithGitHub } from "../lib/github";

@Resolver(AuthPayload)
export default class AuthPayloadResolver {
  @Mutation((_returns) => AuthPayload)
  // Can get a valid `code` via GET: https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user
  // The OAuth app should be set as redirecting to `http://localhost:3000/?code=xxx` for the client side
  // Check `Authorization callback URL` on the setting page
  async githubAuth(
    @Arg("code") code: string,
    @Ctx() _ctx: Context
  ): Promise<AuthPayload> {
    const { access_token, avatar_url, login, name } = await authorizeWithGitHub(
      {
        client_id: process.env.GITHUB_APP_CLIENT_ID,
        client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
        code,
      }
    );
    const user = (await User.findOne({ githubLogin: login })) || new User();
    user.githubLogin = login;
    user.name = name;
    user.avatar = avatar_url;
    user.githubToken = access_token;
    await user.save();
    return { user, token: access_token };
  }
}
