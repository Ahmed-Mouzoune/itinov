"use client";
import React, { useEffect, useState } from "react";
import { TStrapiAccountApiResponse } from "@/interfaces/collections/account";
import { useAccount } from "@/context/AccountContext";
import { Skeleton } from "../ui/skeleton";
import AccountsSelectSheet from "./AccountsSelectSheet";
import AccountDepositSheet from "./AccountDepositSheet";
import AccountTransferSheet from "./AccountTransferSheet";
import AccountWithdrawalSheet from "./AccountWithdrawalSheet";

export default function AccountResume() {
  const { accounts, accountSelected } = useAccount();
  const [sheetAccountOpen, setSheetAccountOpen] = useState(false);

  if (!accounts || accounts?.length <= 0) return <></>;

  return (
    <section className="bg-white flex flex-col items-center gap-1 border-b shadow-xs p-6">
      <h2 className="flex items-center gap-1 text-sm font-light">
        {accountSelected ? (
          `${accountSelected.name}`
        ) : (
          <Skeleton className="h-4 w-[50px]" />
        )}{" "}
        ° EUR
      </h2>
      <div className="flex items-center text-2xl font-bold tracking-wider">
        {accountSelected ? (
          `${accountSelected.balance}`
        ) : (
          <Skeleton className="h-4 w-[50px]" />
        )}{" "}
        €
      </div>
      <AccountsSelectSheet
        accounts={accounts}
        sheetAccountOpen={sheetAccountOpen}
        setSheetAccountOpen={setSheetAccountOpen}
      />
      {accountSelected && (
        <div className="flex flex-wrap justify-center gap-3">
          <AccountDepositSheet />
          <AccountTransferSheet accounts={accounts} />
          <AccountWithdrawalSheet />
        </div>
      )}
    </section>
  );
}
