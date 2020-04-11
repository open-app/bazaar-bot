const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')
const i18n = require('../lib/localization')
const { transaction, getPublishedResources } = require('../api')

module.exports = new WizardScene('exchange-wizard',
  async (ctx) => {
    ctx.scene.state.user = ctx.update.message.from
    // await ctx.reply(i18n(ctx, 'newHelp1'))
    let uniq = a => [...new Set(a)];
    const resources = await getPublishedResources()
    const users = resources
      .filter(r => r.user !== ctx.scene.state.user.username)
      .map(r => r.user)
    const uniqUsers = uniq(users)
      .map(user => Markup.callbackButton(user, user))
    uniqUsers.push(Markup.callbackButton(i18n(ctx, 'other'), 'other'))
    await ctx.reply((i18n(ctx, 'excHelp1')), Markup.inlineKeyboard(uniqUsers, { columns: uniqUsers.length/2 }).extra())
    return ctx.wizard.next()
  },
  (ctx) => {
    if (ctx.update.callback_query && ctx.update.callback_query.data === 'other') {
      ctx.reply(i18n(ctx, 'excHelp2'))
    } else if (ctx.update.callback_query) {
      ctx.scene.state.transactionUser = ctx.update.callback_query.data
      ctx.reply(i18n(ctx, 'excHelp3'))
      return ctx.wizard.next()
    } else if (ctx.update.message) {
      ctx.scene.state.transactionUser = ctx.update.message.text
      ctx.reply(i18n(ctx, 'excHelp3'))
      return ctx.wizard.next()
    }
  },
  (ctx) => {
    ctx.scene.state.transactionValue = ctx.message.text
    ctx.reply((`${i18n(ctx, 'excHelp4')} ${ctx.scene.state.transactionValue} ${process.env.COMMUNITY_CURRENCY} ${i18n(ctx, 'to')} @${ctx.scene.state.transactionUser}?`), Markup.inlineKeyboard([
      Markup.callbackButton(i18n(ctx, 'yes'), 'yes'),
      Markup.callbackButton(i18n(ctx, 'no'), 'no'),
    ]).extra())
    ctx.wizard.next()
  },
  async (ctx) => {
    const { transactionValue, transactionUser, user } = ctx.scene.state
    const data = ctx.update.callback_query.data
    if (data === 'yes') {
      try {
        const tx = await transaction({
          provider: user.username || user.first_name,
          receiver: transactionUser,
          currency: process.env.COMMUNITY_CURRENCY,
          value: parseFloat(transactionValue),
        })
        const balance = tx.provider.balance.map(i => `${i.value} ${i.currency}`).join(', ')
        ctx.replyWithMarkdown(`${i18n(ctx, 'excHelp5')}: ${balance}\n${i18n(ctx, 'done')}`)
        return ctx.scene.leave()
      } catch (err) {
        ctx.reply(i18n(ctx, 'error'))
        return ctx.scene.leave()
      }
    } else {
      ctx.reply(i18n(ctx, 'done'))
      return ctx.scene.leave()
    }    
  }
)