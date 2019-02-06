require("dotenv").config()
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const welcome = require('./scenes/welcome')
const me = require('./scenes/me')
const resource = require('./scenes/resource')
const unpublish = require('./scenes/unpublish')

const { leave } = Stage

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.catch((err) => {
  console.log('Ooops', err)
})
const stage = new Stage()
stage.register(welcome, resource, me, unpublish)
bot.use(session())
bot.use(stage.middleware())
bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time %sms', ms)
})
stage.command('cancel', leave())
bot.on('message', (ctx) => {
  if(!Object.keys(ctx.scene.state).length) {
    ctx.scene.enter('welcome')
  }
})
bot.startPolling()
console.log('Telegram BOT running...')