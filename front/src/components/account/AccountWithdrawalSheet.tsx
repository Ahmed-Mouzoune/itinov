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
  MdArrowCircleDown,
  MdArrowDownward,
  MdOutlineArrowCircleDown,
} from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAccount } from "@/context/AccountContext";
import { Input } from "@/components/ui/input";
import {
  withdrawalAccountService,
  revalidateFindUserAccounts,
} from "@/services/AccountService";
import { useToast } from "../ui/use-toast";
import { IoCashOutline } from "react-icons/io5";
import { useFormState } from "react-dom";
import { withdrawalAccountAction } from "@/actions/account-actions";
import { StrapiErrors } from "../error/StrapiErrors";
import { ZodErrors } from "../error/ZodErrors";

export default function AccountWithdrawalSheet() {
  const {
    accountSelected,
    sheetAccountWithdrawalSheetOpen,
    setSheetAccountWithdrawalSheetOpen,
  } = useAccount();
  const [formState, formAction] = useFormState(
    withdrawalAccountAction,
    undefined
  );
  const { toast } = useToast();

  const checkFormState = async () => {
    if (formState && "zodErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Withdrawal failed !`,
        description: (
          <>
            <ZodErrors
              error={formState?.zodErrors?.amountWithdrawal as string[]}
            />
          </>
        ),
      });
    }
    if (formState && "strapiErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Withdrawal failed !`,
        description: (
          <>
            <StrapiErrors
              error={formState?.strapiErrors as IStrapiErrorsProps}
            />
          </>
        ),
      });
    }
    if (formState && "data" in formState) {
      toast({
        title: `Withdrawal success !`,
      });
      await revalidateFindUserAccounts();
      setSheetAccountWithdrawalSheetOpen(false);
    }
  };

  useEffect(() => {
    checkFormState();
  }, [formState]);

  return (
    <Sheet
      open={sheetAccountWithdrawalSheetOpen}
      onOpenChange={setSheetAccountWithdrawalSheetOpen}
    >
      <SheetTrigger asChild>
        <Button variant="outline">
          <IoCashOutline className="mr-1" /> Withdrawal
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-screen h-screen">
        <form className="w-full h-full flex flex-col gap-2" action={formAction}>
          <SheetHeader>
            <SheetTitle className="mb-4">Retirer de l&apos;argent</SheetTitle>
          </SheetHeader>
          <div className="rounded-xl bg-white w-full p-4 flex flex-col">
            <div className="flex justify-between items-center gap-4 mb-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <Input
                  name={"amountWithdrawal"}
                  className="text-lg border-none pr-1 text-right font-bold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-ring"
                  type="text"
                  placeholder="0"
                />
                <Input
                  name={"accountId"}
                  value={accountSelected?.id}
                  type="hidden"
                />
                <span className="font-bold text-lg">€</span>
              </div>
            </div>
            <div className="flex justify-between text-xs font-extralight text-gray-600">
              <p className="">Solde : {`${accountSelected?.balance}`} €</p>
              <p className="">Le montant minimal est de 1 €</p>
            </div>
          </div>
          <Button type="submit">Confirmer</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
