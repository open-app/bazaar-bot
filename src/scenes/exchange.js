const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')
const i18n = require('../lib/localization')
const { transaction } = require('../api')

module.exports = new WizardScene('exchange-wizard',
  (ctx) => {
    ctx.scene.state.user = ctx.update.message.from
    // await ctx.reply(i18n(ctx, 'newHelp1'))
    ctx.reply('Qual o nome de usuario que gostaria de enviar?')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.scene.state.transactionUser = ctx.message.text
    ctx.reply(`Quantos minutos gostaria de enviar?`)
    ctx.wizard.next()
  },
  (ctx) => {
    ctx.scene.state.transactionValue = ctx.message.text
    ctx.reply((`Certeza que gostaria de enviar ${ctx.scene.state.transactionValue} ${process.env.COMMUNITY_CURRENCY} para @${ctx.scene.state.transactionUser}?`), Markup.inlineKeyboard([
      Markup.callbackButton(i18n(ctx, 'yes'), 'yes'),
      Markup.callbackButton(i18n(ctx, 'no'), 'no'),
    ]).extra())
    ctx.wizard.next()
  },
  async (ctx) => {
    const { transactionValue, transactionUser, user } = ctx.scene.state
    const data = ctx.update.callback_query.data
    if (data === 'yes') {
      const tx = await transaction({
        provider: user.username || user.first_name,
        receiver: transactionUser,
        currency: process.env.COMMUNITY_CURRENCY,
        value: parseInt(transactionValue),
      })
      const balance = tx.provider.balance.map(i => `${i.value} ${i.currency}`).join(', ')
      ctx.replyWithMarkdown(`Seu saldo é: ${balance}\n${i18n(ctx, 'done')}`)
      return ctx.scene.leave()
    } else {
      ctx.reply(i18n(ctx, 'done'))
      return ctx.scene.leave()
    }    
  }
)