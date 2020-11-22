import { Resolver, Query, Ctx } from 'type-graphql'
import { AppContext } from '../index'
import User from '../entities/User'

@Resolver(User)
export default class UserResolver {
  @Query(_returns => User, { nullable: true })
  async me(@Ctx() ctx: AppContext): Promise<User | null> {
    return ctx.currentUser
  }
}
