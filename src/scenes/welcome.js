const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const i18n = require('../lib/localization')

const welcome = new Scene('welcome')
welcome.enter((ctx) => {
  ctx.replyWithMarkdown(`* ${i18n(ctx, 'welcome')}*\n${i18n(ctx, 'select')}`, Markup.keyboard([
    [
      Markup.callbackButton('📄\n' + i18n(ctx, 'list')),
      Markup.callbackButton('👤\n' + i18n(ctx, 'me')),
      Markup.callbackButton('➕\n' + i18n(ctx, 'new')),
    ],
    [
      Markup.callbackButton('🔄\n' + i18n(ctx, 'exchange')),
      Markup.callbackButton('👥\n' + i18n(ctx, 'check')),
      Markup.callbackButton('➖\n' + i18n(ctx, 'unpublish')),
    ]
  ]).extra())
  return ctx.scene.leave()
})

module.exports = welcome