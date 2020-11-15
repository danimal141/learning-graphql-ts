import { InputType, Field } from 'type-graphql'
import { PhotoCategory } from '../../entities/Photo'

@InputType()
export default class PostPhotoInput {
  @Field()
  public name: string

  @Field({ nullable: true })
  public description?: string

  @Field({ defaultValue: PhotoCategory.Portrait })
  public category: PhotoCategory
}
