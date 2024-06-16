
export default {
    routes: [
      {
        method: 'GET',
        path: '/accounts/findUserAccounts',
        handler: 'account.findUserAccounts',
      },
      {
        method: 'POST',
        path: '/accounts/deposit',
        handler: 'account.deposit',
      },
      {
        method: 'POST',
        path: '/accounts/withdrawal',
        handler: 'account.withdrawal',
      },
      {
        method: 'POST',
        path: '/accounts/transferBetweenUserAccount',
        handler: 'account.transferBetweenUserAccount',
      },
      {
        method: 'GET',
        path: '/accounts/userTransactions',
        handler: 'account.userTransactions',
      },
    ]
}
