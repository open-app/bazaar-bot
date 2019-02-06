const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const i18n = require('../lib/localization')
const { getPublishedResources } = require('../api')
const welcome = new Scene('welcome')
welcome.enter(async (ctx) => {
  await ctx.replyWithMarkdown('*' + i18n(ctx, 'welcome') + '*')
  await ctx.reply(i18n(ctx, 'resourcesList'))
  const list = await getPublishedResources()
  list.map((async (item) => {
    const { index, user, category, price} = item
    await ctx.replyWithMarkdown(`\`${index + 1}\`    @${user}:        \`${category}\`                       ${price}`)
  }))
  await ctx.reply(i18n(ctx, 'resourcesAdd'))
  ctx.replyWithMarkdown(i18n(ctx, 'select'), Markup.keyboard([
    [
      Markup.callbackButton('📄\n' + i18n(ctx, 'list')),
      Markup.callbackButton('➕\n' + i18n(ctx, 'new')),
      // Markup.callbackButton('👤\n' + i18n(ctx, 'me'), ctx.scene.enter('resource-wizard')),
    ],
    [
      // Markup.callbackButton('🔄\n' + i18n(ctx, 'exchange'), ctx.scene.enter('resource-wizard')),
      Markup.callbackButton('➖\n' + i18n(ctx, 'unpublish')),
      // Markup.callbackButton('👥\n' + i18n(ctx, 'check'), ctx.scene.enter('resource-wizard')),
    ]
  ]).extra())
})
welcome.on('message', (ctx) => {
  console.log('Welcome!')
  console.log(ctx.message.text.split(`\n`)[0])
  switch(ctx.message.text.split(`\n`)[0]) {
    case '📄':
      return ctx.scene.enter('welcome')
    case '➕':
      return ctx.scene.enter('resource-wizard')
    case '➖':
      return ctx.scene.enter('unpublish-wizard')
    default:
      return ctx.scene.enter('welcome')
  }
})
module.exports = welcome