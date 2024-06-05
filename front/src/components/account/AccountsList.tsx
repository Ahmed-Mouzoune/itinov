"use client";
import { useAccount } from "@/context/AccountContext";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface IAccountsList {
  accounts: TStrapiAccountApiResponse[];
  onClickItem: any;
}

export default function AccountsList({ accounts, onClickItem }: IAccountsList) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Principal</AccordionTrigger>
        <AccordionContent className="rounded-xl bg-gray-200 font-medium">
          {accounts.map((account, i) => (
            <AccountItem
              key={`account-item-${i}`}
              account={account.attributes}
              onClickItem={() => onClickItem(account.attributes)}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const AccountItem = ({
  account,
  onClickItem,
}: {
  account: IAccount;
  onClickItem: any;
}) => {
  return (
    <div
      onClick={() => onClickItem()}
      className="p-4 flex justify-between cursor-pointer hover:bg-white"
    >
      <span>{account.name}</span>
      <span>{`${account.balance}`}€</span>
    </div>
  );
};
