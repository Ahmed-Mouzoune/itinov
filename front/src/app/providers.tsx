"use client";
import React from "react";
import AccountProvider from "@/context/AccountContext";
import TransactionProvider from "@/context/TransactionsContext";

export default function providers({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      <TransactionProvider>{children}</TransactionProvider>
    </AccountProvider>
  );
}
