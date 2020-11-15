import { Resolver, Query, Int, Arg, Ctx, Mutation } from 'type-graphql'
import { Context } from 'apollo-server-core'
import Photo from '../entities/Photo'
import PostPhotoInput from './types/PostPhotoInput'

@Resolver(Photo)
export default class PhotoResolver {
  @Query(_returns => Int)
  async totalPhotos() {
    return await Photo.count()
  }

  @Query(_returns => [Photo])
  async allPhotos() {
    return await Photo.find()
  }

  @Mutation(_returns => Photo)
  async createPhoto(@Arg("photo") input: PostPhotoInput, @Ctx() _ctx: Context) {
    const photo = Photo.create(input)
    return await photo.save()
  }
}
