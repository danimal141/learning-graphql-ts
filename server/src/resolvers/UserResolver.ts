import { Resolver, Query, Mutation, Arg, Ctx, Int } from "type-graphql";
import { AuthContext } from "../index";
import User from "../entities/User";
import { buildFakeUsers } from "../lib/buildFakerUsers";
import { getManager } from "typeorm";

@Resolver(User)
export default class UserResolver {
  @Query((_returns) => User, { nullable: true })
  async me(@Ctx() ctx: AuthContext): Promise<User | null> {
    return ctx.currentUser;
  }

  @Query((_returns) => Int)
  async totalUsers(): Promise<number> {
    return await User.count();
  }

  // It may create a crazy query
  @Query((_returns) => [User])
  async allUsers(): Promise<User[]> {
    return await User.find();
  }

  @Mutation((_returns) => [User])
  async addFakeUsers(@Arg("count") count: number = 1): Promise<User[]> {
    const resp = await buildFakeUsers(count);
    const users = resp.map((res) => {
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
  }
}
