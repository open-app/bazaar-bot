const typeDefs = require('./typeDefs')
const Resolvers = require('./resolvers')
module.exports = (sbot, scope) => {
  const resolvers = Resolvers(sbot, scope)
  return {
    typeDefs,
    resolvers
  }
}
