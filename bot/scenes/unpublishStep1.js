const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const stepHandler = new Composer()
const i18n = require('../lib/localization')

stepHandler.use(ctx => {
  console.log('ctx UPDATE', ctx.update)
  if (ctx.update.callback_query) {
    const action = ctx.update.callback_query.data
    const id = ctx.scene.state.categories
      .filter(cat => {
        return Object.keys(cat)[0] === action
      })
      .map(i => Object.values(i)[0])[0]

    ctx.scene.state.unpublishId = id
    ctx.reply(
      `${i18n(ctx, 'unpHelp2')} ${ctx.update.callback_query.data}?`,
      Markup.inlineKeyboard([
        Markup.callbackButton(i18n(ctx, 'yes'), 'yes'),
        Markup.callbackButton(i18n(ctx, 'no'), 'no')
      ]).extra()
    )
  } else if (ctx.update.message && ctx.update.message.text) {
    
  }

  return ctx.wizard.next()
})

module.exports = stepHandler
