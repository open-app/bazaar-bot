const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const stepHandler = new Composer()
const i18n = require('../lib/localization')

const moveOn = async (ctx) => {
  const { newResource, newExchange, resourcePrice, resourcePrice2 } = ctx.scene.state
  const formatedPrice = () => {
    switch(newExchange) {
      case 1:
        return '0'
      case 2:
        return `${resourcePrice} ${process.env.COMMUNITY_CURRENCY}`
      case 3:
        return `${resourcePrice} ${process.env.FIAT_CURRENCY} & ${resourcePrice2} ${process.env.COMMUNITY_CURRENCY}`
      case 4:
        return `${resourcePrice} ${process.env.FIAT_CURRENCY}`
    }
  }
  await ctx.replyWithMarkdown(`@${ctx.update.message.from.username}:        \`${newResource}\`                       ${formatedPrice()}`)
  ctx.reply(i18n(ctx, 'newHelp3'), Markup.inlineKeyboard([
    Markup.callbackButton(i18n(ctx, 'yes'), 'yes'),
    Markup.callbackButton(i18n(ctx, 'no'), 'no'),
  ]).extra())
  return ctx.wizard.next()
}

stepHandler.use(async (ctx) => {
  const { newExchange } = ctx.scene.state
  switch(newExchange) {
    case 1:
      return moveOn(ctx)
    case 2:
      ctx.scene.state.resourcePrice = parseInt(ctx.update.message.text)
      return moveOn(ctx)
    case 3:
      if (!ctx.scene.state.resourcePrice) {
        ctx.scene.state.resourcePrice = parseInt(ctx.update.message.text)
        return ctx.reply(i18n(ctx, 'newFiat'))
      } else {
        ctx.scene.state.resourcePrice2 = parseInt(ctx.update.message.text)
        return moveOn(ctx)
      }
    case 4:
      ctx.scene.state.resourcePrice = parseInt(ctx.update.message.text)
      return moveOn(ctx)
      
  }
})

stepHandler.enter

module.exports = stepHandler