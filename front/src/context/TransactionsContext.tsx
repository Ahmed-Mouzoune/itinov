"use client";
import { findTransactionsUserService } from "@/services/TransactionService";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

type UseTransactionHook = () => TransactionContextType;

export const useTransaction: UseTransactionHook = () => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error("UseTransaction must be used within a TransactionProvider");
  return context;
};

export default function TransactionProvider({
  children,
  transactions,
}: {
  children: ReactNode;
  // transactionsTest: TStrapiTransactionApiResponse | undefined;
  transactions: TStrapiTransactionApiResponse[] | undefined;
}) {
  const [sheetListTransactionOpen, setSheetListTransactionOpen] =
    useState(false);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        sheetListTransactionOpen,
        setSheetListTransactionOpen,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
