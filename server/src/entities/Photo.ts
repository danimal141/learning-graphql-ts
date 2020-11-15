import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

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
  @Field({ nullable: true })
  public description?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  public url?: string

  @Column()
  @Field()
  public category: PhotoCategory

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  public readonly createdAt: Date
}
