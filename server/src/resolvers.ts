import { ulid } from 'ulid'
import { DateTimeResolver as DateTime } from 'graphql-scalars'
import {
  Photo,
  MutationResolvers,
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
      created: new Date(),
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
  DateTime,
}

export default resolvers
