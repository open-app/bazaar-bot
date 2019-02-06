const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const stepHandler = new Composer()
const i18n = require('../lib/localization')
const { unpublishResource } = require('../api')

stepHandler.action('yes', async (ctx) => {
  const { unpublishId } = ctx.scene.state
  await unpublishResource(unpublishId)
  ctx.reply(i18n(ctx, 'done'))
  return ctx.scene.leave()
})
stepHandler.action('no', (ctx) => {
  ctx.reply(i18n(ctx, 'cancel'))
  return ctx.scene.leave()    
})


module.exports = stepHandler