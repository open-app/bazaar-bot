module.exports = `
  mutation($input: TransactionInput!) {
    transaction(input: $input) {
      key
      provider {
        username
        balance {
          currency
          value
        }
      }
    }
  }
`