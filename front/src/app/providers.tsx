"use client";
import AccountProvider from "@/context/AccountContext";
import TransactionProvider from "@/context/TransactionsContext";
import React from "react";

interface IProviders {
  children: React.ReactNode;
  accounts: TStrapiAccountsApiResponse | TStrapiErrorsApiResponse;
  transactions: TStrapiErrorsApiResponse | TStrapiTransactionsApiResponse;
}

export default function providers({
  children,
  accounts,
  transactions,
}: IProviders) {
  return (
    <AccountProvider
      accounts={accounts?.data?.map((account) => ({
        id: account.id,
        attributes: { ...account?.attributes, id: account?.id },
      }))}
    >
      <TransactionProvider
        transactions={transactions?.data?.map((transaction) => ({
          id: transaction.id,
          attributes: { ...transaction?.attributes, id: transaction?.id },
        }))}
      >
        {children}
      </TransactionProvider>
    </AccountProvider>
  );
}
