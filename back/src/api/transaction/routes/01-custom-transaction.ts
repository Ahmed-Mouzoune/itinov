
export default {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/transactions/user',
        handler: 'transaction.findTransactionsUser',
      }
    ]
}
