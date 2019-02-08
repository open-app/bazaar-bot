const Scene = require('telegraf/scenes/base')
const { getPublishedResources } = require('../api')
const i18n = require('../lib/localization')

const list = new Scene('list')
list.enter((async ctx => {
  const data = await getPublishedResources()
  const list = data.map(((item) => {
    const { index, user, category, price} = item
    return `\`${index + 1}\` - @${user}: \`${category}\` ${price}`
  }))
  if (list.length > 0) {
    await ctx.replyWithMarkdown(list.join('\n') + '\n' + i18n(ctx, 'resourcesAdd'))
  } else {
    await ctx.replyWithMarkdown(`${i18n(ctx, 'empty')}.\n${i18n(ctx, 'resourcesAdd')}`)
  }
  return ctx.scene.leave()
}))
module.exports = list