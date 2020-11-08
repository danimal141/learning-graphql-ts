import {
  MutationResolvers,
  Photo,
  QueryResolvers,
  PhotoResolvers,
  Resolvers
} from '../gen/graphql-resolver-types'

let _id = 0
let photos: Photo[] = []

const Query: QueryResolvers =  {
  totalPhotos: () => photos.length,
  allPhotos: () => photos
}

const Mutation: MutationResolvers = {
  postPhoto(_: any, args: Photo) {
    let newPhoto = {
      id: _id++,
      ...args
    }
    photos.push(newPhoto)
    return newPhoto
  }
}

const Photo: PhotoResolvers = {
  url: root => `http://example.com/img/${root.id}.jpg`
}

const resolvers: Resolvers = {
  Query,
  Mutation,
  Photo,
}

export default resolvers
