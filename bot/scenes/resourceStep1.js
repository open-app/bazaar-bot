const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const stepHandler = new Composer()
const i18n = require('../lib/localization')

stepHandler.action('opt1', ctx => {
  ctx.scene.state.newExchange = 1
  ctx.wizard.next()
  return ctx.reply('❤❤❤❤❤')
})
stepHandler.action('opt2', ctx => {
  ctx.scene.state.newExchange = 2
  ctx.reply(i18n(ctx, 'newCom'))
  return ctx.wizard.next()
})
stepHandler.action('opt3', ctx => {
  ctx.scene.state.newExchange = 3
  ctx.reply(i18n(ctx, 'newCom'))
  return ctx.wizard.next()
})
stepHandler.action('opt4', ctx => {
  ctx.scene.state.newExchange = 4
  ctx.reply(i18n(ctx, 'newFiat'))
  return ctx.wizard.next()
})

stepHandler.use(ctx => {
  console.log('ctx USE', ctx.message.text)
  ctx.scene.state.newResource = ctx.message.text
  const msg = i18n(ctx, 'newHelp2')
  console.log('GOT IT', msg)
  ctx.reply(
    i18n(ctx, 'newHelp2'),
    Markup.inlineKeyboard(
      [
        Markup.callbackButton(i18n(ctx, 'newOpt1'), 'opt1'),
        Markup.callbackButton(i18n(ctx, 'newOpt2'), 'opt2'),
        Markup.callbackButton(i18n(ctx, 'newOpt3'), 'opt3'),
        Markup.callbackButton(i18n(ctx, 'newOpt4'), 'opt4')
      ],
      { columns: 2 }
    ).extra()
  )
})

module.exports = stepHandler
