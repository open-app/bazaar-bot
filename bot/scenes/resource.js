const WizardScene = require('telegraf/scenes/wizard')
const step1 = require('./resourceStep1')
const step2 = require('./resourceStep2')
const step3 = require('./resourceStep3')
const i18n = require('../lib/localization')

const resource = new WizardScene(
  'resource-wizard',
  ctx => {
    console.log('ctx', ctx.wizard)
    ctx.scene.state.user = ctx.from
    ctx.reply(i18n(ctx, 'newHelp1'))
    return ctx.wizard.next()
  },
  step1,
  step2,
  step3
)

// resource.on('message', ctx => console.log('ON!'))

module.exports = resource
