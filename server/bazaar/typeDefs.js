const { gql } = require('apollo-server')

module.exports = gql`
  type Price {
    currency: String
    value: Float
  }
  type Transaction {
    key: ID!
    provider: User!
    receiver: User!
    affectedQuantity: Price!
    scope: String!
    affects: [Resource]
  }
  type User {
    username: ID!
    balance: [Price]
    publishedResources: [Resource]
    transactions: [Transaction]
    scope: String!
  }
  type Resource {
    key: ID!
    category: String!
    prices: [Price]
    user: String!
    scope: String!
  }
  extend type Query {
    publishedResources: [Resource]
    user(username: String!): User
    transactions: [Transaction]
  }
  input ResourceInput {
    category: String!
    owner: String!
    prices: [String]
  }
  input TransactionInput {
    provider: String!
    receiver: String!
    currency: String!
    value: Int!
    affects: [String]
  }
  extend type Mutation {
    publishResource(input: ResourceInput): Resource
    unpublishResource(id: String!): Resource
    transaction(input: TransactionInput): Transaction
  }
`
