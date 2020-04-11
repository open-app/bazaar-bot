const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const stepHandler = new Composer()
const i18n = require('../lib/localization')
const communityCurrency = require('../lib/communityCurrency')

const moveOn = async ctx => {
  const {
    newResource,
    newExchange,
    resourcePrice,
    resourcePrice2
  } = ctx.scene.state
  const formatedPrice = () => {
    switch (newExchange) {
      case 1:
        return '❤'
      case 2:
        return `${resourcePrice} ${process.env.COMMUNITY_CURRENCY}`
      case 3:
        return `${resourcePrice} ${process.env.COMMUNITY_CURRENCY} & ${resourcePrice2} ${process.env.FIAT_CURRENCY}`
      case 4:
        return `${resourcePrice} ${process.env.FIAT_CURRENCY}`
    }
  }
  const from = ctx.update.message
    ? ctx.update.message.from.username
    : ctx.update.callback_query.from.username
  await ctx.replyWithMarkdown(`@${from}: \`${newResource}\` ${formatedPrice()}`)
  ctx.reply(
    i18n(ctx, 'newHelp3'),
    Markup.inlineKeyboard([
      Markup.callbackButton(i18n(ctx, 'yes'), 'yes'),
      Markup.callbackButton(i18n(ctx, 'no'), 'no')
    ]).extra()
  )
  return ctx.wizard.selectStep(3)
}

stepHandler.use(async ctx => {
  const { newExchange } = ctx.scene.state
  switch (newExchange) {
    case 1:
      return moveOn(ctx)
    case 2:
      ctx.scene.state.resourcePrice = communityCurrency(ctx.update.message.text)
      return moveOn(ctx)
    case 3:
      if (!ctx.scene.state.resourcePrice) {
        ctx.scene.state.resourcePrice = communityCurrency(
          ctx.update.message.text
        )
        return ctx.reply(i18n(ctx, 'newFiat'))
      } else {
        ctx.scene.state.resourcePrice2 = communityCurrency(
          ctx.update.message.text
        )
        return moveOn(ctx)
      }
    case 4:
      ctx.scene.state.resourcePrice = communityCurrency(ctx.update.message.text)
      console.log(
        'currency(ctx.update.message.text)',
        communityCurrency(ctx.update.message.text)
      )

      return moveOn(ctx)
  }
})

const step2 = stepHandler

module.exports = { moveOn, step2 }
