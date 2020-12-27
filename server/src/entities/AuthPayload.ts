import { ObjectType, Field } from "type-graphql";
import User from "./User";

@ObjectType()
export default class AuthPayload {
  @Field()
  public token: string;

  @Field()
  public user: User;
}
