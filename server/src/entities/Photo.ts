import {
  Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn,
  ManyToOne, ManyToMany
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import User from './User'

export enum PhotoCategory {
  Selfie = 'SELFIE',
  Portrait = 'PORTRAIT',
  Action = 'ACTION',
  Landscape = 'LANDSCAPE',
  Graphic = 'GRAPHIC'
}

@Entity()
@ObjectType()
export default class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(_type => ID)
  public readonly id: number

  @Column()
  @Field()
  public name: string

  @Column({ nullable: true })
  @Field()
  public url: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  public description?: string

  @Column()
  @Field()
  public category: PhotoCategory

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  public readonly createdAt: Date

  @ManyToOne(_type => User, user => user.postedPhotos)
  @Field(_type => User)
  public postedBy: User

  @ManyToMany(_type => User, user => user.inPhotos)
  @Field(_type => [User])
  public taggedUsers: User[]
}
