const Scene = require('telegraf/scenes/base')
const { getUser } = require('../api')

const check = new Scene('check')
check.enter((async ctx => {
  return ctx.reply('Qual o nome de usuario que gostaria de pesquisar?')
}))
check.on('message', async (ctx) => {
  const username = ctx.update.message.text
  const user = await getUser(username)
  const balance =
    user.balance.map(i => `${i.value} ${i.currency}`)
    .join(', ')
  await ctx.replyWithMarkdown(`\`${user.username}\`: ${balance}`)
  return ctx.scene.leave()
})
module.exports = check