import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Photo from "./Photo";

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @PrimaryColumn()
  @Field((_type) => ID)
  public githubLogin: string;

  @Column()
  @Field()
  public name: string;

  @Column()
  @Field()
  public avatar: string;

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  public readonly createdAt: Date;

  @Column()
  public githubToken: string;

  @OneToMany((_type) => Photo, (photo) => photo.postedBy)
  @Field((_type) => [Photo])
  postedPhotos: Photo[];

  @ManyToMany((_type) => Photo, (photo) => photo.taggedUsers)
  @Field((_type) => [Photo])
  inPhotos: Photo[];
}
