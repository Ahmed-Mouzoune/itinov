import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAccount } from "@/context/AccountContext";
import RowTransaction from "./RowTransactions";

interface IAccountDepositSheet {
  sheetListTransactionOpen: boolean;
  setSheetListTransactionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transactions: TStrapiTransactionApiResponse[];
}

export default function ListTransactions({
  sheetListTransactionOpen,
  setSheetListTransactionOpen,
  transactions,
}: IAccountDepositSheet) {
  const { accountSelected } = useAccount();
  return (
    <Sheet
      open={sheetListTransactionOpen}
      onOpenChange={setSheetListTransactionOpen}
    >
      <SheetTrigger asChild>
        <Button
          size={"lg"}
          variant={"outline"}
          className="border-none w-full text-center p-4 text-blue-600 font-semibold"
        >
          Tout afficher
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-screen h-screen flex flex-col gap-2"
      >
        <SheetHeader>
          <SheetTitle className="mb-4">Transactions</SheetTitle>
        </SheetHeader>
        {accountSelected && (
          <>
            {transactions.length > 0 &&
              transactions.map((transaction, i) => (
                <RowTransaction
                  key={`row-transaction-${i}`}
                  transaction={transaction.attributes}
                  accountselectedId={accountSelected.id}
                />
              ))}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
