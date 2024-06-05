"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { findUserAccountService } from "@/services/AccountService";

const AccountContext = createContext<AccountContextType | undefined>(undefined);

type UseAccountHook = () => AccountContextType;

export const useAccount: UseAccountHook = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error("UseAccount must be used within a AccountProvider");
  return context;
};

export default function AccountProvider({
  children,
  accounts,
}: {
  children: ReactNode;
  accounts: TStrapiAccountApiResponse[] | undefined;
  // accounts: TStrapiAccountsApiResponse;
}) {
  const [accountSelected, setAccountSelected] = useState<IAccount | undefined>(
    undefined
  );
  const [sheetAccountDepositSheetOpen, setSheetAccountDepositSheetOpen] =
    useState(false);
  const [sheetAccountWithdrawalSheetOpen, setSheetAccountWithdrawalSheetOpen] =
    useState(false);
  const [sheetAccountTransferSheetOpen, setSheetAccountTransferSheetOpen] =
    useState(false);

  useEffect(() => {
    if (accounts) {
      setAccountSelected({
        ...accounts[0]?.attributes,
        id: accounts[0]?.id,
      });
    }

    return () => {
      setAccountSelected(undefined);
    };
  }, [accounts]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
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
