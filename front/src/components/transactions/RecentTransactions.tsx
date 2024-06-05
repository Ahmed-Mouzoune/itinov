"use client";
import React from "react";
import { useAccount } from "@/context/AccountContext";
import ListTransactions from "./ListTransactions";
import RowTransaction from "./RowTransactions";
import { useTransaction } from "@/context/TransactionsContext";

export default function RecentTransactions() {
  const { accountSelected } = useAccount();
  const {
    transactions,
    sheetListTransactionOpen,
    setSheetListTransactionOpen,
  } = useTransaction();

  return (
    <div className="rounded-xl bg-white sm:w-full sm:max-w-screen-md mx-4 sm:mx-auto">
      {accountSelected && transactions && (
        <>
          {transactions.length > 0 &&
            transactions
              .filter(
                (transaction) =>
                  transaction.attributes?.account_creditor?.data?.id ===
                    accountSelected.id ||
                  transaction.attributes?.account_debtor?.data?.id ===
                    accountSelected.id
              )
              .slice(0, 3)
              .map((transaction, i) => (
                <RowTransaction
                  key={`row-transaction-${i}`}
                  transaction={transaction.attributes}
                  accountselectedId={accountSelected.id}
                />
              ))}
          <ListTransactions
            transactions={transactions.filter(
              (transaction) =>
                transaction.attributes?.account_creditor?.data?.id ===
                  accountSelected.id ||
                transaction.attributes?.account_debtor?.data?.id ===
                  accountSelected.id
            )}
            sheetListTransactionOpen={sheetListTransactionOpen}
            setSheetListTransactionOpen={setSheetListTransactionOpen}
          />
        </>
      )}
    </div>
  );
}
