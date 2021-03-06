const {
  // getId,
  getAbout,
  // getBlob,
  publish,
  message,
  getMessagesByType,
  get
} = require('ssb-helpers')

const resourceClassficationType = 'vf:resourceClassificationAlpha'
const economicResourceType = 'vf:economicResourceAlpha'
const economicEventType = 'vf:economicEventAlpha'

module.exports = function Resolvers (sbot) {
  const getResourceClassfication = async (id, sbot) => {
    const resourceClassification = await message({ id }, sbot)
    return Object.assign(
      { key: resourceClassification.key },
      resourceClassification.value.content
    )
  }

  const getPrices = prices =>
    prices.map(price => {
      const i = price.split(',')
      return {
        value: i[0],
        currency: i[1]
      }
    })

  const getEconomicResource = async (id, sbot) => {
    const economicResource = await message({ id }, sbot)
    const resourceClassifiedAs = await getResourceClassfication(
      economicResource.value.content.resourceClassifiedAs,
      sbot
    )
    const prices = getPrices(economicResource.value.content.prices)
    return Object.assign(economicResource.value.content, {
      key: id,
      resourceClassifiedAs,
      prices
    })
  }

  const Query = {
    agent: async (_, { id }) => {
      console.log('Resolvers -> id', id)
      try {
        return await getAbout({ id }, sbot)
      } catch (err) {
        console.log('ERROR', err)
      }
    },
    resourceClassifications: async (_, {}) => {
      try {
        const msgs = await getMessagesByType(
          { type: resourceClassficationType },
          sbot
        )
        const formated = msgs.map(msg =>
          Object.assign({ key: msg.key }, msg.value.content)
        )
        return formated
      } catch (err) {
        console.log('ERROR', err)
      }
    },
    economicResources: async () => {
      console.log('sbot', sbot)
      const msgs = await getMessagesByType({ type: economicResourceType }, sbot)
      const formated = msgs.map(async msg => {
        const resourceClassifiedAs = msg.value.content.resourceClassifiedAs
        const prices = getPrices(msg.value.content.prices)
        return Object.assign(msg.value.content, {
          key: msg.key,
          resourceClassifiedAs: resourceClassifiedAs
            ? await getResourceClassfication(resourceClassifiedAs, sbot)
            : null,
          prices
        })
      })
      return formated
    },
    economicEvent: async id => {
      get(id).then(msg => {
        console.log(msg)
        return msg
      })
    },
    economicEvents: async (_, {}) => {
      const msgs = await getMessagesByType({ type: economicEventType }, sbot)
      return msgs.map(async msg => {
        console.log('MSG', msg)
        let provider
        let affects
        if (msg.value.content.provider) {
          const about = await getAbout({ id: msg.value.content.provider }, sbot)
          console.log('about: ', about)
          if (about) {
            provider = about.profile
            provider.key = about.id
          }
        }
        if (msg.value.content.affects) {
          const affects = msg.value.content.affects.map(
            async affected => await getEconomicResource(affected, sbot)
          )
        }
        const res = Object.assign(msg.value.content, { key: msg.key, provider })
        console.log('RES', res)
        return res
      })
    }
  }

  const Mutation = {
    publishResourceClassification: (_, { input }) => {
      return publish(
        Object.assign({ type: resourceClassficationType }, input),
        sbot
      ).then(msg => Object.assign({ key: msg.key }, msg.value.content))
    },
    publishEconomicResource: async (_, { input }) => {
      console.log('input', input)
      const resourceClassifiedAs = await getResourceClassfication(
        input.resourceClassifiedAs,
        sbot
      )
      const prices = getPrices(input.prices)
      return publish(
        Object.assign(
          { type: economicResourceType, createdDate: new Date() },
          input
        ),
        sbot
      ).then(msg =>
        Object.assign(msg.value.content, {
          key: msg.key,
          resourceClassifiedAs,
          prices
        })
      )
    },
    publishEconomicEvent: async (_, { input }) => {
      const affects = input.affects.map(
        async affected => await getEconomicResource(affected, sbot)
      )
      return publish(
        Object.assign({ type: economicEventType }, input),
        sbot
      ).then(msg =>
        Object.assign(msg.value.content, {
          key: msg.key,
          affects
        })
      )
    }
  }
  return { Query, Mutation }
}
