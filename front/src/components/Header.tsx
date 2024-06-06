"use client";
import React from "react";
import { MdOutlineSearch, MdOutlineAccountCircle } from "react-icons/md";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccount } from "@/context/AccountContext";
import { logoutUserAction } from "@/actions/auth-actions";
import { useFormState } from "react-dom";

export default function Header() {
  return (
    <header className="bg-white w-screen p-4">
      <div className="flex justify-between items-center mx-auto max-w-screen-md">
        <div className="rounded-full h-min w-min p-2 bg-gray-200">
          <MdOutlineSearch className="cursor-default" />
        </div>
        <div className="flex flex-col text-center tracking-wider">
          <h1 className="font-semibold text-lg">Checking Account</h1>
          <span className="font-light text-sm">ITINOV BANK APP</span>
        </div>
        <AccountButton />
      </div>
    </header>
  );
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

const AccountButton = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const { accountSelected } = useAccount();
  const [formState, formAction] = useFormState(logoutUserAction, undefined);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full h-min w-min p-2 bg-gray-200 cursor-pointer">
          <MdOutlineAccountCircle />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {accountSelected ? accountSelected.name : "Appearance"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={formAction}>
          <button type="submit" className="w-full h-full">
            <DropdownMenuItem className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
