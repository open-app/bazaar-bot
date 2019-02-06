const { GraphQLClient } = require('graphql-request')
const endpoint = `http://localhost:4000/graphql`
const client = new GraphQLClient(endpoint, { headers: {} })
const listQuery = require('./queries/list')
const publishQuery = require('./queries/publishResource')
const unpublishQuery = require('./queries/unpublishResource')

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
  client.request(publishQuery, variables)
    .then(data => console.log(data))
}
const unpublishResource = async (id) => {
  client.request(unpublishQuery, { id })
    .then(data => console.log(data))
}

module.exports = {
  getPublishedResources,
  publishResource,
  unpublishResource,
}