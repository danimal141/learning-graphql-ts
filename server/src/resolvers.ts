import { ulid } from 'ulid'
import {
  MutationResolvers,
  Photo,
  QueryResolvers,
  PhotoResolvers,
  Resolvers
} from '../gen/graphql-resolver-types'

let photos: Photo[] = []

const Query: QueryResolvers =  {
  totalPhotos: () => photos.length,
  allPhotos: () => photos
}

const Mutation: MutationResolvers = {
  postPhoto(_parent, args) {
    const newPhoto = {
      id: ulid(),
      ...args.input
    }
    photos.push(newPhoto)
    return newPhoto
  }
}

const Photo: PhotoResolvers = {
  url: (parent) => `http://example.com/img/${parent.id}.jpg`
}

const resolvers: Resolvers = {
  Query,
  Mutation,
  Photo,
}

export default resolvers
