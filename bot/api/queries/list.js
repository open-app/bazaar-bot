module.exports = `
  query {
    economicResources {
      key
      category
      prices {
        currency
        value
      }
      user
    }
  } 
`
