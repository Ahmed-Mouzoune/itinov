"use client";
import React from "react";
import { MdOutlineAdd, MdOutlineHome, MdOutlineMenu } from "react-icons/md";
import { IoCashOutline } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface INavItem {
  icon: any;
  label: string;
  setSheet: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  disabled: boolean;
}

export default function NavbarBottom() {
  const {
    setSheetAccountDepositSheetOpen,
    setSheetAccountTransferSheetOpen,
    setSheetAccountWithdrawalSheetOpen,
  } = useAccount();
  const NavItems = [
    // {
    //   icon: <MdOutlineHome />,
    //   label: "Accueil",
    //   setSheet: undefined,
    //   disabled: true,
    // },
    {
      icon: <MdOutlineAdd />,
      label: "Deposit",
      setSheet: setSheetAccountDepositSheetOpen,
      disabled: false,
    },
    {
      icon: <BiTransfer />,
      label: "Transfer",
      setSheet: setSheetAccountTransferSheetOpen,
      disabled: false,
    },
    {
      icon: <IoCashOutline />,
      label: "Withdrawal",
      setSheet: setSheetAccountWithdrawalSheetOpen,
      disabled: false,
    },
    // {
    //   icon: <MdOutlineMenu />,
    //   label: "Menu",
    //   setSheet: undefined,
    //   disabled: true,
    // },
  ];

  return (
    <nav className="w-screen p-4 px-8 bg-white border-t fixed bottom-0 left-0">
      <div className="flex justify-between items-center max-w-screen-md mx-auto">
        {NavItems.map((navItem, i) => (
          <NavItem
            key={`nav-item-${i}`}
            icon={navItem.icon}
            label={navItem.label}
            setSheet={navItem?.setSheet}
            disabled={navItem.disabled}
          />
        ))}
      </div>
    </nav>
  );
}

const NavItem = ({ icon, label, setSheet, disabled }: INavItem) => {
  const onClickLink = () => {
    if (setSheet) setSheet(true);
  };

  return (
    <Button
      disabled={disabled}
      variant={"outline"}
      onClick={() => onClickLink()}
      className={cn(
        "flex flex-col items-center justify-center border-none",
        setSheet ? "" : "cursor-default"
      )}
    >
      <span>{icon}</span>
      <p className="text-xs text-gray-600">{label}</p>
    </Button>
    // <div
    //   onClick={() => onClickLink()}
    //   className={cn(
    //     "flex flex-col items-center justify-center",
    //     setSheet ? "cursor-pointer" : ""
    //   )}
    // >
    //   <span>{icon}</span>
    //   <p className="text-xs text-gray-600">{label}</p>
    // </div>
  );
};
