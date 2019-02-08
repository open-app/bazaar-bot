module.exports = `
  mutation($id: String!) {
    unpublishResource(id: $id) {
      key
    }
  }
`