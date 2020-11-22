import AuthPayloadResolver from './resolvers/AuthPayloadResolver'
import PhotoResolver from './resolvers/PhotoResolver'
import UserResolver from './resolvers/UserResolver'

const resolvers = [
  AuthPayloadResolver,
  PhotoResolver,
  UserResolver
]

export default resolvers
