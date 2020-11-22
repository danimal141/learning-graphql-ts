import { Resolver, Query, Int, Arg, Ctx, Mutation, FieldResolver, Root } from 'type-graphql'
import { AuthContext } from '../index'
import Photo from '../entities/Photo'
import User from '../entities/User'
import PostPhotoInput from './types/PostPhotoInput'

@Resolver(Photo)
export default class PhotoResolver {
  @FieldResolver()
  url(@Root() photo: Photo): string {
    return `http://example.com/img/${photo.id}.jpg`
  }

  @FieldResolver()
  async postedBy(@Root() photo: Photo): Promise<User> {
    return await User.findOne({ githubLogin: photo.userId })
  }

  @Query(_returns => Int)
  async totalPhotos(): Promise<number> {
    return await Photo.count()
  }

  // It may create a crazy query
  @Query(_returns => [Photo])
  async allPhotos(): Promise<Photo[]> {
    return await Photo.find()
  }

  @Mutation(_returns => Photo)
  async createPhoto(@Arg('photo') input: PostPhotoInput, @Ctx() ctx: AuthContext): Promise<Photo> {
    if (ctx.currentUser == null) { throw new Error('only an authorized use can post a photo!') }
    const photo = Photo.create(input)
    photo.postedBy = ctx.currentUser
    console.log(photo)
    return await photo.save()
  }
}
