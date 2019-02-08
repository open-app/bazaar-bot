const Scene = require('telegraf/scenes/base')
const { getUser } = require('../api')

const me = new Scene('me')
me.enter((async ctx => {
  const username = ctx.update.message.from.username || ctx.update.message.from.first_name
  const user = await getUser(username)
  const balance =
    user.balance.map(i => `${i.value} ${i.currency}`)
    .join(', ')
  ctx.replyWithMarkdown(`\`${user.username}\`: ${balance || 0}`)
  ctx.scene.leave()
}))
module.exports = me