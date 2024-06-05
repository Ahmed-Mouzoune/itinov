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
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] = useState<
    TStrapiTransactionApiResponse[] | undefined
  >(undefined);
  const [sheetListTransactionOpen, setSheetListTransactionOpen] =
    useState(false);

  const fetchTransactions = async () => {
    const transactions = await findTransactionsUserService();
    setTransactions(
      transactions?.data?.map((transaction) => ({
        id: transaction.id,
        attributes: { ...transaction?.attributes, id: transaction?.id },
      }))
    );
  };

  useEffect(() => {
    fetchTransactions();
    return () => {
      setTransactions(undefined);
    };
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        sheetListTransactionOpen,
        setSheetListTransactionOpen,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
