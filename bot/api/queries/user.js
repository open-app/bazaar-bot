module.exports = `
  query($username: String!) {
    user(username: $username) {
      username
      balance {
        currency
        value
      }
    }
  }
`