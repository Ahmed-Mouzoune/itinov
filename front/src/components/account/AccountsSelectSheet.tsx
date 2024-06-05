"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  IAccount,
  TStrapiAccountApiResponse,
} from "@/interfaces/collections/account";
import { useAccount } from "@/context/AccountContext";
import AccountsList from "./AccountsList";

interface IAccountsSelectSheet {
  accounts: TStrapiAccountApiResponse[];
  sheetAccountOpen: boolean;
  setSheetAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountsSelectSheet({
  accounts,
  sheetAccountOpen,
  setSheetAccountOpen,
}: IAccountsSelectSheet) {
  const { accountSelected, setAccountSelected } = useAccount();
  const chooseAccount = (account: IAccount) => {
    if (accountSelected !== account) {
      setAccountSelected(account);
      setSheetAccountOpen(false);
    }
  };

  return (
    <Sheet open={sheetAccountOpen} onOpenChange={setSheetAccountOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-6">
          Comptes
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-screen h-screen">
        <SheetHeader>
          <SheetTitle>Mes comptes</SheetTitle>
        </SheetHeader>
        <AccountsList accounts={accounts} onClickItem={chooseAccount} />
      </SheetContent>
    </Sheet>
  );
}
