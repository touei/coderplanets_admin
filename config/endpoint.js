/* config for different envs */

const getGraphQLEndpoint = () => {
  switch (process.env.GOAL) {
    case 'production':
      return 'http://api.coderplanets.com/graphiql'

    case 'dev':
      return 'http://devapi.coderplanets.com/graphiql'

    case 'local':
      return 'http://localhost:4001/graphiql'

    default:
      return 'http://devapi.coderplanets.com/graphiql'
  }
}
export const GRAPHQL_ENDPOINT = getGraphQLEndpoint()
export const ISSUE_ADDR = 'https://github.com/mydearxym/mastani_web/issues/new'
export const MENTION_USER_ADDR = 'https://coderplanets.com/users/'
