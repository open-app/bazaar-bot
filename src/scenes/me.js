const Scene = require('telegraf/scenes/base')

const me = new Scene('me')
me.enter((async ctx => {
  ctx.reply('EUUUU')
}))
module.exports = me