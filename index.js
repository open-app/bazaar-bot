const server = require('open-app-graphql-server')
const ssb = require('ssb-graphql-defaults')
const economic = require('economic-sentences-graphql')
const bazaar = require('bazaar-graphql')
require('./bot')
server([
  ssb,
  economic,
  bazaar,
], {
  scope: 'ssb-01Sk9Yyu',
  key: process.env.APP_KEY,
})