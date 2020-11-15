import { Resolver, Query, Int, Arg, Ctx, Mutation, FieldResolver, Root } from 'type-graphql'
import { Context } from 'apollo-server-core'
import Photo from '../entities/Photo'
import PostPhotoInput from './types/PostPhotoInput'

@Resolver(Photo)
export default class PhotoResolver {
  @FieldResolver()
  url(@Root() photo: Photo): string {
    return `http://example.com/img/${photo.id}.jpg`
  }

  @Query(_returns => Int)
  async totalPhotos(): Promise<number> {
    return await Photo.count()
  }

  @Query(_returns => [Photo])
  async allPhotos(): Promise<Photo[]> {
    return await Photo.find()
  }

  @Mutation(_returns => Photo)
  async createPhoto(@Arg('photo') input: PostPhotoInput, @Ctx() _ctx: Context): Promise<Photo> {
    const photo = Photo.create(input)
    return await photo.save()
  }
}
