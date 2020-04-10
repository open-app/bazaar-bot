const { gql } = require('apollo-server')

module.exports = gql`
  type Agent {
    key: ID!
    name: String
    type: String
    image: String
    note: Note
    location: Place
    phone: String
    email: String
    balance: Balance
  }
  type Balance {
    currency: String
    value: Int
  }
  type Place {
    names: [String]
    lat: String
    lng: String
    note: Note
  }
  type Plan {
    plannedOn: String
    due: String
    note: String
    name: String
  }
  type ProcessClassification {
    note: Note
    scope: Agent
    estimatedDuration: String
  }
  type Process {
    scope: Agent
    plannedStart: String
    plannedFinish: String
    isStarted: Boolean
    isFinished: Boolean
    processClassifiedAs: ProcessClassification
    note: Note
  }
  type Commitment {
    action: String
    process: Process
    inputOf: Process
    outputOf: Process
    provider: Agent
    receiver: Agent
    scope: String
    resourceClassifiedAs: ResourceClassification
    involves: EconomicResource
    committedQuantity: QuantityValue
    committedOn: String
    plannedStart: String
    due: String
    isFinished: Boolean
    plan: Plan
    isPlanDeliverable: Boolean
    forPlanDeliverable: Commitment
    note: Note
  }
  type Fulfillment {
    commitment: Commitment
    event: EconomicEvent
  }
  type Note {
    body: String!
  }
  type Unit {
    name: String
  }
  type QuantityValue {
    unit: Unit
    value: String!
  }
  type ResourceClassification {
    key: ID!
    image: String
    note: Note
    category: String
    processCategory: String
  }
  type Price {
    currency: String
    value: Int
  }
  type EconomicResource {
    key: ID!
    resourceClassifiedAs: ResourceClassification
    trackingIdentifier: String
    image: String
    currentQuantity: Int
    quantityUnit: String
    note: Note
    category: String
    currentLocation: Place
    createdDate: String
    currentOwner: String
    prices: [Price]
    scope: String
    user: Agent
  }
  type EconomicEvent {
    key: ID!
    action: String!
    inputOf: Process
    outputOf: Process
    provider: Agent
    receiver: Agent
    scope: String
    affects: [EconomicResource]
    affectedQuantity: QuantityValue
    start: String
    url: String
    requestDistribution: Boolean
    note: Note
    fulfills: Fulfillment
  }
  extend type Query {
    agent(id: String): Agent
    resourceClassifications: [ResourceClassification]
    economicResource(id: String!): EconomicResource
    economicResources: [EconomicResource]
    economicEvent(id: String!): EconomicEvent
    economicEvents: [EconomicEvent]
  }
  input resourceClassificationInput {
    image: String
    note: String
    category: String
    processCategory: String
  }
  input economicEventInput {
    action: String!
    inputOf: String
    outputOf: String
    provider: String
    receiver: String
    scope: String
    affects: [String]
    affectedQuantity: Int
    start: String
    url: String
    requestDistribution: Boolean
    note: String
    fulfills: String
  }
  input economicResourceInput {
    resourceClassifiedAs: String
    trackingIdentifier: String
    image: String
    currentQuantity: Int
    quantityUnit: String
    currentOwner: String
    note: String
    currentLocation: String
    prices: [String]
    user: String
  }
  extend type Mutation {
    publishResourceClassification(
      input: resourceClassificationInput
    ): ResourceClassification
    publishEconomicResource(input: economicResourceInput): EconomicResource
    publishEconomicEvent(input: economicEventInput): EconomicEvent
  }
`
