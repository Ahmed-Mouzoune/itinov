type TStrapiTransactionApiResponse = {
    id: number
    attributes: ITransaction
}
type TStrapiTransactionsApiResponse = {
    data: TStrapiTransactionApiResponse[]
}

interface ITransaction {
    amount: number
    type: 'transfer' | 'deposit' | 'payment' | 'withdrawal'
    users: any[]
    account_debtor: {
        data: TStrapiAccountApiResponse
    }
    account_creditor: {
        data: TStrapiAccountApiResponse
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
}

interface TransactionContextType {
    transactions: TStrapiTransactionApiResponse[] | undefined
    sheetListTransactionOpen: boolean
    setSheetListTransactionOpen: React.Dispatch<React.SetStateAction<boolean>>
}