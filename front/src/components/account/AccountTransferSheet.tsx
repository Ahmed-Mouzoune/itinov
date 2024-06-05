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
  IAccount,
  TStrapiAccountApiResponse,
} from "@/interfaces/collections/account";
import AccountsList from "./AccountsList";
import {
  transferBetweenUserAccountService,
  revalidateFindUserAccounts,
} from "@/services/AccountService";
import { toast } from "../ui/use-toast";
import { BiTransfer } from "react-icons/bi";
import { useFormState } from "react-dom";
import { transferBetweenUserAccountAction } from "@/actions/account-actions";
import { ZodErrors } from "../error/ZodErrors";
import { StrapiErrors } from "../error/StrapiErrors";

interface IAccountTransferSheet {
  accounts: TStrapiAccountApiResponse[];
}

export default function AccountTransferSheet({
  accounts,
}: IAccountTransferSheet) {
  const { sheetAccountTransferSheetOpen, setSheetAccountTransferSheetOpen } =
    useAccount();
  const [accountFromTransfer, setAccountFromTransfer] = useState<
    IAccount | undefined
  >(undefined);
  const [accountToTransfer, setAccountToTransfer] = useState<
    IAccount | undefined
  >(undefined);

  useEffect(() => {
    if (sheetAccountTransferSheetOpen === false) {
      setAccountFromTransfer(undefined);
      setAccountToTransfer(undefined);
    }

    return () => {
      setAccountFromTransfer(undefined);
      setAccountToTransfer(undefined);
    };
  }, [sheetAccountTransferSheetOpen]);

  return (
    <Sheet
      open={sheetAccountTransferSheetOpen}
      onOpenChange={setSheetAccountTransferSheetOpen}
    >
      <SheetTrigger asChild>
        <Button variant="outline">
          <BiTransfer className="mr-1" /> Transfer
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-screen h-screen">
        {(!accountFromTransfer || !accountToTransfer) && (
          <ChooseAccountForTransfer
            accounts={accounts}
            accountFromTransfer={accountFromTransfer}
            setAccountFromTransfer={setAccountFromTransfer}
            accountToTransfer={accountToTransfer}
            setAccountToTransfer={setAccountToTransfer}
          />
        )}
        {accountFromTransfer && accountToTransfer && (
          <ChooseAmountForTransfer
            accountFromTransfer={accountFromTransfer}
            accountToTransfer={accountToTransfer}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

interface IChooseAccountForTransfer {
  accounts: TStrapiAccountApiResponse[];
  accountFromTransfer: IAccount | undefined;
  setAccountFromTransfer: React.Dispatch<
    React.SetStateAction<IAccount | undefined>
  >;
  accountToTransfer: IAccount | undefined;
  setAccountToTransfer: React.Dispatch<
    React.SetStateAction<IAccount | undefined>
  >;
}

const ChooseAccountForTransfer = ({
  accounts,
  accountFromTransfer,
  setAccountFromTransfer,
  setAccountToTransfer,
}: IChooseAccountForTransfer) => {
  const chooseAccountFromTransfer = (account: IAccount) => {
    setAccountFromTransfer(account);
  };
  const chooseAccountToTransfer = (account: IAccount) => {
    setAccountToTransfer(account);
  };

  return (
    <div className="flex flex-col gap-2">
      <SheetHeader>
        <SheetTitle className="mb-4">
          {!accountFromTransfer ? "Depuis quel compte ?" : "Vers quel compte ?"}
        </SheetTitle>
      </SheetHeader>
      {!accountFromTransfer ? (
        <AccountsList
          accounts={accounts}
          onClickItem={chooseAccountFromTransfer}
        />
      ) : (
        <AccountsList
          accounts={accounts.filter(
            (account) => account.attributes !== accountFromTransfer
          )}
          onClickItem={chooseAccountToTransfer}
        />
      )}
    </div>
  );
};

const ChooseAmountForTransfer = ({
  accountFromTransfer,
  accountToTransfer,
}: {
  accountFromTransfer: IAccount;
  accountToTransfer: IAccount;
}) => {
  const { setSheetAccountTransferSheetOpen } = useAccount();
  const [formState, formAction] = useFormState(
    transferBetweenUserAccountAction,
    undefined
  );
  const checkFormState = async () => {
    if (formState && "zodErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Transfer failed !`,
        description: (
          <>
            <ZodErrors
              error={formState?.zodErrors?.amountTransfer as string[]}
            />
          </>
        ),
      });
    }
    if (formState && "strapiErrors" in formState) {
      toast({
        variant: "destructive",
        title: `Transfer failed !`,
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
        title: `Transfer success !`,
      });
      await revalidateFindUserAccounts();
      setSheetAccountTransferSheetOpen(false);
    }
  };

  useEffect(() => {
    checkFormState();
  }, [formState]);

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <SheetHeader>
        <SheetTitle className="mb-4">Pour quel montant ?</SheetTitle>
      </SheetHeader>
      <div className="rounded-xl bg-white w-full p-4 flex flex-col">
        <div className="flex items-center">
          <Input
            name={"amountTransfer"}
            className="text-lg border-none pr-1 text-right font-bold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-ring"
            type="text"
            placeholder="0"
          />
          <Input
            name={"accountIdFrom"}
            value={accountFromTransfer?.id}
            type="hidden"
          />
          <Input
            name={"accountIdTo"}
            value={accountToTransfer?.id}
            type="hidden"
          />
          <span className="font-bold text-lg">€</span>
        </div>
        <div className="flex justify-between text-xs font-extralight text-gray-600">
          <p className="">Solde : {`${accountFromTransfer?.balance}`} €</p>
          <p className="">Le montant minimal est de 1 €</p>
        </div>
      </div>
      <Button type="submit" className="mt-auto">
        Confirmer
      </Button>
    </form>
  );
};
