import { Resolver, Query, Ctx, Int } from "type-graphql";
import { AuthContext } from "../index";
import User from "../entities/User";

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
}
