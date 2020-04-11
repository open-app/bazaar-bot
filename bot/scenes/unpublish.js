const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')
const i18n = require('../lib/localization')
const step1 = require('./unpublishStep1')
const step2 = require('./unpublishStep2')
const { getPublishedResources } = require('../api')
let categories = []

module.exports = new WizardScene(
  'unpublish-wizard',
  async ctx => {
    const list = await getPublishedResources()
    const userList = list
      .filter(i => i.user === ctx.update.message.from.username)
      .map(({ category, key }) => {
        categories.push({ [category]: key })
        return Markup.callbackButton(category, category)
      })
    if (userList.length > 0) {
      ctx.scene.state.categories = categories
      await ctx.reply(
        i18n(ctx, 'unpHelp1'),
        Markup.inlineKeyboard(userList).extra()
      )
      return ctx.wizard.next()
    } else {
      ctx.reply(i18n(ctx, 'empty'))
      ctx.scene.leave()
    }
  },
  step1,
  step2
)
