import {
  MutationResolvers,
  Photo,
  QueryResolvers,
  Resolvers
} from '../gen/graphql-resolver-types'

let _id = 0
let photos: Photo[] = []

const Query: QueryResolvers =  {
  totalPhotos: () => photos.length
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

const resolvers: Resolvers = {
  Query,
  Mutation,
}

export default resolvers
