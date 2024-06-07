export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    };
    const formattedDate = date.toLocaleDateString('fr-FR', options);

    return formattedDate;
}

export function getLastDayOfCurrentMonth(): number {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return new Date(nextMonth.getTime() - 1).getDate();
}

export function filterTransactionsByAccountId(transactions: TStrapiTransactionApiResponse[],accountSelectedId: number) {
    return transactions
    .filter(
      (transaction) =>
        transaction.attributes?.account_creditor?.data?.id ===
          accountSelectedId ||
        transaction.attributes?.account_debtor?.data?.id ===
          accountSelectedId
    )
}

export function getTransactionDataForCharts(transactions: TStrapiTransactionApiResponse[], accountselectedId: number): ITransactionDataChart[] {
    const lastDay = getLastDayOfCurrentMonth().toString();
    const initialResult: ITransactionDataChart[] = [
        { account_debt: 0, ammount_credit: 0, days: '1-7' },
        { account_debt: 0, ammount_credit: 0, days: '8-14' },
        { account_debt: 0, ammount_credit: 0, days: '15-21' },
        { account_debt: 0, ammount_credit: 0, days: '22-28' },
        { account_debt: 0, ammount_credit: 0, days: `29-${lastDay}` },
    ];

    return transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.attributes.createdAt);
        const day = date.getDate();
        const transferCreditor = transaction.attributes?.account_creditor?.data?.id === accountselectedId;

        let periodIndex: number;
        switch (true) {
            case day >= 1 && day <= 7:
                periodIndex = 0;
                break;
            case day >= 8 && day <= 14:
                periodIndex = 1;
                break;
            case day >= 15 && day <= 21:
                periodIndex = 2;
                break;
            case day >= 22 && day <= 28:
                periodIndex = 3;
                break;
            default:
                periodIndex = 4;
                break;
        }

        if (transferCreditor) {
            acc[periodIndex].account_debt += transaction.attributes.amount;
        }
        if (!transferCreditor) {
            acc[periodIndex].ammount_credit += transaction.attributes.amount;
        }

        return acc;
    }, initialResult);
}
