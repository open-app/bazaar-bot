const server = require('open-app-graphql-server')
const ssb = require('ssb-graphql-defaults')
const economic = require('economic-sentences-graphql')
const bazaar = require('../open-app/bazaar-graphql')
require('./bot')
server([
  ssb,
  economic,
  bazaar,
], {
  scope: process.env.SCOPE,
  key: process.env.APP_KEY,
})