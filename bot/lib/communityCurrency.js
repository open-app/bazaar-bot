const currency = require('currency.js')

module.exports = value =>
  currency(value, {
    separator: process.env.DECIMAL && process.env.DECIMAL === ',' ? '.' : ',',
    decimal: process.env.DECIMAL || '.'
  })
