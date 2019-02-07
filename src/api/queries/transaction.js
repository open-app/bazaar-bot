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
      receiver {
        username
        balance {
          currency
          value
        }
      }
    }
  }
`