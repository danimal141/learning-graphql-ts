import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import User from "./User";
import { PhotoCategory } from "./PhotoCategory";

@Entity()
@ObjectType()
export default class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => ID)
  public readonly id: number;

  @Column()
  @Field()
  public name: string;

  @Column()
  public userId: string;

  @Column({ nullable: true })
  @Field()
  public url: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public description?: string;

  @Column()
  @Field((_type) => PhotoCategory)
  public category: PhotoCategory;

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  public readonly createdAt: Date;

  @Index()
  @ManyToOne((_type) => User, (user) => user.postedPhotos)
  @JoinColumn({ name: "userId" })
  @Field((_type) => User)
  public postedBy: User;

  @ManyToMany((_type) => User, (user) => user.inPhotos)
  @Field((_type) => [User])
  public taggedUsers: User[];
}
