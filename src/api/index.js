const { GraphQLClient } = require('graphql-request')
const endpoint = process.env.SBOT_API || `http://localhost:4000/graphql`
const client = new GraphQLClient(endpoint, { headers: { KEY: process.env.SBOT_KEY }})
const listQuery = require('./queries/list')
const publishQuery = require('./queries/publishResource')
const unpublishQuery = require('./queries/unpublishResource')
const userQuery = require('./queries/user')
const transactionQuery = require('./queries/transaction')

const getUser = (username) => {
  return client.request(userQuery, { username })
    .then(data => {
      return data.user
    })
}

const transaction = (variables) => {
  return client.request(transactionQuery, { input: variables })
    .then(data => {
      return data.transaction
    })
    .catch(err => console.log('ERROR', err))
}

const getPublishedResources = async () => {
  const data = await client.request(listQuery)
    .then(data => data.publishedResources)
  const resources = data.map((resource, index) => {
    const { key, user, category, prices } = resource
    const formatedPrice = prices.map(p => `${p.value} ${p.currency}`).join(' & ')
    return {
      key,
      index,
      user,
      category,
      price: formatedPrice,
    }
  })
  return resources
}

const publishResource = async (variables) => {
  return client.request(publishQuery, variables)
    .then(data => data.publishResource)
}
const unpublishResource = async (id) => {
  return client.request(unpublishQuery, { id })
    .then(data => {
      return data.unpublishResource
    })
}

module.exports = {
  getUser,
  getPublishedResources,
  publishResource,
  unpublishResource,
  transaction,
}