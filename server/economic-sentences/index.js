const typeDefs = require('./typeDefs')
const Resolvers = require('./resolvers')
module.exports = sbot => {
  const resolvers = Resolvers(sbot)
  return {
    typeDefs,
    resolvers
  }
}
