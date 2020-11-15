import {
  Entity, PrimaryGeneratedColumn, BaseEntity, Column,
  CreateDateColumn, OneToMany, ManyToMany
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import Photo from './Photo'

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(_type => ID)
  public readonly githubLogin: string;

  @Column()
  @Field()
  public name: string

  @Column()
  public avator: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  public readonly createdAt: Date

  @OneToMany(_type => Photo, photo => photo.postedBy)
  @Field(_type => [Photo])
  postedPhotos: Photo[]

  @ManyToMany(_type => Photo, photo => photo.taggedUsers)
  @Field(_type => [Photo])
  inPhotos: Photo[]
}
