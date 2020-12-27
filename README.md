# learning-graphql-ts

This project builds a sample GraphQL application to learn [this book](https://www.oreilly.com/library/view/learning-graphql/9781492030706/).

Different from [the original](https://github.com/MoonHighway/learning-graphql), this project uses TypeScript, MySQL, typeorm and type-graphql.

## How to develop
```
// setup
$ yarn
$ docker-compose up

// run all
// Then you can open `http://localhost:4000/playground` and `server/schema.gql` would be automatically generated
$ yarn dev
```

## How to get a GitHub Token
- Create an OAuth app [here](https://github.com/settings/developers).
- Access: http://github.com/login/authorize?client_id=xxx&scope=user
  - Then you would redirect to `http://localhost:4000?code=xxx`
  - You can use the code like:

```
mutation {
  githubAuth(code: "xxx") {
		token
    user {
      githubLogin
      name
      avatar
    }
  }
}
```

- Then you can use the token like `{ "Authorization": <token> }` on the http headers.
