module.exports = `
  mutation($input: ResourceInput) {
    publishResource(input: $input) {
      key
      category
      user
      prices {
        value
        currency
      }
    }
}
`