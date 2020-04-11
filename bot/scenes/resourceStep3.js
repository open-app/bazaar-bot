const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const stepHandler = new Composer()
const i18n = require('../lib/localization')
const { publishResource } = require('../api')

stepHandler.action('yes', async ctx => {
  const {
    newExchange,
    resourcePrice,
    newResource,
    resourcePrice2
  } = ctx.scene.state
  const { username, first_name } = ctx.scene.state.user
  const prices = () => {
    switch (newExchange) {
      case 1:
        return [`0,${process.env.COMMUNITY_CURRENCY}`]
      case 2:
        return [`${resourcePrice},${process.env.COMMUNITY_CURRENCY}`]
      case 3:
        return [
          `${resourcePrice},${process.env.COMMUNITY_CURRENCY}`,
          `${resourcePrice2},${process.env.FIAT_CURRENCY}`
        ]
      case 4:
        return [`${resourcePrice},${process.env.FIAT_CURRENCY}`]
    }
  }
  const owner = username || first_name
  try {
    await publishResource({
      input: {
        owner,
        category: newResource,
        prices: prices()
      }
    })
    ctx.reply(i18n(ctx, 'done'))
    return ctx.scene.leave()
  } catch (err) {
    console.log('ERROR', err)
    ctx.reply(i18n(ctx, 'error'))
    return ctx.scene.leave()
  }
})
stepHandler.action('no', ctx => {
  ctx.reply(i18n(ctx, 'cancel'))
  return ctx.scene.leave()
})

module.exports = stepHandler
