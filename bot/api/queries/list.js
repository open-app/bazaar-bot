module.exports = `
  query {
    publishedResources {
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