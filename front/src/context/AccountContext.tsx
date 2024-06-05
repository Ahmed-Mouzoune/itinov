"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AccountContextType,
  IAccount,
  TStrapiAccountApiResponse,
} from "@/interfaces/collections/account";
import { findUserAccountService } from "@/services/AccountService";

const AccountContext = createContext<AccountContextType | undefined>(undefined);

type UseAccountHook = () => AccountContextType;

export const useAccount: UseAccountHook = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error("UseAccount must be used within a AccountProvider");
  return context;
};

export default function AccountProvider({ children }: { children: ReactNode }) {
  const [accountSelected, setAccountSelected] = useState<IAccount | undefined>(
    undefined
  );
  const [accounts, setAccounts] = useState<
    TStrapiAccountApiResponse[] | undefined
  >(undefined);
  const [sheetAccountDepositSheetOpen, setSheetAccountDepositSheetOpen] =
    useState(false);
  const [sheetAccountWithdrawalSheetOpen, setSheetAccountWithdrawalSheetOpen] =
    useState(false);
  const [sheetAccountTransferSheetOpen, setSheetAccountTransferSheetOpen] =
    useState(false);

  const fetchAccounts = async () => {
    const accounts = await findUserAccountService();
    setAccounts(
      accounts?.data?.map((account) => ({
        id: account.id,
        attributes: { ...account?.attributes, id: account?.id },
      }))
    );
  };

  useEffect(() => {
    fetchAccounts();
    return () => {
      setAccounts(undefined);
    };
  }, []);

  useEffect(() => {
    if (accounts)
      setAccountSelected({
        ...accounts[0]?.attributes,
        id: accounts[0]?.id,
      });

    return () => {
      setAccountSelected(undefined);
    };
  }, [accounts]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        setAccounts,
        accountSelected,
        setAccountSelected,
        sheetAccountDepositSheetOpen,
        setSheetAccountDepositSheetOpen,
        sheetAccountWithdrawalSheetOpen,
        setSheetAccountWithdrawalSheetOpen,
        sheetAccountTransferSheetOpen,
        setSheetAccountTransferSheetOpen,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
