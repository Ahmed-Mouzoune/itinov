type TStrapiAccountApiResponse = {
    id: number
    attributes: IAccount
}
type TStrapiAccountsApiResponse = {
    data: TStrapiAccountApiResponse[]
}

interface IAccount {
    id: number
    name: string
    balance: number
    users_permissions_user: any
    transactions_debtors: ITransaction[]
    transactions_creditor: ITransaction[]
    createdAt: string
    updatedAt: string
    publishedAt: string
}

interface AccountContextType {
    accounts: TStrapiAccountApiResponse[] | undefined
    accountSelected: IAccount | undefined
    setAccountSelected: React.Dispatch<React.SetStateAction<IAccount | undefined>>
    sheetAccountDepositSheetOpen: boolean;
    setSheetAccountDepositSheetOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    sheetAccountWithdrawalSheetOpen: boolean;
    setSheetAccountWithdrawalSheetOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    sheetAccountTransferSheetOpen: boolean;
    setSheetAccountTransferSheetOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}