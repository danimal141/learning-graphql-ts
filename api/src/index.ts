import { ApolloServer } from 'apollo-server'

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(name: String! description: String): Boolean
  }
`

type Photo = {
  name: string,
  description: string | null
}

let photos: Photo[] = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length
  },

  Mutation: {
    postPhoto(_: any, photo: Photo) {
      photos.push(photo)
      console.log(`------Photos: ${photos}`)
      return true
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.listen().then(({ url }) => console.log(`Service running on ${url}`))
