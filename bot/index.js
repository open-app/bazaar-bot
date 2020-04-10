const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const welcome = require('./scenes/welcome')
const list = require('./scenes/list')
const me = require('./scenes/me')
const check = require('./scenes/check')
const resource = require('./scenes/resource')
const unpublish = require('./scenes/unpublish')
const exchange = require('./scenes/exchange')

const { leave } = Stage

const welcomeSwitch = ctx => {
  console.log('welcomeSwitch -> ctx', ctx)
  console.log('FROM', ctx.contextState.user.username)
  console.log(
    '------------------------------------------------------------------------'
  )
  if (!ctx.message) return null
  switch (ctx.message.text.split(`\n`)[0]) {
    case '📄':
      return ctx.scene.enter('list')
    case '➕':
      return ctx.scene.enter('resource-wizard')
    case '➖':
      return ctx.scene.enter('unpublish-wizard')
    case '👤':
      return ctx.scene.enter('me')
    case '🔄':
      return ctx.scene.enter('exchange-wizard')
    case '👥':
      return ctx.scene.enter('check')
    default:
      return null
  }
}

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.catch(err => {
  console.log('Ooops', err)
})
const stage = new Stage()
stage.register(welcome, list, resource, me, check, unpublish, exchange)
bot.use(session())
bot.use(stage.middleware())
bot.use(async (ctx, next) => {
  if (ctx.message && ctx.message.from) {
    const { id, first_name, username, language_code } = ctx.message.from
    ctx.state.user = {
      id,
      first_name,
      username,
      language_code
    }
  }
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time %sms', ms)
})
stage.command('cancel', leave())
bot.start(ctx => {
  return ctx.scene.enter('welcome')
})
bot.on('message', ctx => {
  const action = welcomeSwitch(ctx)
  if (!action) {
    return ctx.scene.enter('welcome')
  }
})
bot.startPolling()
console.log('Telegram BOT running...')
module.exports = bot
