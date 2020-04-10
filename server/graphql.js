const { ApolloServer } = require('apollo-server-express')
const { buildFederatedSchema } = require('@apollo/federation')
const http = require('http')
const express = require('express')
const cors = require('cors')
const Main = require('@ssb-graphql/main')
const Profile = require('@ssb-graphql/profile')
const EconomicSentences = require('./economic-sentences')
const Bazaar = require('./bazaar')
const scope = process.env.SCOPE

module.exports = {
  name: 'graphql-http-server',
  version: '1.0.0',
  init: function (sbot, cfg) {
    const PORT = 4000
    const app = express()
    app.options('*', cors())
    const main = Main(sbot)
    const profile = Profile(sbot)
    const economicSentences = EconomicSentences(sbot)
    const bazaar = Bazaar(sbot, scope)
    profile.Context((err, context) => {
      if (err) throw err
      const server = new ApolloServer({
        schema: buildFederatedSchema([
          {
            typeDefs: main.typeDefs,
            resolvers: main.resolvers
          },
          {
            typeDefs: profile.typeDefs,
            resolvers: profile.resolvers
          },
          {
            typeDefs: economicSentences.typeDefs,
            resolvers: economicSentences.resolvers
          },
          {
            typeDefs: bazaar.typeDefs,
            resolvers: bazaar.resolvers
          }
        ]),
        context,
        mockEntireSchema: false,
        mocks: process.env.MOCK === true ? require('./mocks') : false
      })
      server.applyMiddleware({ app })

      const httpServer = http.createServer(app)
      server.installSubscriptionHandlers(httpServer)

      httpServer.listen(PORT, () => {
        console.log(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        )
        console.log(
          `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
        )
        if (process.env.PLATFORM === 'cordova') {
          require('cordova-bridge').channel.post(
            'initialized',
            JSON.stringify({ started: true })
          )
        }
      })
    })
  }
}
