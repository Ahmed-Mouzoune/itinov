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
  MdArrowCircleDown,
  MdArrowDownward,
  MdOutlineAdd,
  MdOutlineArrowCircleDown,
} from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAccount } from "@/context/AccountContext";
import { Input } from "@/components/ui/input";
import {
  depositAccountService,
  revalidateFindUserAccounts,
} from "@/services/AccountService";
import { useToast } from "../ui/use-toast";
import { useFormState, useFormStatus } from "react-dom";
import { depositAccountAction } from "@/actions/account-actions";
import { ZodErrors } from "../error/ZodErrors";
import { StrapiErrors } from "../error/StrapiErrors";

export default function AccountDepositSheet() {
  const {
    accountSelected,
    sheetAccountDepositSheetOpen,
    setSheetAccountDepositSheetOpen,
  } = useAccount();
  const [formState, formAction] = useFormState(depositAccountAction, undefined);
  const { toast } = useToast();

  const checkFormState = async () => {
    if (formState && "zodErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Deposit failed !`,
        description: (
          <>
            <ZodErrors
              error={formState?.zodErrors?.amountDeposit as string[]}
            />
          </>
        ),
      });
    }
    if (formState && "strapiErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Deposit failed !`,
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
        title: `Deposit success !`,
      });
      await revalidateFindUserAccounts();
      setSheetAccountDepositSheetOpen(false);
    }
  };

  useEffect(() => {
    checkFormState();
  }, [formState]);

  return (
    <Sheet
      open={sheetAccountDepositSheetOpen}
      onOpenChange={setSheetAccountDepositSheetOpen}
    >
      <SheetTrigger asChild>
        <Button variant="outline">
          <MdOutlineAdd className="mr-1" /> Deposit
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-screen h-screen">
        <form className="w-full h-full flex flex-col gap-2" action={formAction}>
          <SheetHeader>
            <SheetTitle className="mb-4">Ajouter de l&apos;argent</SheetTitle>
          </SheetHeader>
          <div className="relative rounded-xl bg-white w-full p-4 flex justify-between items-center font-semibold">
            <div className="absolute inset-x-1/2 -bottom-6">
              <div className="bg-white flex w-min h-min -translate-x-1/2 rounded-full border p-2">
                <MdArrowDownward className="h-4 w-4" />
              </div>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="flex ml-4 mr-auto">Apple Pay</p>
          </div>
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
                  name={"amountDeposit"}
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
              <p className="">Le montant minimal est de 10 €</p>
            </div>
          </div>
          <Button type="submit" className="mt-auto">
            Confirmer
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
