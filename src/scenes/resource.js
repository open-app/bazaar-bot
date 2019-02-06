const WizardScene = require('telegraf/scenes/wizard')
const step1 = require('./resourceStep1')
const step2 = require('./resourceStep2')
const step3 = require('./resourceStep3')
const i18n = require('../lib/localization')

module.exports = new WizardScene('resource-wizard',
  async (ctx) => {
    await ctx.reply(i18n(ctx, 'newHelp1'))
    return ctx.wizard.next()
  },
  step1,
  step2,
  step3,
)