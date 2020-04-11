const Scene = require('telegraf/scenes/base')
const { getUser, getPublishedResources } = require('../api')
const Markup = require('telegraf/markup')
const i18n = require('../lib/localization')

const check = new Scene('check')

async function checkuserBalance (username, ctx) {
  const user = await getUser(username)
  if (user.balance.length === 0) {
    ctx.reply(i18n(ctx, 'noBalance'))
  } else {
    const balance = user.balance.map(i => `${i.value} ${i.currency}`).join(', ')
    await ctx.replyWithMarkdown(`\`${user.username}\`: ${balance}`)
  }
  return ctx.scene.leave()
}

check.enter(async ctx => {
  ctx.scene.state.user = ctx.update.message.from
  let uniq = a => [...new Set(a)]
  const resources = await getPublishedResources()
  const users = resources
    .filter(r => r.user !== ctx.scene.state.user.username)
    .map(r => r.user)
  const uniqUsers = uniq(users).map(user => Markup.callbackButton(user, user))
  uniqUsers.push(Markup.callbackButton(i18n(ctx, 'other'), 'other'))
  return ctx.reply(
    i18n(ctx, 'userCheck'),
    Markup.inlineKeyboard(uniqUsers, { columns: uniqUsers.length / 2 }).extra()
  )
})
check.on('callback_query', async ctx => {
  if (ctx.update.callback_query.data === 'other') {
    return ctx.reply(i18n(ctx, 'userCheck'))
  } else {
    const username = ctx.update.callback_query.data
    checkuserBalance(username, ctx)
  }
})

check.on('message', async ctx => {
  const username = ctx.update.message.text
  checkuserBalance(username, ctx)
})

module.exports = check
